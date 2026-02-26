import { redirect } from "@/i18n/routing";
import { ISupportedLocale } from "@/shared/types/common/localization.types";

interface IRedirectionObj {
  href: string;
  locale: ISupportedLocale;
}

export default async function RootPage(params: IRedirectionObj) {
  const locale = await params.locale as ISupportedLocale;
  const redirectionObj: IRedirectionObj = {
    href: "/",
    locale
  };
  redirect(redirectionObj);
}