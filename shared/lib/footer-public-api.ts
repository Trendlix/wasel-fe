const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_WASEL_API_BASE_URL
        ? process.env.NEXT_PUBLIC_WASEL_API_BASE_URL.replace(/\/$/, "")
        : "";

export interface FooterSocialLink {
    icon: string;
    link: string;
}

export interface FooterPublicPayload {
    social_links: FooterSocialLink[];
    app_links: {
        android_app_cta: string;
        ios_app_cta: string;
    };
}

const emptyPayload = (): FooterPublicPayload => ({
    social_links: [],
    app_links: {
        android_app_cta: "",
        ios_app_cta: "",
    },
});

function normalizeFooterPublic(raw: unknown): FooterPublicPayload {
    const d = emptyPayload();
    if (!raw || typeof raw !== "object") return d;
    const r = raw as Record<string, unknown>;
    const rawSocial = Array.isArray(r.social_links) ? r.social_links : [];
    const social_links = rawSocial
        .slice(0, 10)
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const x = item as Record<string, unknown>;
            return {
                icon: typeof x.icon === "string" ? x.icon.trim() : "",
                link: typeof x.link === "string" ? x.link.trim() : "",
            };
        })
        .filter((x): x is FooterSocialLink => x !== null && Boolean(x.icon));

    const appRaw =
        r.app_links && typeof r.app_links === "object"
            ? (r.app_links as Record<string, unknown>)
            : {};
    return {
        social_links,
        app_links: {
            android_app_cta:
                typeof appRaw.android_app_cta === "string" ? appRaw.android_app_cta.trim() : "",
            ios_app_cta: typeof appRaw.ios_app_cta === "string" ? appRaw.ios_app_cta.trim() : "",
        },
    };
}

export async function fetchFooterPublic(): Promise<FooterPublicPayload | null> {
    if (!base) {
        return null;
    }
    try {
        const res = await fetch(`${base}/informative-website/footer`, {
            credentials: "omit",
        });
        if (!res.ok) return null;
        const body = await res.json();
        const data = body?.data;
        return normalizeFooterPublic(data);
    } catch {
        return null;
    }
}
