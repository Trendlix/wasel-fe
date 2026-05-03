import {
    ITermItem,
    termsItemsAr,
    termsItems as termsItemsEn,
} from "@/shared/constants/terms";
import type { MarketingFaqApiLocale } from "@/shared/lib/marketing-faq-api";
import {
    fetchMarketingPrivacyPublic,
    type MarketingLegalApiPayload,
} from "@/shared/lib/marketing-privacy-api";
import { create } from "zustand";
import {
    AlertTriangle,
    CreditCard,
    Globe,
    Lock,
    ShieldCheck,
    User,
    type LucideIcon,
} from "lucide-react";

const ICON_ROTATION: LucideIcon[] = [
    ShieldCheck,
    Lock,
    User,
    CreditCard,
    Globe,
    AlertTriangle,
];

let policyHydrateInFlight: Promise<void> | null = null;

interface IArgument {
    title: string;
    slug: string;
}

function generateArguments(items: ITermItem[]): IArgument[] {
    return items.map((item) => ({
        title: item.title,
        slug: item.title.toLocaleLowerCase().replace(/\s+/g, "-"),
    }));
}

function mapLocaleToTermItems(loc: MarketingFaqApiLocale | undefined): ITermItem[] {
    const groups = loc?.items ?? [];
    if (!groups.length) return [];
    return groups.map((group, idx) => {
        const title =
            (typeof group.category === "string" && group.category.trim()
                ? group.category
                : "") ||
            (typeof group.label === "string" && group.label.trim() ? group.label : "") ||
            (typeof group.categoryKey === "string" ? group.categoryKey : "");
        return {
            id: idx + 1,
            title,
            higlights: (group.items ?? group.points ?? []).map((p) => ({
                title: p.question ?? "",
                descript: p.answer ?? "",
            })),
            icon: ICON_ROTATION[idx % ICON_ROTATION.length],
        };
    });
}

function applyLegalLocale(payload: MarketingLegalApiPayload, locale: "en" | "ar") {
    const loc = locale === "ar" ? payload.ar : payload.en;
    const mapped = mapLocaleToTermItems(loc);
    const staticItems = locale === "ar" ? termsItemsAr : termsItemsEn;
    const termsItems = mapped.length ? mapped : staticItems;

    const titles = loc?.titles;
    const heroTitles =
        Array.isArray(titles) && titles.filter((t) => t && String(t).trim()).length >= 2
            ? titles.map((t) => (typeof t === "string" ? t : ""))
            : null;

    const heroDescription =
        typeof loc?.description === "string" && loc.description.trim()
            ? loc.description
            : null;

    const alertRaw = locale === "ar" ? payload.alert?.ar : payload.alert?.en;
    const alert =
        typeof alertRaw === "string" && alertRaw.trim() ? alertRaw.trim() : null;

    return {
        termsItems,
        arguments: generateArguments(termsItems),
        heroTitles,
        heroDescription,
        alert,
    };
}

interface IPolicyStore {
    termsItems: ITermItem[];
    arguments: IArgument[];
    cmsPayload: MarketingLegalApiPayload | null;
    cmsHydrated: boolean;
    heroTitles: string[] | null;
    heroDescription: string | null;
    alert: string | null;
    setTermsItems: (items: ITermItem[]) => void;
    getLocalizedTermsItems: (locale: string) => ITermItem[];
    setLocalizedTermsItems: (locale: string) => void;
    hydrateFromCms: () => Promise<void>;
}

const usePolicyStore = create<IPolicyStore>((set, get) => ({
    termsItems: termsItemsEn,
    arguments: generateArguments(termsItemsEn),
    cmsPayload: null,
    cmsHydrated: false,
    heroTitles: null,
    heroDescription: null,
    alert: null,

    setTermsItems: (items) =>
        set({ termsItems: items, arguments: generateArguments(items) }),

    getLocalizedTermsItems: (locale) => {
        if (locale === "ar") return termsItemsAr;
        return termsItemsEn;
    },

    setLocalizedTermsItems: (locale) => {
        const lang: "en" | "ar" = locale === "ar" ? "ar" : "en";
        const { cmsHydrated, cmsPayload } = get();
        if (cmsHydrated && cmsPayload) {
            set(applyLegalLocale(cmsPayload, lang));
        } else {
            const items = lang === "ar" ? termsItemsAr : termsItemsEn;
            set({
                termsItems: items,
                arguments: generateArguments(items),
                heroTitles: null,
                heroDescription: null,
                alert: null,
            });
        }
    },

    hydrateFromCms: async () => {
        if (get().cmsHydrated) return;
        if (!policyHydrateInFlight) {
            policyHydrateInFlight = (async () => {
                try {
                    const payload = await fetchMarketingPrivacyPublic();
                    set({
                        cmsHydrated: true,
                        cmsPayload: payload,
                    });
                } finally {
                    policyHydrateInFlight = null;
                }
            })();
        }
        await policyHydrateInFlight;
    },
}));

export default usePolicyStore;
