import { faqData, faqDataAr, type IFaqRecord } from "@/shared/constants/faq";
import {
    fetchMarketingFaqPublic,
    type MarketingFaqApiPayload,
} from "@/shared/lib/marketing-faq-api";
import { create } from "zustand";

export { faqUiLang } from "@/shared/lib/ui-locale";

/** Dedupes concurrent hydration (e.g. React Strict Mode double mount). */
let hydrateInFlight: Promise<void> | null = null;

function mapPayloadToRecords(
    payload: MarketingFaqApiPayload,
    lang: "en" | "ar",
): IFaqRecord[] {
    const loc = lang === "ar" ? payload.ar : payload.en;
    if (!loc?.items?.length) return [];
    return loc.items.map((g) => ({
        categoryKey: (g.categoryKey || g.category || g.label || "").trim() || "group",
        category: g.category ?? g.label ?? "",
        length: (g.items ?? g.points ?? []).length,
        items: (g.items ?? g.points ?? []).map((p) => ({
            q: p.question ?? "",
            a: p.answer ?? "",
            aHtml: p.answer ?? "",
        })),
    }));
}

function applyLocaleFromPayload(
    payload: MarketingFaqApiPayload,
    lang: "en" | "ar",
    previousActiveKey: string,
) {
    const records = mapPayloadToRecords(payload, lang);
    const loc = lang === "ar" ? payload.ar : payload.en;
    const fallback = lang === "ar" ? faqDataAr : faqData;
    const finalData = records.length ? records : fallback;
    const found =
        finalData.find((c) => c.categoryKey === previousActiveKey) || finalData[0];

    return {
        lang,
        categories: finalData,
        activeCategoryKey: found.categoryKey,
        category: found,
        heroTitles:
            loc?.titles && loc.titles.filter((t) => t && t.trim()).length >= 2
                ? loc.titles
                : null,
        heroDescription: loc?.description?.trim() ? loc.description : null,
    };
}

interface IFaqsStore {
    activeCategoryKey: string;
    setActiveCategory: (categoryKey: string, lang?: "en" | "ar") => void;
    categories: IFaqRecord[];
    category: IFaqRecord;
    lang: "en" | "ar";
    setLang: (lang: "en" | "ar") => void;
    heroTitles: string[] | null;
    heroDescription: string | null;
    cmsHydrated: boolean;
    cmsPayload: MarketingFaqApiPayload | null;
    /** Pass UI locale so hydration applies the correct branch before sidebar mounts. Re-applies when CMS is already loaded (SPA locale change). */
    hydrateFromCms: (lang?: "en" | "ar") => Promise<void>;
}

const useFaqsStore = create<IFaqsStore>((set, get) => ({
    lang: "en",
    activeCategoryKey: faqData[0].categoryKey,
    categories: faqData,
    category: faqData[0],
    heroTitles: null,
    heroDescription: null,
    cmsHydrated: false,
    cmsPayload: null,

    setActiveCategory: (categoryKey: string, lang?: "en" | "ar") => {
        const language = lang ?? get().lang;
        const { categories } = get();
        const found =
            categories.find((c) => c.categoryKey === categoryKey) || categories[0];
        set({
            activeCategoryKey: found.categoryKey,
            category: found,
            lang: language,
        });
    },

    setLang: (lang: "en" | "ar") => {
        const { cmsPayload, cmsHydrated, activeCategoryKey } = get();
        if (cmsHydrated && cmsPayload) {
            set(applyLocaleFromPayload(cmsPayload, lang, activeCategoryKey));
        } else {
            const data = lang === "ar" ? faqDataAr : faqData;
            const found =
                data.find((c) => c.categoryKey === get().activeCategoryKey) || data[0];
            set({
                lang,
                categories: data,
                activeCategoryKey: found.categoryKey,
                category: found,
            });
        }
    },

    hydrateFromCms: async (langFromCaller?: "en" | "ar") => {
        const resolvedLang = langFromCaller ?? get().lang;
        const { cmsHydrated, cmsPayload } = get();
        if (cmsHydrated && cmsPayload) {
            set(
                applyLocaleFromPayload(
                    cmsPayload,
                    resolvedLang,
                    get().activeCategoryKey,
                ),
            );
            return;
        }
        if (!hydrateInFlight) {
            hydrateInFlight = (async () => {
                try {
                    const payload = await fetchMarketingFaqPublic();
                    if (!payload) {
                        set({ cmsHydrated: true, cmsPayload: null });
                        return;
                    }
                    const langAfterFetch = langFromCaller ?? get().lang;
                    const patch = applyLocaleFromPayload(
                        payload,
                        langAfterFetch,
                        get().activeCategoryKey,
                    );
                    set({
                        ...patch,
                        cmsHydrated: true,
                        cmsPayload: payload,
                    });
                } finally {
                    hydrateInFlight = null;
                }
            })();
        }
        await hydrateInFlight;
    },
}));

export default useFaqsStore;
