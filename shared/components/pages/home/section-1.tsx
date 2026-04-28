"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { IHomePageResponse } from "@/shared/types/pages/home.types";
gsap.registerPlugin(ScrollTrigger);

type Section1Props = {
    heroLayoutReady?: boolean;
    platformContent?: NonNullable<IHomePageResponse["content"]>["platform"] | null;
};

const Section1 = ({ heroLayoutReady = false, platformContent = null }: Section1Props) => {
    const t = useTranslations("home.section1");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const headingRef = useRef<HTMLHeadingElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);
    const card4Ref = useRef<HTMLDivElement>(null);
    const scopeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current) return;
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
        if (!headingRef.current || cards.some(c => !c)) return;

        // initial states — each card enters from a direction matching its grid position
        gsap.set(headingRef.current, { autoAlpha: 0, y: 250 });
        gsap.set(card1Ref.current, { autoAlpha: 0, x: -300, y: 100 });
        gsap.set(card2Ref.current, { autoAlpha: 0, x: 300 });
        gsap.set(card3Ref.current, { autoAlpha: 0, x: -200, y: 200 });
        gsap.set(card4Ref.current, { autoAlpha: 0, y: 200 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 50%",
            },
        });

        tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: "back.out(1)" })
            .to(card1Ref.current, { autoAlpha: 1, x: 0, y: 0, duration: 1.1, ease: "back.out(1)" }, "<+=0.15")
            .to(card2Ref.current, { autoAlpha: 1, x: 0, duration: 1.1, ease: "back.out(1)" }, "<+=0.15")
            .to(card3Ref.current, { autoAlpha: 1, x: 0, y: 0, duration: 1.1, ease: "back.out(1)" }, "<+=0.15")
            .to(card4Ref.current, { autoAlpha: 1, y: 0, duration: 1.1, ease: "back.out(1)" }, "<+=0.15");

    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <section className={clsx("min-h-screen pb-10 bg-black flex flex-col")}>
            <div ref={scopeRef} className={clsx("container gap-y-12 flex-1 flex flex-col")}>

                <h1 ref={headingRef} className={clsx("text-white font-bold text-center", "xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl", "leading-tight")}>
                    {platformContent?.title || t("heading")}
                </h1>

                <div className={clsx("md:grid md:grid-cols-3 md:grid-rows-[500px_300px] gap-7", "*:rounded-[37px] *:overflow-hidden max-sm:*:min-h-[230px] max-md:*:min-h-[350px] ", "relative z-50", "max-md:flex max-md:flex-col max-md:gap-7")}>
                    <Card1 ref={card1Ref} dir={dir} title={platformContent?.card_1_title} />
                    <Card2
                        ref={card2Ref}
                        dir={dir}
                        title={platformContent?.title}
                        description={platformContent?.card_4?.description}
                    />
                    <Card3 ref={card3Ref} dir={dir} title={platformContent?.card_2_title} />
                    <Card4 ref={card4Ref} dir={dir} title={platformContent?.card_3_title} />
                </div>

            </div>
        </section>
    );
};

const Card1 = forwardRef<HTMLDivElement, { dir: string; title?: string }>(({ dir, title }, ref) => {
    const t = useTranslations("home.section1.card1");
    return (
        <div ref={ref} className={clsx("md:col-span-2 bg-main-flatBlack border border-white/19 pt-[clamp(1.5rem,2vw,3rem)] px-[clamp(1.5rem,1.5vw,3rem)]", "flex flex-col", "max-md:order-1")} dir={dir}>
            <h3
                className={clsx("font-medium text-start text-white", "md:text-[25.82px] md:leading-[38.8px] text-[19.03px] sm:text-[25px] leading-[26.94px]", "max-md:text-center max-sm:max-w-[250px] max-md:max-w-[400px] sm:mb-5 md:mb-0 max-md:self-center")}
            >
                {title || t("title")}
            </h3>
            <div className="mt-auto">
                <Image src="/brand/pages/home/to-be-gif/cargo.png" alt="card1" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
        </div>
    );
});
Card1.displayName = "Card1";

const Card2 = forwardRef<HTMLDivElement, { dir: string; title?: string; description?: string }>(({ dir, title, description }, ref) => {
    const t = useTranslations("home.section1.card2");
    return (
        <div ref={ref} className={clsx("md:col-span-1 md:row-span-2 max-sm:min-h-[400px]! max-md:min-h-[600px]!", "bg-main-matteBlack", "flex flex-col", "relative", "max-md:order-4")} dir={dir}>
            <Image src="/brand/pages/home/to-be-gif/driver.png" alt="card1" width={1000} height={1000} className="w-full h-full object-cover absolute top-0 left-0 z-0 max-md:hidden" />
            <Image src="/brand/pages/home/to-be-gif/small-driver.png" alt="card1" width={1000} height={1000} className="w-full h-full object-cover absolute top-0 left-0 z-0 md:hidden" />
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="flex flex-col items-center text-center gap-5 px-12 py-8">
                    <h3
                        className={clsx("font-medium text-white", "md:text-[25.82px] md:leading-[30px] text-[19.03px] sm:text-[25px] leading-[26.94px]", "max-md:text-center max-sm:max-w-[250px] max-md:max-w-[400px] sm:mb-5 md:mb-0 max-md:self-center")}
                    >
                        {title || t("title")}
                    </h3>
                    <p
                        className="font-normal text-white/70 max-md:hidden whitespace-pre-line w-full"
                        style={{ fontFamily: "var(--font-jakarta)", fontSize: "16.95px", lineHeight: "26.94px", letterSpacing: "0" }}
                    >
                        {description || t("description")}
                    </p>
                </div>
            </div>
        </div>
    );
});
Card2.displayName = "Card2";

const Card3 = forwardRef<HTMLDivElement, { dir: string; title?: string }>(({ dir, title }, ref) => {
    const t = useTranslations("home.section1.card3");
    return (
        <div ref={ref} className={clsx("md:col-span-1 md:row-span-1 bg-main-ukraineBlue", "pt-[clamp(1.5rem,2vw,3rem)]", "flex flex-col", "max-md:order-2")} dir={dir}>
            <h3
                className={clsx("text-center font-medium text-white px-4", "md:text-[25.82px] md:leading-[38.8px] text-[19.03px] sm:text-[25px] leading-[26.94px]", "max-md:text-center max-sm:max-w-[250px] max-md:max-w-[400px] sm:mb-5 md:mb-0 max-md:self-center")}
            >
                {title || t("title")}
            </h3>
            <div className="mt-auto">
                <Image src="/brand/pages/home/to-be-gif/faster.png" alt="card1" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
        </div>
    );
});
Card3.displayName = "Card3";

const Card4 = forwardRef<HTMLDivElement, { dir: string; title?: string }>(({ dir, title }, ref) => {
    const t = useTranslations("home.section1.card4");
    return (
        <div ref={ref} className={clsx("md:col-span-1 md:row-span-1 bg-white", "pt-[clamp(1.5rem,2vw,3rem)]", "flex flex-col", "max-md:order-3")} dir={dir}>
            <h3
                className={clsx("text-center font-medium text-black px-4", "md:text-[25.82px] md:leading-[38.8px] text-[19.03px] sm:text-[25px] leading-[26.94px]", "max-md:text-center max-sm:max-w-[250px] max-md:max-w-[400px] sm:mb-5 md:mb-0 max-md:self-center")}
            >
                {title || t("title")}
            </h3>
            <div className="mt-auto">
                <Image src="/brand/pages/home/to-be-gif/payment.png" alt="card1" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
        </div>
    );
});
Card4.displayName = "Card4";

export default Section1;