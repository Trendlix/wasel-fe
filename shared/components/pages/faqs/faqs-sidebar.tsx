"use client";

import useFaqsStore from "@/shared/hooks/store/pages/faqs/usefaqsStore";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

interface CategoryItem {
    categoryKey: string;
    category: string;
    length: number;
}

interface ItemProps {
    item: CategoryItem;
    isActive: boolean;
    onClick: () => void;
}

const Item = ({ item, isActive, onClick }: ItemProps) => {
    const locale = useLocale();
    const isAr = locale === "ar";

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${item.category} — ${item.length} questions`}
            className={clsx(
                "w-full font-bold text-base leading-5",
                "p-4 rounded-[14px]",
                "flex items-center justify-between",
                "cursor-pointer transition-colors duration-200",

                isActive
                    ? "bg-main-secondary text-main-flatBlack dark:text-main-flatBlack"
                    : [
                        "text-black dark:text-white",
                        "hover:bg-main-secondary/30",
                        "hover:text-main-flatBlack dark:hover:text-main-flatBlack"
                    ]
            )}
            onClick={onClick}
        >
            <span>{item.category}</span>

            {isActive ? (
                <ChevronRight
                    size={16}
                    className={clsx("font-bold", isAr && "rotate-180")}
                    aria-hidden
                />
            ) : (
                <span className="text-sm opacity-70">
                    {item.length}
                </span>
            )}
        </button>
    );
};

const ContactSupportButton = () => {
    const t = useTranslations("faqs.contactCard");

    return (
        <div
            className={clsx(
                "mt-4 rounded-3xl border p-6 flex flex-col gap-3",
                "transition-colors duration-200",

                "bg-[#f9f9f9] border-[#e5e5e5] text-black",
                "dark:bg-white/5 dark:border-[#2a2a2a] dark:text-white"
            )}
        >
            <h3 className="text-lg font-bold">
                {t("title")}
            </h3>

            <p
                className={clsx(
                    "text-sm leading-relaxed",
                    "text-[#666]",
                    "dark:text-[#9a9a9a]"
                )}
            >
                {t("description")}
            </p>

            <button
                className={clsx(
                    "mt-3 w-full rounded-full py-3.5 text-sm font-bold",
                    "transition-all duration-200",

                    "bg-[#ffb400] text-black",
                    "hover:brightness-110 active:scale-[0.98]"
                )}
            >
                {t("btn")}
            </button>
        </div>
    );
};

const FaqsSidebar = () => {
    const locale = useLocale();
    const lang = locale as "en" | "ar";
    const isAr = lang === "ar";

    const { activeCategoryKey, setActiveCategory, categories, setLang } = useFaqsStore();

    useEffect(() => {
        setLang(lang);
    }, [lang, setLang]);

    const displayedCategories = categories.map((cat) => ({
        categoryKey: cat.categoryKey,
        category: cat.category,
        length: cat.length,
    }));

    return (
        <aside
            aria-label={isAr ? "فئات الأسئلة" : "FAQ categories"}
            dir={isAr ? "rtl" : "ltr"}
        >
            <nav>
                <ul className="flex flex-col gap-1 list-none p-0 m-0">
                    {displayedCategories.map((category) => (
                        <li key={category.categoryKey}>
                            <Item
                                item={category}
                                isActive={category.categoryKey === activeCategoryKey}
                                onClick={() => setActiveCategory(category.categoryKey, lang)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
            <ContactSupportButton />
        </aside>
    );
};

export default FaqsSidebar;