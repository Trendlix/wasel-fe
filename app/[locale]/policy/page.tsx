import type { Metadata } from "next";
import Script from "next/script";
import logo from "@/public/brand/logo.png";
import PolicyClient from "@/shared/components/pages/policy/policy-client";
import axiosInstance from "@/shared/utils/axios.utils";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import { ISeo } from "@/shared/types/common/seo.types";

const defaultMetadata: Metadata = {
    title: "Privacy Policy | Wasel - Smart Cargo Delivery",
    description: "Learn how Wasel collects, uses, and protects your personal information.",
};

const getPrivacyPageSeo = async (language: ISupportedLocale) => {
    try {
        const response = await axiosInstance.get<ISeo>("/informative-website/privacy/seo", {
            params: { lang: language },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch privacy page SEO", error);
        return null;
    }
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: ISupportedLocale }>;
}): Promise<Metadata> => {
    const { locale } = await params;
    const seo = await getPrivacyPageSeo(locale);

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

const Policy = async ({ params }: { params: Promise<{ locale: ISupportedLocale }> }) => {
    const { locale } = await params;
    const seo = await getPrivacyPageSeo(locale);
    const rawSchema = seo?.schema;
    const schemas = Array.isArray(rawSchema)
        ? rawSchema
        : rawSchema && typeof rawSchema === "object"
          ? [rawSchema as Record<string, unknown>]
          : [];

    return (
        <main>
            <PolicyClient />
            {schemas.map((schema, index) => (
                <Script
                    id={`privacy-schema-${index}`}
                    key={`privacy-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </main>
    );
};

export default Policy;
