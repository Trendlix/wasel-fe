"use client";

import { useGSAP } from "@gsap/react";
import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import useTermsStore from "@/shared/hooks/store/pages/terms/useTermsStore";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import TermsAudienceFilter from "./terms-audience-filter";
import TermsSection from "./terms-section";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

const TermsClient = () => {
    const belowHeroRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const lang = locale === "ar" ? "ar" : "en";
    const audience = useTermsStore((s) => s.termsAudience);
    const hydrateFromCms = useTermsStore((s) => s.hydrateFromCms);
    const hydrateEmails = useContactEmailsStore((s) => s.hydrateEmails);

    useEffect(() => {
        void hydrateFromCms(lang, audience);
        void hydrateEmails();
    }, [lang, audience, hydrateFromCms, hydrateEmails]);

    useGSAP(
        () => {
            const el = belowHeroRef.current;
            if (!el) return;

            gsap.set(el, { autoAlpha: 0, y: 80 });
            gsap.to(el, {
                y: 0,
                autoAlpha: 1,
                duration: 1.35,
                ease: "back.out(1.45)",
            });
        },
        { dependencies: [lang, audience] },
    );

    return (
        <div className="bg-white dark:bg-main-codGray">
            <Navbar />
            <Hero />
            <div ref={belowHeroRef} className="opacity-0">
                <TermsAudienceFilter />
                <TermsSection />
            </div>
            <Footer className="bg-white dark:bg-main-codGray" />
        </div>
    );
};

export default TermsClient;
