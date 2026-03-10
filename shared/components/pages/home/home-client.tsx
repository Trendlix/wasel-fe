"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLockScroll } from "@/shared/hooks/common/useScrollLock";
import useLenis from "@/shared/hooks/animation/layout/useLenis";
import useScrollToTopBeforeRefresh from "@/shared/hooks/animation/layout/useScrollToTopBeforeRefresh";
import useNavbarStore from "@/shared/hooks/store/layout/useNavbr";
import Hero from "./hero";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";

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

const HomeClient = () => {
    useLockScroll({ duration: 2000 });
    useLenis();
    useScrollToTopBeforeRefresh();
    const { resolvedTheme } = useTheme();
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);
    const [heroMountReady, setHeroMountReady] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        if (!resolvedTheme) return;
        setTheme("dark");
    }, [resolvedTheme, setTheme]);

    return (
        <HeroLayoutContext.Provider value={{ heroLayoutReady, setHeroLayoutReady, heroMountReady }}>
            <div className="relative min-h-screen bg-white dark:bg-main-codGray">
                <Navbar />
                <Hero onLayoutReady={setHeroLayoutReady} onMountStart={() => setHeroMountReady(true)} />
                <Section1 heroLayoutReady={heroLayoutReady} />
                <Section2 heroLayoutReady={heroLayoutReady} />
                <Section3 heroLayoutReady={heroLayoutReady} />
                <Section4 heroLayoutReady={heroLayoutReady} />
                <BrandBanner heroLayoutReady={heroLayoutReady} />
                <FAQ heroLayoutReady={heroLayoutReady} className="py-16 md:py-24 xl:py-28" />
                <Footer heroLayoutReady={heroLayoutReady} />
            </div>
        </HeroLayoutContext.Provider>
    );
};

export default HomeClient;