import { create } from "zustand";
import {
    fetchFooterPublic,
    type FooterPublicPayload,
    type FooterSocialLink,
} from "@/shared/lib/footer-public-api";

const FALLBACK_SOCIAL: FooterSocialLink[] = [
    { icon: "Facebook", link: "#" },
    { icon: "Globe", link: "#" },
    { icon: "Linkedin", link: "#" },
];

const empty = (): FooterPublicPayload => ({
    social_links: [],
    app_links: { android_app_cta: "", ios_app_cta: "" },
});

let hydrateInFlight: Promise<void> | null = null;

interface FooterCmsState {
    data: FooterPublicPayload;
    hydrated: boolean;
    hydrateFooter: () => Promise<void>;
}

const useFooterCmsStore = create<FooterCmsState>((set, get) => ({
    data: empty(),
    hydrated: false,

    hydrateFooter: async () => {
        if (get().hydrated) return;
        if (!hydrateInFlight) {
            hydrateInFlight = (async () => {
                try {
                    const payload = await fetchFooterPublic();
                    set({
                        data: payload ?? empty(),
                        hydrated: true,
                    });
                } catch {
                    set({ data: empty(), hydrated: true });
                } finally {
                    hydrateInFlight = null;
                }
            })();
        }
        await hydrateInFlight;
    },
}));

export function getFooterSocialDisplayList(data: FooterPublicPayload): FooterSocialLink[] {
    if (data.social_links.length > 0) return data.social_links;
    return FALLBACK_SOCIAL;
}

export default useFooterCmsStore;
