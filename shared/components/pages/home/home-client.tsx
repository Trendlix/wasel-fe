"use client";

import { useLockScroll } from "@/shared/hooks/common/useScrollLock";
import Hero from "./Hero";
import useLenis from "@/shared/hooks/animation/layout/useLenis";
import useScrollToTopBeforeRefresh from "@/shared/hooks/animation/layout/useScrollToTopBeforeRefresh";

const HomeClient = () => {
    useLockScroll({ duration: 2000 });
    useLenis();
    useScrollToTopBeforeRefresh();

    return (
        <div className="relative min-h-screen">
            <Hero />
        </div>
    );
};

export default HomeClient;