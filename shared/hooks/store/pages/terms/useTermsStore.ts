import {
    ITermItem,
    termsItemsAr,
    termsItems as termsItemsEn,
} from "@/shared/constants/terms";
import {
    fetchTermsPage,
    type TermsAudience,
    type TermsPagePayload,
} from "@/shared/lib/marketing-terms-api";
import { legalSectionAnchorId, stripHtmlForAnchor } from "@/shared/lib/legal-section-anchor";
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

let hydrateRequestId = 0;

interface IArgument {
    title: string;
    slug: string;
}

function generateArguments(items: ITermItem[]): IArgument[] {
    return items.map((item) => ({
        title: item.title,
        slug: legalSectionAnchorId(item),
    }));
}

function mapTermsPageToState(data: TermsPagePayload | null, staticLocale: "en" | "ar") {
    const staticItems = staticLocale === "ar" ? termsItemsAr : termsItemsEn;

    if (!data?.content) {
        return {
            termsPagePayload: null,
            termsItems: staticItems,
            arguments: generateArguments(staticItems),
            heroTitles: null,
            heroDescription: null,
            alert: null,
            heroUpdatedAt: null,
            legalInquiries: "",
        };
    }

    const groups = data.content.items ?? [];
    const termsItems: ITermItem[] = groups.length
        ? groups.map((group, idx) => {
              const key =
                  typeof group.categoryKey === "string" && group.categoryKey.trim()
                      ? group.categoryKey.trim()
                      : `cat-${idx + 1}`;
              const title =
                  typeof group.category === "string" && group.category.trim()
                      ? group.category
                      : key;
              return {
                  id: idx + 1,
                  slug: key,
                  title,
                  higlights: (group.items ?? []).map((p) => ({
                      title: p.question ?? "",
                      descript: p.answer ?? "",
                  })),
                  icon: ICON_ROTATION[idx % ICON_ROTATION.length],
              };
          })
        : staticItems;

    const titles = data.content.hero?.titles;
    const rawSlots = Array.isArray(titles)
        ? titles.map((t) => (typeof t === "string" ? t : ""))
        : [];
    const slot0 = rawSlots[0] ?? "";
    const slot1 = rawSlots[1] ?? "";
    const hasPlain0 = stripHtmlForAnchor(slot0).length > 0;
    const hasPlain1 = stripHtmlForAnchor(slot1).length > 0;
    const heroTitles =
        hasPlain0 || hasPlain1 ? [slot0, slot1] : null;

    const heroDescription =
        typeof data.content.hero?.description === "string" &&
        data.content.hero.description.trim()
            ? data.content.hero.description
            : null;

    const alertRaw = data.content.alert;
    const alert =
        typeof alertRaw === "string" && alertRaw.trim() ? alertRaw.trim() : null;

    const legalInquiries =
        typeof data.content.legal_inquiries === "string"
            ? data.content.legal_inquiries.trim()
            : "";

    return {
        termsPagePayload: data,
        termsItems,
        arguments: generateArguments(termsItems),
        heroTitles,
        heroDescription,
        alert,
        heroUpdatedAt: data.content.hero?.updated_at ?? null,
        legalInquiries,
    };
}

interface ITermsStore {
    termsAudience: TermsAudience;
    setTermsAudience: (audience: TermsAudience) => void;
    termsItems: ITermItem[];
    arguments: IArgument[];
    termsPagePayload: TermsPagePayload | null;
    cmsHydrated: boolean;
    heroTitles: string[] | null;
    heroDescription: string | null;
    alert: string | null;
    heroUpdatedAt: string | null;
    legalInquiries: string;
    setTermsItems: (items: ITermItem[]) => void;
    hydrateFromCms: (lang: "en" | "ar", audience: TermsAudience) => Promise<void>;
}

const useTermsStore = create<ITermsStore>((set) => ({
    termsAudience: "all",
    termsItems: termsItemsEn,
    arguments: generateArguments(termsItemsEn),
    termsPagePayload: null,
    cmsHydrated: false,
    heroTitles: null,
    heroDescription: null,
    alert: null,
    heroUpdatedAt: null,
    legalInquiries: "",

    setTermsAudience: (audience) => set({ termsAudience: audience }),

    setTermsItems: (items) =>
        set({ termsItems: items, arguments: generateArguments(items) }),

    hydrateFromCms: async (lang, audience) => {
        const id = ++hydrateRequestId;
        try {
            const payload = await fetchTermsPage(lang, audience);
            if (id !== hydrateRequestId) return;
            set({
                cmsHydrated: true,
                ...mapTermsPageToState(payload, lang),
            });
        } catch {
            if (id !== hydrateRequestId) return;
            set({
                cmsHydrated: true,
                ...mapTermsPageToState(null, lang),
            });
        }
    },
}));

export default useTermsStore;
