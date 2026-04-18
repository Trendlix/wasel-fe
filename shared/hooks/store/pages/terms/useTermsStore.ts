import { create } from "zustand";
import { ITermItem, termsItemsAr, termsItems as termsItemsEn } from "@/shared/constants/terms";

interface IArgument {
    title: string;
    slug: string;
}

interface ITermsStore {
    termsItems: ITermItem[];
    arguments: IArgument[];
    setTermsItems: (items: ITermItem[]) => void;
    getLocalizedTermsItems: (locale: string) => ITermItem[];
    setLocalizedTermsItems: (locale: string) => void;
}

function generateArguments(items: ITermItem[]): IArgument[] {
    return items.map((item) => ({
        title: item.title,
        slug: item.title.toLocaleLowerCase().replace(/\s+/g, "-")
    }));
}

const useTermsStore = create<ITermsStore>((set) => ({
    termsItems: termsItemsEn,
    arguments: generateArguments(termsItemsEn),

    setTermsItems: (items) =>
        set({ termsItems: items, arguments: generateArguments(items) }),

    getLocalizedTermsItems: (locale) => {
        if (locale === "ar") return termsItemsAr;
        return termsItemsEn;
    },

    setLocalizedTermsItems: (locale) => {
        const items = locale === "ar" ? termsItemsAr : termsItemsEn;
        set({ termsItems: items, arguments: generateArguments(items) });
    }
}));

export default useTermsStore;