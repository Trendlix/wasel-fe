import type { MarketingLegalApiPayload } from "@/shared/lib/marketing-terms-api";

const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

export type { MarketingLegalApiPayload };

export async function fetchMarketingPrivacyPublic(): Promise<MarketingLegalApiPayload | null> {
    if (!base) {
        return null;
    }
    try {
        const res = await fetch(`${base}/public/marketing-privacy`, {
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
