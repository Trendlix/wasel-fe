const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

export interface MarketingFaqApiItem {
    question: string;
    answer: string;
}

export interface MarketingFaqApiGroup {
    categoryKey: string;
    category?: string;
    label?: string;
    audience?: string;
    items?: MarketingFaqApiItem[];
    points?: MarketingFaqApiItem[];
}

export interface MarketingFaqApiLocale {
    titles: string[];
    description: string;
    items: MarketingFaqApiGroup[];
}

export interface MarketingFaqApiPayload {
    en: MarketingFaqApiLocale;
    ar: MarketingFaqApiLocale;
}

export async function fetchMarketingFaqPublic(): Promise<MarketingFaqApiPayload | null> {
    if (!base) {
        return null;
    }
    try {
        const res = await fetch(`${base}/public/marketing-faq`, {
            credentials: "omit",
        });
        if (!res.ok) return null;
        const body = await res.json();
        const data = body?.data as MarketingFaqApiPayload | undefined;
        if (!data?.en?.items || !data?.ar?.items) return null;
        return data;
    } catch {
        return null;
    }
}
