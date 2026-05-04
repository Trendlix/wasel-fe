"use client";

import useFaqsStore, { faqUiLang } from "@/shared/hooks/store/pages/faqs/usefaqsStore";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

const argumentsColors = [
    "bg-main-secondary",
    "bg-main-primary",
    "bg-main-red",
];

interface CategoryItem {
    categoryKey: string;
    category: string;
    length: number;
}

interface ItemProps {
    item: CategoryItem;
    isActive: boolean;
    color: string;
    onClick: () => void;
    isRtl: boolean;
}

const Item = ({ item, isActive, color, onClick, isRtl }: ItemProps) => {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${item.category} — ${item.length} questions`}
            className={clsx(
                "flex w-full items-start gap-1.5 py-1 text-start text-sm font-medium leading-4 tracking-tight transition-colors",
                isActive ? "text-foreground" : "text-foreground/30 hover:text-foreground/50",
            )}
            onClick={onClick}
        >
            <span
                className={clsx(
                    "mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                    color,
                    !isActive && "opacity-50",
                )}
                aria-hidden
            />
            <span className="min-w-0 flex-1">{item.category}</span>

            {isActive ? (
                <ChevronRight
                    size={14}
                    className={clsx("mt-0.5 shrink-0", isRtl && "-scale-x-100")}
                    aria-hidden
                />
            ) : (
                <span
                    className={clsx(
                        "shrink-0 text-xs font-medium tabular-nums leading-4 text-foreground/40",
                    )}
                >
                    {item.length}
                </span>
            )}
        </button>
    );
};

const Header = ({ title }: { title: string }) => (
    <h2 className="text-start text-sm font-medium uppercase leading-4 tracking-tight text-foreground/30">
        {title}
    </h2>
);

const SidebarCard = ({ children }: { children: React.ReactNode }) => (
    <div
        className={clsx(
            "space-y-2.5 rounded-lg px-4 py-5 text-start",
            "border border-main-whiteMarble bg-main-beautifulWhite transition-colors duration-200",
            "dark:border-[#FFFFFF0D] dark:bg-[#111113]",
        )}
    >
        {children}
    </div>
);

const ContactSupportButton = () => {
    const t = useTranslations("faqs.contactCard");

    return (
        <SidebarCard>
            <h3
                className={clsx(
                    "font-sans text-sm font-semibold leading-5 tracking-tight text-main-flatBlack dark:text-white",
                )}
            >
                {t("title")}
            </h3>

            <p
                className={clsx(
                    "font-sans text-xs font-normal leading-5 tracking-[0] text-main-flatBlack/60 dark:text-[#FFFFFF8C]",
                )}
            >
                {t("description")}
            </p>

            <Link
                href="/contact"
                className={clsx(
                    "mt-1 inline-flex w-full items-center justify-center rounded-full py-2.5",
                    "text-center font-sans text-xs font-medium leading-4 tracking-tight transition-all duration-200",
                    "bg-main-secondary text-main-flatBlack hover:brightness-110 active:scale-[0.98]",
                )}
            >
                {t("btn")}
            </Link>
        </SidebarCard>
    );
};

const FaqsSidebar = () => {
    const locale = useLocale();
    const lang = faqUiLang(locale);
    const isRtl = lang === "ar";
    const t = useTranslations("faqs.sidebar");

    const { activeCategoryKey, setActiveCategory, categories, setLang, cmsHydrated } = useFaqsStore();

    useEffect(() => {
        setLang(lang);
    }, [lang, setLang, cmsHydrated]);

    const displayedCategories = categories.map((cat) => ({
        categoryKey: cat.categoryKey,
        category: cat.category,
        length: cat.length,
    }));

    return (
        <aside
            className="space-y-8"
            dir={isRtl ? "rtl" : "ltr"}
            lang={locale}
            aria-label={isRtl ? "فئات الأسئلة" : "FAQ categories"}
        >
            <Header title={t("categories")} />
            <div className="space-y-8 ps-4">
                <nav>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {displayedCategories.map((category, index) => (
                            <li key={category.categoryKey}>
                                <Item
                                    item={category}
                                    color={argumentsColors[index % argumentsColors.length]}
                                    isActive={
                                        category.categoryKey.trim() ===
                                        activeCategoryKey.trim()
                                    }
                                    isRtl={isRtl}
                                    onClick={() => setActiveCategory(category.categoryKey, lang)}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
                <ContactSupportButton />
            </div>
        </aside>
    );
};

export default FaqsSidebar;
