import { ISupportedLocale } from "@/shared/types/common/localization.types";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

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

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}