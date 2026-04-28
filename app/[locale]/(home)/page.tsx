import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "@/shared/components/pages/home/home-client";
import HomeThemeLock from "@/shared/components/pages/home/home-theme-lock";
import clsx from "clsx";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import axiosInstance from "@/shared/utils/axios.utils";
import { IHomePageResponse } from "@/shared/types/pages/home.types";
import { ISeo } from "@/shared/types/common/seo.types";
import Script from "next/script";
import logo from "@/public/brand/logo.png"

const defaultMetadata: Metadata = {
    title: "Wasel | Smart Cargo Delivery",
    description: "Wasel helps you move cargo faster with smart pricing, trusted drivers, and real-time delivery tracking.",
};



const getHomePage = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<IHomePageResponse>(`/informative-website/home`, {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch home page data", error);
        return null;
    }
};

const getHomePageSeo = async (language: ISupportedLocale) => {

    try {
        const response = await axiosInstance.get<ISeo>(`/informative-website/home/seo`, {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch home page seo", error);
        return null;
    }
};


export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
}): Promise<Metadata> => {
    const { locale } = await params;
    const [seo, homePage] = await Promise.all([
        getHomePageSeo(locale),
        getHomePage(locale),
    ]);

    if (!seo?.title || !seo?.description) {
        return defaultMetadata;
    }

    return {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        openGraph: {
            title: seo?.title,
            description: seo?.description,
            type: "website",
            locale: locale === ISupportedLocale.ar ? "ar_EG" : "en_US",
            images: homePage?.alt_img || logo.src,
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.title,
            description: seo?.description,
            images: homePage?.alt_img || logo.src,
        },
    };
};

const Home = async ({ params }: { params: Promise<{ locale: ISupportedLocale }> }) => {
    const { locale } = await params;
    const homePage = await getHomePage(locale);
    if (!homePage?.content) {
        notFound();
    }

    return (
        <main className={clsx("bg-main-codGray overflow-hidden")}>
            <HomeThemeLock />
            <HomeClient content={homePage?.content} common={homePage?.common ?? null} altImg={homePage?.alt_img} />

            {
                homePage?.schemas && (homePage?.schemas?.map((schema, index) => (
                    <Script
                        id={`home-schema-${index}`}
                        key={`home-schema-${index}`}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                )))}
        </main>
    );
};


export default Home;