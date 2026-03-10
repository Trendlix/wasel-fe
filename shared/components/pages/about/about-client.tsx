"use client";

import { useRef, useState } from "react";
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
const AboutClient = () => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);
    const scopeRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scopeRef} className={clsx("bg-white dark:bg-main-codGray", "overflow-hidden", "relative")}>
            <div ref={scrollTriggerRef} className="absolute left-0 top-[100vh] w-px h-px pointer-events-none" aria-hidden />
            <Navbar scrollTriggerRef={scrollTriggerRef} />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <Section1 />
            <Section2 />
            <Section4 />
            <HomeSection4 heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
            <FAQ heroLayoutReady={heroLayoutReady} className="py-10 bg-white dark:bg-main-codGray dark:text-white text-black" />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-white dark:bg-main-codGray" />
        </div>
    );
}

export default AboutClient;