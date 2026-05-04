/**
 * Maps next-intl locale (e.g. `ar`, `ar-EG`) to UI language for CMS-backed pages.
 */
export function faqUiLang(locale: string): "en" | "ar" {
    const normalized = locale.toLowerCase();
    if (normalized === "ar" || normalized.startsWith("ar-")) {
        return "ar";
    }
    return "en";
}

/**
 * Formats section.item reference (e.g. `1.2` or `١.٢`) using Arabic-Indic digits for Arabic locales.
 * The returned string is suitable inside `dir="ltr"` for stable bidi in RTL paragraphs.
 */
export function formatLegalClauseRef(
    sectionNumber: number,
    itemNumber: number,
    locale: string,
): string {
    const useArabicDigits = faqUiLang(locale) === "ar";
    const numLocale = useArabicDigits ? "ar" : "en-US";
    const numberingSystem = useArabicDigits ? "arab" : "latn";
    const opts: Intl.NumberFormatOptions = { numberingSystem, useGrouping: false };
    try {
        const a = sectionNumber.toLocaleString(numLocale, opts);
        const b = itemNumber.toLocaleString(numLocale, opts);
        return `${a}.${b}`;
    } catch {
        return `${sectionNumber}.${itemNumber}`;
    }
}
