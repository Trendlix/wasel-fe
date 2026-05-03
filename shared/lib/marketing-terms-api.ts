import type { MarketingFaqApiLocale } from "@/shared/lib/marketing-faq-api";

const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

export interface MarketingLegalApiPayload {
    alert: { en: string; ar: string };
    en: MarketingFaqApiLocale;
    ar: MarketingFaqApiLocale;
}

export async function fetchMarketingTermsPublic(): Promise<MarketingLegalApiPayload | null> {
    if (!base) {
        return null;
    }
    try {
        const res = await fetch(`${base}/public/marketing-terms`, {
            credentials: "omit",
        });
        if (!res.ok) return null;
        const body = await res.json();
        const data = body?.data as MarketingLegalApiPayload | undefined;
        if (!data?.en || !data?.ar) return null;
        return data;
    } catch {
        return null;
    }
}
