import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import logo from "@/public/brand/logo.png";
import SingleBlogClient from "@/shared/components/pages/blogs/blog/single-blog-client";
import axiosInstance from "@/shared/utils/axios.utils";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import { ISingleBlogResponse } from "@/shared/types/pages/blogs.types";

const defaultMetadata: Metadata = {
    title: "Blog | Wasel - Smart Cargo Delivery",
    description: "Read our latest insights on logistics, transportation, and supply chain management.",
};

const getBlogBySlug = async (slug: string, language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<ISingleBlogResponse>(`/informative-website/blogs/${slug}`, {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blog by slug", error);
        return null;
    }
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale; slug: string }>;
}): Promise<Metadata> => {
    const { locale, slug } = await params;
    const blogData = await getBlogBySlug(slug, locale);

    if (!blogData?.blog) {
        return defaultMetadata;
    }

    const { blog, seo } = blogData;
    const title = seo?.title || blog.title;
    const description = seo?.description || blog.description?.replace(/<[^>]*>/g, "").substring(0, 160);
    const keywords = seo?.keywords || blog.seo?.keywords || [];
    const ogImage = blogData.alt_img || blog.seo?.alt_img || logo.src;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "article",
            locale: locale === ISupportedLocale.ar ? "ar_EG" : "en_US",
            images: ogImage,
            publishedTime: blog.published_at,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage,
        },
    };
};

const SingleBlog = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale; slug: string }>;
}) => {
    const { locale, slug } = await params;
    const blogData = await getBlogBySlug(slug, locale);

    console.log(blogData);

    if (!blogData?.blog) {
        notFound();
    }

    return (
        <main>
            <SingleBlogClient
                blog={blogData.blog}
                related={blogData.related || []}
                common={blogData.common || null}
                schemas={blogData.schemas || []}
            />
            {blogData.schemas?.map((schema, index) => (
                <Script
                    id={`blog-schema-${index}`}
                    key={`blog-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </main>
    );
};

export default SingleBlog;
