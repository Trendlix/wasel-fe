"use client";

import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";

const ArgumentsColors = [
    "bg-main-secondary",
    "bg-main-primary",
    "bg-main-red",
];

const TermsSidebar = () => {
    const argumentsList = useTermsStore((state) => state.arguments);
    const locale = useLocale();
    const isAr = locale === "ar";
    const t = useTranslations("terms.sidebar");

    const [activeSlug, setActiveSlug] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            let current = "";
            argumentsList.forEach((arg) => {
                const el = document.getElementById(arg.slug);
                if (el) {
                    const elTop = el.offsetTop;
                    const scrollPosition = window.scrollY + 200;
                    if (scrollPosition >= elTop) current = arg.slug;
                }
            });
            setActiveSlug(current);
        };

        const hash = window.location.hash.replace("#", "");
        if (hash) {
            requestAnimationFrame(() => {
                setActiveSlug(hash);
                document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
            });
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [argumentsList]);

    return (
        <aside className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
            <Header title={t("contents")} />
            <div className={clsx(isAr ? "pr-4" : "pl-4", "space-y-8")}>
                <ArgumentsList argumentsList={argumentsList} activeSlug={activeSlug} isAr={isAr} />
                <ContactSupport t={t} isAr={isAr} />
            </div>
        </aside>
    );
};

const Header = ({ title }: { title: string }) => {
    return (
        <h2 className="text-sm font-medium leading-4 tracking-tight text-foreground/30 uppercase">
            {title}
        </h2>
    );
};

const ArgumentsList = ({
    argumentsList,
    activeSlug,
    isAr,
}: {
    argumentsList: { title: string; slug: string }[];
    activeSlug: string;
    isAr: boolean;
}) => {
    return (
        <div className="flex flex-col gap-3" dir="ltr">
            {argumentsList.map((arg, index) => (
                <ArgumentItem
                    key={index}
                    slug={arg.slug}
                    title={arg.title}
                    color={ArgumentsColors[index % ArgumentsColors.length]}
                    isActive={activeSlug === arg.slug}
                    isAr={isAr}
                />
            ))}
        </div>
    );
};

const ArgumentItem = ({
    slug,
    title,
    color,
    isActive,
    isAr,
}: {
    slug: string;
    title: string;
    color: string;
    isActive: boolean;
    isAr: boolean;
}) => {
    return (
        <a
            href={`#${slug}`}
            className={
                clsx(
                    "text-sm font-medium leading-4 tracking-tight flex items-start gap-1.5 transition-colors",
                    isAr ? "flex-row-reverse text-right" : "flex-row text-left",
                    isActive ? "text-foreground" : "text-foreground/30"
                )
            }
        >
            <span className={clsx("mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors", color)} />
            <span>{title}</span>
        </a >
    );
};

const SidebarCard = ({
    isAr,
    children,
}: {
    isAr: boolean;
    children: React.ReactNode;
}) => (
    <div
        className={clsx(
            "space-y-2.5 rounded-lg px-4 py-5 text-nowrap",
            "border transition-colors duration-200",
            "bg-main-beautifulWhite border-main-whiteMarble",
            "dark:bg-[#111113] dark:border-[#FFFFFF0D]",
            isAr && "text-right"
        )}
    >
        {children}
    </div>
);

const ContactSupport = ({
    t,
    isAr,
}: {
    t: ReturnType<typeof useTranslations<"terms.sidebar">>;
    isAr: boolean;
}) => {
    return (
        <div className="space-y-4">
            <SidebarCard isAr={isAr}>
                <p className={clsx(
                    "font-sans font-normal text-xs leading-5 tracking-[0]",
                    "text-main-flatBlack/60 dark:text-[#FFFFFF8C]"
                )}>
                    {t("contactQuestion")}
                </p>

                <a
                    className={clsx(
                        "font-sans font-medium text-xs leading-4 tracking-[0]",
                        "text-main-secondary hover:underline transition-all"
                    )}
                    href="mailto:legal@flanefleet.com"
                    dir="ltr"
                >
                    legal@flanefleet.com
                </a>
            </SidebarCard>

            <SidebarCard isAr={isAr}>
                <p className={clsx(
                    "font-sans font-normal text-xs leading-5 tracking-[0] uppercase",
                    "text-main-flatBlack/30 dark:text-white/30"
                )}>
                    {t("related")}
                </p>
                <ul className={clsx(
                    "capitalize space-y-1",
                    "text-main-flatBlack/45 dark:text-white/45",
                    isAr && "text-right"
                )}>
                    <li className="transition-colors hover:text-main-flatBlack/70 dark:hover:text-white/70">
                        <Link href="/policy">
                            {isAr ? "سياسة الخصوصية ←" : "→ Privacy Policy"}
                        </Link>
                    </li>
                    <li className="transition-colors hover:text-main-flatBlack/70 dark:hover:text-white/70">
                        <Link href="/faqs">
                            {isAr ? "الأسئلة الشائعة ←" : "→ FAQ"}
                        </Link>
                    </li>
                </ul>
            </SidebarCard>
        </div >
    );
};

export default TermsSidebar;