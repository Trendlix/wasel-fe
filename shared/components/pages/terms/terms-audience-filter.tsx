"use client";

import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import type { TermsAudience } from "@/shared/lib/marketing-terms-api";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";

const OPTIONS: TermsAudience[] = ["all", "user", "driver"];

function isRtlLocale(locale: string): boolean {
    const normalized = locale.toLowerCase();
    return normalized === "ar" || normalized.startsWith("ar-");
}

const TermsAudienceFilter = () => {
    const locale = useLocale();
    const isRtl = isRtlLocale(locale);
    const t = useTranslations("terms.audience");
    const audience = useTermsStore((s) => s.termsAudience);
    const setTermsAudience = useTermsStore((s) => s.setTermsAudience);

    return (
        <div
            className={clsx(
                "container mt-20 flex flex-row flex-wrap items-center justify-start gap-3 gap-y-3",
            )}
            dir={isRtl ? "rtl" : "ltr"}
            lang={locale}
        >
            <span
                className={clsx(
                    "shrink-0 text-sm font-medium text-foreground/60",
                    "text-start",
                )}
            >
                {t("label")}
            </span>
            <div
                className={clsx(
                    "inline-flex shrink-0 flex-row items-stretch rounded-lg border border-black/10 bg-main-beautifulWhite p-0.5 dark:border-white/10 dark:bg-[#111113]",
                )}
                role="group"
                aria-label={t("label")}
            >
                {OPTIONS.map((key, index) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setTermsAudience(key)}
                        className={clsx(
                            "px-3 py-1.5 text-xs font-medium transition-colors",
                            "border-0 outline-none focus-visible:ring-2 focus-visible:ring-main-gold/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111113]",
                            index === 0 && "rounded-s-md rounded-e-none",
                            index > 0 && index < OPTIONS.length - 1 && "rounded-none",
                            index === OPTIONS.length - 1 && "rounded-e-md rounded-s-none",
                            audience === key
                                ? "bg-main-gold text-main-flatBlack shadow-sm"
                                : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10",
                        )}
                    >
                        {t(key)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TermsAudienceFilter;
