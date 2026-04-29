import type { Metadata } from "next";
import Script from "next/script";
import logo from "@/public/brand/logo.png";
import AboutClient from "@/shared/components/pages/about/about-client";
import axiosInstance from "@/shared/utils/axios.utils";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import { IAboutPageResponse } from "@/shared/types/pages/about.types";
import { ISeo } from "@/shared/types/common/seo.types";

const defaultMetadata: Metadata = {
    title: "About Wasel | Smart Cargo Delivery",
    description: "Learn more about Wasel, our values, and our mission to modernize heavy transportation.",
};

const getAboutPage = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<IAboutPageResponse>("/informative-website/about", {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch about page data", error);
        return null;
    }
};

const getAboutPageSeo = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<ISeo>("/informative-website/about/seo", {
            params: {
                lang: language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch about page seo", error);
        return null;
    }
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
}): Promise<Metadata> => {
    const { locale } = await params;
    const [seo, aboutPage] = await Promise.all([getAboutPageSeo(locale), getAboutPage(locale)]);

    if (!seo?.title || !seo?.description) {
        return defaultMetadata;
    }

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        openGraph: {
            title: seo.title,
            description: seo.description,
            type: "website",
            locale: locale === ISupportedLocale.ar ? "ar_EG" : "en_US",
            images: aboutPage?.alt_img || logo.src,
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            images: aboutPage?.alt_img || logo.src,
        },
    };
};

const About = async ({ params }: { params: Promise<{ locale: ISupportedLocale }> }) => {
    const { locale } = await params;
    const aboutPage = await getAboutPage(locale);

    return (
        <main>
            <AboutClient content={aboutPage?.content ?? null} common={aboutPage?.common ?? null} />
            {aboutPage?.schemas?.map((schema, index) => (
                <Script
                    id={`about-schema-${index}`}
                    key={`about-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </main>
    );
};

export default About;