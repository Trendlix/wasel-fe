import type { Metadata } from "next";
import Script from "next/script";
import logo from "@/public/brand/logo.png";
import TermsClient from "@/shared/components/pages/terms/terms-client";
import axiosInstance from "@/shared/utils/axios.utils";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import { ISeo } from "@/shared/types/common/seo.types";

const defaultMetadata: Metadata = {
    title: "Terms & Conditions | Wasel - Smart Cargo Delivery",
    description: "Read the terms and conditions for using Wasel logistics services.",
};

const getTermsPageSeo = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<ISeo>("/informative-website/terms/seo", {
            params: { lang: language },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch terms page SEO", error);
        return null;
    }
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
}): Promise<Metadata> => {
    const { locale } = await params;
    const seo = await getTermsPageSeo(locale);

    if (!seo?.title || !seo?.description) {
        return defaultMetadata;
    }

    const ogImage = seo.alt_img || logo.src;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
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

const Terms = async ({ params }: { params: Promise<{ locale: ISupportedLocale }> }) => {
    const { locale } = await params;
    const seo = await getTermsPageSeo(locale);
    const rawSchema = seo?.schema;
    const schemas = Array.isArray(rawSchema)
        ? rawSchema
        : rawSchema && typeof rawSchema === "object"
          ? [rawSchema as Record<string, unknown>]
          : [];

    return (
        <main>
            <TermsClient />
            {schemas.map((schema, index) => (
                <Script
                    id={`terms-schema-${index}`}
                    key={`terms-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </main>
    );
};

export default Terms;
