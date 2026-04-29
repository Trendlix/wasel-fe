"use client";

import { useRef } from "react";
import { useState } from "react";
import clsx from "clsx";
import Hero from "./hero";
import Navbar from "../../layout/navbar";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section4 from "./section-4";
import HomeSection4 from "../home/section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import { IAboutCommonContent, IAboutPageContent } from "@/shared/types/pages/about.types";

type AboutClientProps = {
    content?: IAboutPageContent | null;
    common?: IAboutCommonContent | null;
};

const AboutClient = ({ content, common }: AboutClientProps) => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);
    const scopeRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scopeRef} className={clsx("bg-white dark:bg-main-codGray", "overflow-hidden", "relative")}>
            <div ref={scrollTriggerRef} className="absolute left-0 top-[100vh] w-px h-px pointer-events-none" aria-hidden />
            <Navbar scrollTriggerRef={scrollTriggerRef} />
            {!content?.hero?.hide && <Hero hero={content?.hero} onLayoutReady={() => setHeroLayoutReady(true)} />}
            {!content?.founded?.hide && <Section1 founded={content?.founded} />}
            {!content?.stand_for?.hide && <Section2 standFor={content?.stand_for} />}
            {!content?.future?.hide && <Section4 future={content?.future} />}
            {!common?.app?.hide && <HomeSection4 className="bg-white dark:bg-main-codGray" appContent={common?.app ?? null} heroLayoutReady={heroLayoutReady} />}
            {!common?.brand?.hide && (
                <BrandBanner
                    className="bg-white dark:bg-main-codGray"
                    brandContent={common?.brand ?? null}
                    heroLayoutReady={heroLayoutReady}
                />
            )}
            {!common?.faqs?.hide && (
                <FAQ
                    className="bg-white dark:bg-main-codGray dark:text-white text-black"
                    faqContent={common?.faqs ?? null}
                    heroLayoutReady={heroLayoutReady}
                />
            )}
            <Footer className="bg-white dark:bg-main-codGray" heroLayoutReady={heroLayoutReady} />
        </div>
    );
}

export default AboutClient;