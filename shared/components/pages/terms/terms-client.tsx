"use client";

import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import TermsSection from "./terms-section";
import { useEffect } from "react";

const TermsClient = () => {
    const hydrateFromCms = useTermsStore((s) => s.hydrateFromCms);
    const hydrateEmails = useContactEmailsStore((s) => s.hydrateEmails);

    useEffect(() => {
        void hydrateFromCms();
        void hydrateEmails();
    }, [hydrateFromCms, hydrateEmails]);

    return (<div className="bg-white dark:bg-main-codGray">
        <Navbar />
        <Hero />
        <TermsSection />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>);
};

export default TermsClient;
