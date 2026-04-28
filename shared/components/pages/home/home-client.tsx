"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useLockScroll } from "@/shared/hooks/common/useScrollLock";
import useLenis from "@/shared/hooks/animation/layout/useLenis";
import useScrollToTopBeforeRefresh from "@/shared/hooks/animation/layout/useScrollToTopBeforeRefresh";
import Hero from "./hero";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import { IHomePageResponse } from "@/shared/types/pages/home.types";

type HeroLayoutContextType = {
    heroLayoutReady: boolean;
    setHeroLayoutReady: (ready: boolean) => void;
    heroMountReady: boolean;
};

const HeroLayoutContext = createContext<HeroLayoutContextType | null>(null);

export const useHeroLayoutReady = () => {
    const ctx = useContext(HeroLayoutContext);
    return ctx?.heroLayoutReady ?? false;
};

export const useHeroMountReady = () => {
    const ctx = useContext(HeroLayoutContext);
    return ctx ? ctx.heroMountReady : true;
};

export const useSetHeroLayoutReady = () => {
    const ctx = useContext(HeroLayoutContext);
    return ctx?.setHeroLayoutReady ?? (() => { });
};

const HomeClient = ({
    content,
    common,
    altImg,
}: {
    content: IHomePageResponse["content"];
    common: IHomePageResponse["common"];
    altImg: IHomePageResponse["alt_img"];
}) => {
    const heroContent = content?.hero ?? null;
    const platformContent = content?.platform;
    const transportContent = content?.transport;
    const maximizingContent = content?.maximizing;
    const commonContent = common;

    useLockScroll({ duration: 2000 });
    useLenis();
    useScrollToTopBeforeRefresh();
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);
    const [heroMountReady, setHeroMountReady] = useState(false);
    const scrollTriggerRef = useRef<HTMLDivElement>(null);

    return (
        <HeroLayoutContext.Provider value={{ heroLayoutReady, setHeroLayoutReady, heroMountReady }}>
            <div className="relative min-h-screen bg-white dark:bg-main-codGray">
                <Navbar scrollTriggerRef={scrollTriggerRef} />
                <Hero onLayoutReady={setHeroLayoutReady} onMountStart={() => setHeroMountReady(true)} heroContent={heroContent} altImg={altImg} />
                <div ref={scrollTriggerRef}>
                    <Section1 heroLayoutReady={heroLayoutReady} platformContent={platformContent ?? null} />
                </div>
                <Section2 heroLayoutReady={heroLayoutReady} transportContent={transportContent ?? null} />
                <Section3 heroLayoutReady={heroLayoutReady} maximizingContent={maximizingContent ?? null} />
                <Section4 heroLayoutReady={heroLayoutReady} appContent={commonContent?.app ?? null} />
                <BrandBanner heroLayoutReady={heroLayoutReady} brandContent={commonContent?.brand ?? null} />
                <FAQ heroLayoutReady={heroLayoutReady} className="bg-black" faqContent={commonContent?.faqs ?? null} />
                <Footer heroLayoutReady={heroLayoutReady} />
            </div>
        </HeroLayoutContext.Provider>
    );
};

export default HomeClient;