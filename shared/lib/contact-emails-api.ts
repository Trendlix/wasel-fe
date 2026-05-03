const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

export interface ContactEmailsPayload {
    general_support: string;
    legal_inquiries: string;
    privacy_concerns: string;
    business_partnerships: string;
}

export async function fetchContactEmailsPublic(): Promise<ContactEmailsPayload | null> {
    if (!base) {
        return null;
    }
    try {
        const res = await fetch(`${base}/informative-website/contact-emails`, {
            credentials: "omit",
        });
        if (!res.ok) return null;
        const body = await res.json();
        const data = body?.data as ContactEmailsPayload | undefined;
        if (!data || typeof data !== "object") return null;
        return {
            general_support:
                typeof data.general_support === "string" ? data.general_support.trim() : "",
            legal_inquiries:
                typeof data.legal_inquiries === "string" ? data.legal_inquiries.trim() : "",
            privacy_concerns:
                typeof data.privacy_concerns === "string" ? data.privacy_concerns.trim() : "",
            business_partnerships:
                typeof data.business_partnerships === "string"
                    ? data.business_partnerships.trim()
                    : "",
        };
    } catch {
        return null;
    }
}
