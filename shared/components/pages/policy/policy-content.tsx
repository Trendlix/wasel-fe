"use client";

import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import clsx from "clsx";
import { AlertTriangleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

const ArgumentsColors = [
    { iconBg: "bg-main-secondary/20", iconText: "text-main-secondary", bar: "bg-main-secondary" },
    { iconBg: "bg-main-primary/20", iconText: "text-main-primary", bar: "bg-main-primary" },
    { iconBg: "bg-main-red/20", iconText: "text-main-red", bar: "bg-main-red" },
];

const contactCards = [
    {
        labelKey: "generalSupport",
        email: "support@flanefleet.com",
        color: "text-main-secondary",
    },
    {
        labelKey: "legalInquiries",
        email: "legal@flanefleet.com",
        color: "text-main-red",
    },
    {
        labelKey: "privacyConcerns",
        email: "privacy@flanefleet.com",
        color: "text-main-primary",
    },
    {
        labelKey: "businessPartnerships",
        email: "partners@flanefleet.com",
        color: "text-main-secondary",
    },
];

const PolicyContent = () => {
    const termsItems = useTermsStore((state) => state.termsItems);
    const setLocalizedTermsItems = useTermsStore((state) => state.setLocalizedTermsItems);
    const locale = useLocale();
    const isAr = locale === "ar";
    const t = useTranslations("terms.warning");
    const tc = useTranslations("terms.contact");

    useEffect(() => {
        setLocalizedTermsItems(locale);
    }, [locale, setLocalizedTermsItems]);

    return (
        <div className="space-y-14" dir={isAr ? "rtl" : "ltr"}>

            {/* Warning banner */}
            <div
                className={clsx(
                    "border dark:border-white/5  bg-main-beautifulWhite dark:bg-main-flatBlack",
                    "flex items-start gap-4 rounded-lg p-4",
                    isAr ? "flex-row-reverse" : "flex-row"
                )}
            >

                <div className={clsx("text-sm leading-5", isAr ? "text-right" : "text-left")}>
                    <span className="capitalize text-foreground font-bold">
                        {t("title")}
                    </span>
                    {": "}
                    <span className="text-foreground/70">
                        {t("descript")}
                    </span>
                </div>
            </div>

            {/* Terms sections */}
            <div className="space-y-12">
                {termsItems.map((item, index) => {
                    const { iconBg, iconText, bar } = ArgumentsColors[index % ArgumentsColors.length];
                    const slug = item.title.toLocaleLowerCase().replace(/\s+/g, "-");

                    return (
                        <section key={item.id} id={slug} className="space-y-4">

                            {/* Icon + Title + accent bar */}
                            <div className={clsx(
                                "flex items-center gap-3",
                            )}>
                                <div className={clsx("p-2 rounded-md flex-shrink-0", iconBg)}>
                                    <item.icon size={18} className={iconText} />
                                </div>
                                <div className={isAr ? "text-right" : "text-left"}>
                                    <h3 className="text-xl font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <div className={clsx(
                                        "mt-1 h-0.5 w-8",
                                        bar,
                                        isAr ? "ml-auto mr-0" : "mr-auto ml-0"
                                    )} />
                                </div>
                            </div>

                            {/* Highlights */}
                            <ul className={clsx(
                                "space-y-4",
                                isAr ? "pr-12 pl-0" : "pl-12 pr-0"
                            )}>
                                {item.higlights.map((hl, idx) => (
                                    <li key={idx} className={clsx("text-sm", isAr ? "text-right" : "text-left")}>
                                        <p className="font-semibold text-foreground/80">
                                            {isAr
                                                ? <>{hl.title} .{item.id}.{idx + 1}</>
                                                : <>{item.id}.{idx + 1} {hl.title}</>
                                            }
                                        </p>
                                        <p className="text-foreground/50 mt-0.5 leading-relaxed">
                                            {hl.descript}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                        </section>
                    );
                })}
            </div>

            <div>
                <hr className="bg-black/5 dark:bg-white/5 mb-6" />
                <div className="flex items-center gap-2">
                    <Link
                        href="/terms"
                        dir={"ltr"}
                        className="inline-flex items-center gap-2 text-sm font-medium text-main-flatBlack bg-main-gold rounded-[4px] px-5 py-2.5 border border-black/10 dark:border-white/15 transition-all duration-200 hover:brightness-95 hover:scale-[0.98] active:scale-95"
                    >
                        {isAr ? "← الشروط والأحكام" : "Terms and Conditions →"}
                    </Link>
                    <Link
                        dir={"ltr"}
                        href="/faqs"
                        className="inline-flex items-center gap-2 text-sm font-medium text-main-flatBlack dark:text-white rounded-[4px] px-5 py-2.5 border border-black/15 dark:border-white/15 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/25 dark:hover:border-white/30 active:scale-95"
                    >
                        {isAr ? "← الأسئلة الشائعة" : "View FAQ →"}
                    </Link>
                </div>
            </div>

        </div >
    );
};

export default PolicyContent;