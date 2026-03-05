"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
gsap.registerPlugin(ScrollTrigger);

type Section1Props = {
    heroLayoutReady?: boolean;
};

const Section1 = ({ heroLayoutReady = false }: Section1Props) => {
    const t = useTranslations("home.section1");
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const scopeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroLayoutReady || !headingRef.current || !cardsContainerRef.current || !scopeRef.current) return;

        gsap.set(headingRef.current, { autoAlpha: 0, y: 250 });
        gsap.set(cardsContainerRef.current, { autoAlpha: 0, y: 150 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 50%"
            },
        });

        tl.set(cardsContainerRef.current, { autoAlpha: 1 }, 0).fromTo(
            headingRef.current,
            { autoAlpha: 0, y: 250 },
            { autoAlpha: 1, y: 0, duration: 1.4, ease: "back.out(1)" },
        ).fromTo(
            cardsContainerRef.current,
            { y: 150 },
            { y: 0, duration: 1.4, ease: "back.out(1.4)" },
            "<",
        );

    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <section className={clsx("min-h-screen pb-10 bg-black flex flex-col")}>
            <div ref={scopeRef} className={clsx("container gap-y-12 flex-1 flex flex-col")}>

                <h1 ref={headingRef} className={clsx("text-white font-bold text-center", "xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl")} >
                    {t("heading")}
                </h1>

                <div ref={cardsContainerRef} className={clsx("grid grid-cols-3 grid-rows-2 gap-9 flex-1", "min-h-[800px]", "*:rounded-[37px] *:overflow-hidden", "relative z-50")}>
                    <Card1 />
                    <Card2 />
                    <Card3 />
                    <Card4 />
                </div>

            </div>
        </section>
    );
};

const Card1 = () => {
    const t = useTranslations("home.section1.card1");
    return (
        <div className={clsx("col-span-2 row-span-1 bg-main-flatBlack border border-white/19 py-[clamp(1.5rem,2vw,3rem)] px-[clamp(1.5rem,1.5vw,3rem)]")}>
            <div className={clsx("font-medium text-2xl leading-9 text-main-darkHeatherGray", "capitalize")}>{t("title")}</div>
            <div></div>
        </div>
    );
};

const Card2 = () => {
    const t = useTranslations("home.section1.card2");
    return (
        <div className={clsx("col-span-1 row-span-2", "bg-main-matteBlack", "flex flex-col", "py-[clamp(1.5rem,2vw,3rem)] px-[clamp(1.5rem,2.3vw,3rem)]", "*:border")}>
            <div></div>
            <div className={clsx("mt-auto")}>{t("description")}</div>
        </div>
    );
};

const Card3 = () => {
    const t = useTranslations("home.section1.card3");
    return (
        <div className={clsx("col-span-1 row-span-1 bg-main-ukraineBlue", "py-[clamp(1.5rem,2vw,3rem)]")}>
            <p className="text-center">{t("title")}</p>
        </div>
    );
};

const Card4 = () => {
    const t = useTranslations("home.section1.card4");
    return (
        <div className={clsx("col-span-1 row-span-1 bg-white", "py-[clamp(1.5rem,2vw,3rem)]")}>
            <p className="text-center">{t("title")}</p>
        </div>
    );
};

export default Section1;