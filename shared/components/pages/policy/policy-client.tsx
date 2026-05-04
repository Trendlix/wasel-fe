"use client";

import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import usePolicyStore from "@/shared/hooks/store/pages/policy/usePolicyStore";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import PolicySection from "./policy-section";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const PolicyClient = () => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const hydrateFromCms = usePolicyStore((s) => s.hydrateFromCms);
    const hydrateEmails = useContactEmailsStore((s) => s.hydrateEmails);

    useEffect(() => {
        void hydrateFromCms();
        void hydrateEmails();
    }, [hydrateFromCms, hydrateEmails]);

    return (<div className="bg-white dark:bg-main-codGray" dir={dir}>
        <Navbar />
        <Hero />
        <PolicySection />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>);
};

export default PolicyClient;
