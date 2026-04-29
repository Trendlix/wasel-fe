"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { IAboutPageContent } from "@/shared/types/pages/about.types";

type HeroProps = {
    onLayoutReady?: () => void;
    hero?: IAboutPageContent["hero"];
};

const Hero = ({ onLayoutReady, hero }: HeroProps) => {
    const t = useTranslations("about.hero");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";
    const scopeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const headingXWidthRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!scopeRef.current || !headingRef.current || !headingXWidthRef.current) return;
        // intilaize state
        gsap.set(headingRef.current, { autoAlpha: 0, y: -150 })
        gsap.set(headingXWidthRef.current, { width: 0 })


        const tl = gsap.timeline({
            onComplete: () => onLayoutReady?.(),
        });
        tl.to(headingRef.current, {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)"
        }).to(headingXWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<")
    }, { scope: scopeRef })


    const title1a = hero?.titles?.[0] || t("line1a");
    const title1b = hero?.titles?.[1] || t("line1b");
    const title2 = hero?.titles?.[2] || t("line2");
    const heroBackground = hero?.bg?.trim()
        ? hero.bg
        : "/brand/pages/about/hero/hero-bg.jpg";

    return (
        <section ref={scopeRef} dir={dir} className={clsx("h-dvh")}
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${heroBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={clsx("container h-full", "flex flex-col items-start justify-end", "py-20", dir === "rtl" && "items-end")}>
                <h1 className={clsx("text-white font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl opacity-0", isAr && "leading-tight", "text-start", dir === "rtl" && "text-end")} ref={headingRef}>
                    <p>
                        {title1a}
                        <br className="max-md:hidden" />
                        {title1b}
                    </p>
                    <p className={clsx("w-fit", "relative", "mt-1 text-nowrap")}>
                        <span className="relative z-10">{title2}</span>
                        <span className={clsx("absolute", "inset-0 w-0 h-full bg-main-ukraineBlue z-0", dir === "rtl" && "origin-right right-0 left-auto")} ref={headingXWidthRef}></span>
                    </p>
                </h1>
            </div>
        </section>
    );
};

export default Hero;