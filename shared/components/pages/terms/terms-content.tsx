"use client";

import { RichTextHtml } from "@/shared/components/common/rich-text-html";
import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import type { ContactEmailsPayload } from "@/shared/lib/contact-emails-api";
import { legalSectionAnchorId } from "@/shared/lib/legal-section-anchor";
import { faqUiLang, formatLegalClauseRef } from "@/shared/lib/ui-locale";
import clsx from "clsx";
import { AlertTriangleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const ArgumentsColors = [
    { iconBg: "bg-main-secondary/20", iconText: "text-main-secondary", bar: "bg-main-secondary" },
    { iconBg: "bg-main-primary/20", iconText: "text-main-primary", bar: "bg-main-primary" },
    { iconBg: "bg-main-red/20", iconText: "text-main-red", bar: "bg-main-red" },
];

const contactCardDefs: Array<{
    labelKey: "generalSupport" | "legalInquiries" | "privacyConcerns" | "businessPartnerships";
    emailKey: keyof ContactEmailsPayload;
    color: string;
}> = [
        { labelKey: "generalSupport", emailKey: "general_support", color: "text-main-secondary" },
        { labelKey: "legalInquiries", emailKey: "legal_inquiries", color: "text-main-red" },
        { labelKey: "privacyConcerns", emailKey: "privacy_concerns", color: "text-main-primary" },
        { labelKey: "businessPartnerships", emailKey: "business_partnerships", color: "text-main-secondary" },
    ];

const emailFallbacks: ContactEmailsPayload = {
    general_support: "support@flanefleet.com",
    legal_inquiries: "legal@flanefleet.com",
    privacy_concerns: "privacy@flanefleet.com",
    business_partnerships: "partners@flanefleet.com",
};

const TermsContent = () => {
    const termsItems = useTermsStore((state) => state.termsItems);
    const alertCms = useTermsStore((state) => state.alert);
    const legalInquiriesFromTerms = useTermsStore((state) => state.legalInquiries);
    const cmsEmails = useContactEmailsStore((state) => state.emails);
    const locale = useLocale();
    const isAr = faqUiLang(locale) === "ar";
    const t = useTranslations("terms.warning");
    const tc = useTranslations("terms.contact");

    return (
        <div className="space-y-14" dir={isAr ? "rtl" : "ltr"}>

            {/* Warning banner */}
            <div
                className={clsx(
                    "border border-main-red/20 bg-main-red/5 dark:bg-main-flatBlack",
                    "flex items-start gap-4 rounded-lg p-4",
                    "flex-row"
                )}
            >
                <div className="flex-shrink-0">
                    <AlertTriangleIcon className="text-main-red" />
                </div>
                <div className={clsx("text-sm leading-5", isAr ? "text-right" : "text-left")}>
                    {alertCms ? (
                        <RichTextHtml html={alertCms} className="text-main-carbonBlue dark:text-main-secondary [&_a]:text-main-secondary" />
                    ) : (
                        <>
                            <span className="capitalize font-bold text-main-flatBlack dark:text-white">
                                {t("title")}
                            </span>
                            {": "}
                            <span className="text-main-carbonBlue dark:text-main-secondary/90">
                                {t("descript")}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Terms sections */}
            <div className="space-y-12">
                {termsItems.map((item, index) => {
                    const { iconBg, iconText, bar } = ArgumentsColors[index % ArgumentsColors.length];
                    const slug = legalSectionAnchorId(item);

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
                                    <h3 className="text-xl font-bold text-main-flatBlack dark:text-white">
                                        <RichTextHtml
                                            as="span"
                                            html={item.title}
                                            className="text-xl font-bold text-main-flatBlack dark:text-white [&_p]:inline [&_p]:mb-0"
                                        />
                                    </h3>
                                    <div className={clsx(
                                        "mt-1 h-0.5 w-8",
                                        bar,
                                        isAr ? "ml-auto mr-0" : "mr-auto ml-0"
                                    )} />
                                </div>
                            </div>

                            {/* Highlights */}
                            <ul className="space-y-4 ps-12">
                                {item.higlights.map((hl, idx) => (
                                    <li key={idx} className="text-sm text-start">
                                        <div className="flex flex-row items-baseline gap-2 font-semibold text-main-carbonBlue dark:text-main-secondary">
                                            <span
                                                dir="ltr"
                                                translate="no"
                                                className="shrink-0 tabular-nums text-main-carbonBlue/75 dark:text-main-secondary/85"
                                            >
                                                {formatLegalClauseRef(item.id, idx + 1, locale)}
                                            </span>
                                            <RichTextHtml
                                                as="span"
                                                html={hl.title}
                                                className="min-w-0 flex-1 font-semibold text-main-carbonBlue dark:text-main-secondary [&_p]:mb-0 [&_p]:inline"
                                            />
                                        </div>
                                        <RichTextHtml
                                            html={hl.descript}
                                            className="mt-0.5 leading-relaxed text-main-carbonBlue/80 dark:text-white/70"
                                        />
                                    </li>
                                ))}
                            </ul>

                        </section>
                    );
                })}
            </div>

            {/* Contact Us */}
            <section
                className={clsx(
                    "space-y-6 rounded-lg px-8 py-9",
                    "dark:bg-[#0D0D0D] bg-main-beautifulWhite",
                    "border border-t-[#FFFFFF0D] dark:border-[#FFFFFF0D] border-main-whiteMarble",
                    isAr && "text-right"
                )}
            >
                <div className={clsx("space-y-2", isAr && "text-right")}>
                    <h2
                        className={clsx(
                            "font-sans font-bold dark:text-white text-main-flatBlack",
                            "text-[22px] leading-[33px] tracking-[0px]"
                        )}
                    >
                        {tc("title")}
                    </h2>
                    <p
                        className={clsx(
                            "font-sans font-normal max-w-xl",
                            "text-[14px] leading-[22.75px] tracking-[0px]",
                            "dark:text-[#FFFFFF8C] text-main-flatBlack/60"
                        )}
                    >
                        {tc("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactCardDefs.map((card) => {
                        const fromCms = cmsEmails[card.emailKey]?.trim();
                        const fromTerms =
                            card.emailKey === "legal_inquiries"
                                ? legalInquiriesFromTerms?.trim()
                                : "";
                        const email =
                            fromTerms || fromCms || emailFallbacks[card.emailKey];
                        return (
                            <a
                                key={card.labelKey}
                                href={`mailto:${email}`}
                                className={clsx(
                                    "flex flex-col gap-3 rounded-xl px-5 py-4",
                                    "dark:bg-[#111113] bg-white",
                                    "border dark:border-[#FFFFFF0D] border-main-whiteMarble",
                                    "transition-all duration-200",
                                    "dark:hover:bg-[#1a1a1c] hover:bg-main-grayHint",
                                    "hover:scale-[0.99] active:scale-[0.97]",
                                    isAr && "text-right"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "font-sans font-medium uppercase",
                                        "text-[12px] leading-[16px] tracking-[0.6px]",
                                        card.color
                                    )}
                                >
                                    {tc(card.labelKey)}
                                </span>
                                <span
                                    className={clsx(
                                        "font-sans font-normal",
                                        "text-[14px] leading-[20px] tracking-[0px]",
                                        "dark:text-white/70 text-main-flatBlack/70"
                                    )}
                                >
                                    {email}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </section >

            <div>
                <hr className="bg-black/5 dark:bg-white/5 mb-6" />
                <div className="flex items-center gap-2">
                    <Link
                        href="/policy"
                        dir={"ltr"}
                        className="inline-flex items-center gap-2 text-sm font-medium text-main-flatBlack bg-main-gold rounded-[4px] px-5 py-2.5 border border-black/10 dark:border-white/15 transition-all duration-200 hover:brightness-95 hover:scale-[0.98] active:scale-95"
                    >
                        {isAr ? "← سياسة الخصوصية" : "Privacy Policy →"}
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

export default TermsContent;