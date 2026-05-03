import type { Metadata } from "next";
import Script from "next/script";
import logo from "@/public/brand/logo.png";
import BlogsClient from "@/shared/components/pages/blogs/blogs-client";
import axiosInstance from "@/shared/utils/axios.utils";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import { IBlogsPageResponse, ISingleBlogResponse } from "@/shared/types/pages/blogs.types";
import { ISeo } from "@/shared/types/common/seo.types";

const defaultMetadata: Metadata = {
    title: "Blogs | Wasel - Smart Cargo Delivery",
    description: "Explore insights, trends, and expert articles about logistics, transportation, and supply chain management.",
};

interface IGetBlogsParams {
    page?: string;
    category?: string;
    search?: string;
}

const getBlogsPage = async (language: ISupportedLocale, params?: IGetBlogsParams) => {
    try {
        const response = await axiosInstance.get<IBlogsPageResponse>("/informative-website/blogs", {
            params: {
                lang: language,
                page: params?.page ?? "1",
                limit: "10",
                category: params?.category,
                search: params?.search,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blogs page data", error);
        return null;
    }
};

const getBlogsPageSeo = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<ISeo>("/informative-website/blogs/seo", {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blogs page seo", error);
        return null;
    }
};

export const generateMetadata = async ({
    params,
    searchParams,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
    searchParams: Promise<IGetBlogsParams>;
}): Promise<Metadata> => {
    const { locale } = await params;
    const queryParams = await searchParams;
    const [seo, blogsPage] = await Promise.all([
        getBlogsPageSeo(locale),
        getBlogsPage(locale, queryParams),
    ]);

    if (!seo?.title || !seo?.description) {
        return defaultMetadata;
    }

    const ogImage = seo.alt_img || blogsPage?.alt_img || logo.src;

    // Build pagination-aware canonical URL
    const buildPageUrl = (pageNum: number, includeCategory?: string, includeSearch?: string) => {
        const params = new URLSearchParams();
        if (pageNum > 1) {
            params.set("page", String(pageNum));
        }
        if (includeCategory) {
            params.set("category", includeCategory);
        }
        if (includeSearch) {
            params.set("search", includeSearch);
        }
        const queryString = params.toString();
        return queryString ? `/blogs?${queryString}` : "/blogs";
    };

    const meta = blogsPage?.meta;
    const currentPage = meta?.current_page ?? 1;
    const category = queryParams?.category;
    const search = queryParams?.search;

    // Build prev/next links for pagination
    const prevLink = meta?.has_previous_page
        ? buildPageUrl(currentPage - 1, category, search)
        : undefined;
    const nextLink = meta?.has_next_page
        ? buildPageUrl(currentPage + 1, category, search)
        : undefined;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
            canonical: buildPageUrl(currentPage, category, search),
        },
        other: {
            ...(prevLink ? { prev: prevLink } : {}),
            ...(nextLink ? { next: nextLink } : {}),
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            type: "website",
            locale: locale === ISupportedLocale.ar ? "ar_EG" : "en_US",
            images: ogImage,
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            images: ogImage,
        },
    };
};

const Blogs = async ({
    params,
    searchParams,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
    searchParams: Promise<IGetBlogsParams>;
}) => {
    const { locale } = await params;
    const queryParams = await searchParams;
    const blogsPage = await getBlogsPage(locale, queryParams);

    return (
        <main>
            <BlogsClient
                content={blogsPage?.content ?? null}
                common={blogsPage?.common ?? null}
                meta={blogsPage?.meta ?? null}
                altImg={blogsPage?.alt_img ?? null}
            />
            {blogsPage?.schemas?.map((schema, index) => (
                <Script
                    id={`blogs-schema-${index}`}
                    key={`blogs-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </main>
    );
};

export default Blogs;
