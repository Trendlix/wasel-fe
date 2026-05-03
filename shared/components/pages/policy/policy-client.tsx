"use client";

import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import usePolicyStore from "@/shared/hooks/store/pages/policy/usePolicyStore";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import PolicySection from "./policy-section";
import { useEffect } from "react";

const PolicyClient = () => {
    const hydrateFromCms = usePolicyStore((s) => s.hydrateFromCms);
    const hydrateEmails = useContactEmailsStore((s) => s.hydrateEmails);

    useEffect(() => {
        void hydrateFromCms();
        void hydrateEmails();
    }, [hydrateFromCms, hydrateEmails]);

    return (<div className="bg-white dark:bg-main-codGray">
        <Navbar />
        <Hero />
        <PolicySection />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>);
};

export default PolicyClient;
