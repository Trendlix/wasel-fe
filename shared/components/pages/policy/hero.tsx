"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { RefObject, useRef } from "react";
import gsap from "gsap";

type HeroProps = { onLayoutReady?: () => void };

const Hero = ({ onLayoutReady }: HeroProps) => {
    const locale = useLocale();
    const t = useTranslations("policy");
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";

    const headingRef = useRef<HTMLHeadingElement>(null);
    const highlightWidthRef = useRef<HTMLSpanElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const badgeRef = useRef<HTMLDivElement | null>(null);

    const setHighlightWidthRef = (el: HTMLSpanElement | null) => { highlightWidthRef.current = el; };
    const setSubtitleRef = (el: HTMLParagraphElement | null) => { subtitleRef.current = el; };
    const setBadgeRef = (el: HTMLDivElement | null) => { badgeRef.current = el; };

    useGSAP(() => {
        if (!headingRef.current || !highlightWidthRef.current || !subtitleRef.current || !badgeRef.current) return;

        gsap.set(headingRef.current, { autoAlpha: 0, y: 100 });
        gsap.set(highlightWidthRef.current, { width: 0 });
        gsap.set(subtitleRef.current, { autoAlpha: 0, y: 150 });
        gsap.set(badgeRef.current, { autoAlpha: 0, y: 150 });

        const tl = gsap.timeline({
            onComplete: () => onLayoutReady?.(),
        });

        tl.to(headingRef.current, {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)",
        })
            .to(highlightWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<")
            .to(subtitleRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<0.2")
            .to(badgeRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<0.1");

    }, { scope: headingRef });

    return (
        <section
            className="container mt-36 gap-y-8 flex flex-col items-center justify-center text-center"
            dir={dir}
        >
            <Heading
                t={t}
                isAr={isAr}
                headingRef={headingRef}
                setHighlightWidthRef={setHighlightWidthRef}
                setSubtitleRef={setSubtitleRef}
            />
            <Badge t={t} setBadgeRef={setBadgeRef} />
        </section>
    );
};

const Heading = ({
    t, isAr, headingRef, setHighlightWidthRef, setSubtitleRef,
}: {
    t: ReturnType<typeof useTranslations<"policy">>;
    isAr: boolean;
    headingRef: RefObject<HTMLHeadingElement | null>;
    setHighlightWidthRef: (el: HTMLSpanElement | null) => void;
    setSubtitleRef: (el: HTMLParagraphElement | null) => void;
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-6">
            <h1
                ref={headingRef}
                className={clsx(
                    "font-sans font-bold opacity-0",
                    "text-[76.5px] leading-[81px] tracking-[0px]",
                    "text-center",
                    "flex items-center justify-center flex-wrap",
                    isAr ? "gap-x-3 flex-row-reverse" : "gap-x-3 flex-row"
                )}
            >

                <span className="relative py-1 px-2">
                    <span className="relative z-10 text-white">
                        {t("hero.line1")}
                    </span>
                    <span
                        ref={setHighlightWidthRef}
                        className="absolute inset-0 w-full h-full bg-main-primary z-0 "
                    />
                </span>
                <span className="dark:text-white text-main-flatBlack">
                    {t("hero.line2")}
                </span>
            </h1>

            <p
                ref={setSubtitleRef}
                className={clsx(
                    "opacity-0 text-center font-sans font-normal",
                    "text-[20px] leading-[27px] tracking-[0px]",
                    "dark:text-white/60 text-main-flatBlack/60",
                    "2xl:max-w-[60%] xl:max-w-[70%] max-w-[90%]"
                )}
            >
                {t("hero.subtitle")}
            </p>
        </div>
    );
};

const Badge = ({
    t,
    setBadgeRef,
}: {
    t: ReturnType<typeof useTranslations<"terms">>;
    setBadgeRef: (el: HTMLDivElement | null) => void;
}) => {
    const date = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div ref={setBadgeRef} className="opacity-0">
            <p className={clsx(
                "font-sans font-normal text-center",
                "text-[14px] leading-[20px] tracking-[0px]",
                "dark:text-white/40 text-main-flatBlack/40"
            )}>
                {t("hero.lastUpdate")}:{" "}
                <span className="font-medium text-main-gold">
                    {date}
                </span>
            </p>
        </div>
    );
};

export default Hero;