import type { MarketingFaqApiLocale } from "@/shared/lib/marketing-faq-api";

const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

/** Bilingual marketing legal payload (privacy policy still uses this shape from `/public/marketing-privacy`). */
export interface MarketingLegalApiPayload {
    alert: { en: string; ar: string };
    en: MarketingFaqApiLocale;
    ar: MarketingFaqApiLocale;
}

export type TermsAudience = "all" | "user" | "driver";

export interface TermsPageContent {
    hero: {
        titles: string[];
        description: string;
        updated_at: string | null;
    };
    alert: string;
    items: Array<{
        categoryKey: string;
        category: string;
        audience: string;
        items: Array<{ question: string; answer: string }>;
    }>;
    legal_inquiries: string;
}

export interface TermsPagePayload {
    content: TermsPageContent;
    title: string | null;
    description: string | null;
    keywords: string[] | null;
    schemas: unknown;
    alt_img: string | null;
}

export async function fetchTermsPage(
    lang: "en" | "ar",
    audience: TermsAudience = "all",
): Promise<TermsPagePayload | null> {
    if (!base) {
        return null;
    }
    try {
        const params = new URLSearchParams({ lang, audience });
        const res = await fetch(`${base}/informative-website/terms?${params.toString()}`, {
            credentials: "omit",
        });
        if (!res.ok) return null;
        const body = await res.json();
        const data = body?.data as TermsPagePayload | undefined;
        if (!data?.content) return null;
        return data;
    } catch {
        return null;
    }
}
