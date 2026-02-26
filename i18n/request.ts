import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { ISupportedLocale } from '@/shared/types/common/localization.types';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as ISupportedLocale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../shared/localization/messages/${locale}.json`)).default
    };
});