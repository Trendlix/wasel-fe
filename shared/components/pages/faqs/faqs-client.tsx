"use client";

import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import FaqsFooterBanner from "./faqs-footer-banner";
import FaqsSection from "./faqs-section";
import Hero from "./hero";
import useFaqsStore from "@/shared/hooks/store/pages/faqs/usefaqsStore";
import { useEffect } from "react";

const FaqsClient = () => {
    const hydrateFromCms = useFaqsStore((s) => s.hydrateFromCms);

    useEffect(() => {
        void hydrateFromCms();
    }, [hydrateFromCms]);

    return (<div>
        <Navbar />
        <Hero />
        <FaqsSection />
        <FaqsFooterBanner />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>)
}

export default FaqsClient;