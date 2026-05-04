"use client";

import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import FaqsFooterBanner from "./faqs-footer-banner";
import FaqsSection from "./faqs-section";
import Hero from "./hero";
import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import useFaqsStore, { faqUiLang } from "@/shared/hooks/store/pages/faqs/usefaqsStore";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const FaqsClient = () => {
    const locale = useLocale();
    const lang = faqUiLang(locale);
    const setLang = useFaqsStore((s) => s.setLang);
    const hydrateFromCms = useFaqsStore((s) => s.hydrateFromCms);
    const hydrateEmails = useContactEmailsStore((s) => s.hydrateEmails);

    useEffect(() => {
        setLang(lang);
        void hydrateFromCms(lang);
        void hydrateEmails();
    }, [lang, setLang, hydrateFromCms, hydrateEmails]);

    return (<div>
        <Navbar />
        <Hero />
        <FaqsSection />
        <FaqsFooterBanner />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>)
}

export default FaqsClient;