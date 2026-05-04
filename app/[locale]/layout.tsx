import { alexandria } from "@/app/fonts";
import { faqUiLang } from "@/shared/lib/ui-locale";
import { ISupportedLocale } from "@/shared/types/common/localization.types";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import clsx from "clsx";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const supportedLocale = locale as ISupportedLocale;
    const t = await getTranslations({ locale: supportedLocale, namespace: "meta" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const supportedLocale = locale as ISupportedLocale;
    const messages = await getMessages({ locale: supportedLocale });

    const isAr = faqUiLang(locale) === "ar";
    const pageDir = isAr ? "rtl" : "ltr";

    return (
        <NextIntlClientProvider messages={messages}>
            <div
                className={clsx(
                    isAr && `${alexandria.variable} locale-ar min-h-dvh`,
                    !isAr && "min-h-dvh"
                )}
                dir={pageDir}
                lang={locale}
            >
                {children}
            </div>
        </NextIntlClientProvider>
    );
}