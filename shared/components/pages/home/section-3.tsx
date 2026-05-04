"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";
import { IHomePageResponse } from "@/shared/types/pages/home.types";
gsap.registerPlugin(ScrollTrigger);

type Section3Props = {
    heroLayoutReady?: boolean;
    maximizingContent?: NonNullable<IHomePageResponse["content"]>["maximizing"] | null;
};

const CARD_TITLE_CLASS = "font-medium md:text-[25.82px] md:leading-[38.8px] text-[19.03px] sm:text-[25px] leading-[26.94px]";
const CARD_PARAGRAPH_CLASS = "xl:text-base text-sm";
const CARD_CONTENT_GAP_CLASS = "flex flex-col gap-4 md:gap-6 xl:gap-8";

const Section3 = ({ heroLayoutReady = false, maximizingContent = null }: Section3Props) => {
    const t = useTranslations("home.section3");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const scopeRef = useRef<HTMLDivElement>(null);
    const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);
    const headingBlockRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !cardsRefs.current[0] || !cardsRefs.current[1] || !cardsRefs.current[2] || !headingBlockRef.current) return;
        const isMdOrUp = window.innerWidth >= 768;

        // initial setup
        gsap.set(headingBlockRef.current, {
            y: 200,
            autoAlpha: 0
        })
        gsap.set(cardsRefs.current[0], {
            x: -100
        })

        const ctl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 80%",
                // markers:true
            }
        })

        ctl.to(cardsRefs.current[0], {
            x: 0,
            duration: 1,
            ease: "back.out(1)"
        }).to(headingBlockRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "back.out(1)"
        }, "<+=0.2")

        // card 2 animations
        gsap.set(cardsRefs.current[1], {
            y: 120,
            autoAlpha: isMdOrUp ? 0.2 : 1,
        });
        gsap.set(cardsRefs.current[2], {
            y: 180,
        });
        if (isMdOrUp) {
            // Keep opacity tied to scroll progress.
            const c2OpacityTl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardsRefs.current[1],
                    start: "top bottom",
                    end: "top 60%",
                    scrub: true,
                }
            });
            c2OpacityTl.to(cardsRefs.current[1], {
                autoAlpha: 1,
                ease: "none",
            });
            // On leave, fade card 1 and card 2 back from 1 to 0.2.
            const c2LeaveTl = gsap.timeline({
                scrollTrigger: {
                    trigger: scopeRef.current,
                    start: "30% top",
                    end: "70% top",
                    scrub: true,
                }
            });
            c2LeaveTl.to([cardsRefs.current[0], cardsRefs.current[1]], {
                autoAlpha: 0.2,
                ease: "none",
            });
        } else {
            gsap.set([cardsRefs.current[0], cardsRefs.current[1]], { autoAlpha: 1 });
        }
        // Move up as a regular tween when card 2 is hit (not scrubbed).
        ScrollTrigger.create({
            trigger: cardsRefs.current[1],
            start: "top bottom",
            onEnter: () => {
                gsap.to(cardsRefs.current[1], {
                    y: 0,
                    duration: 0.9,
                    ease: "back.out(1.1)",
                    overwrite: "auto",
                });
            },
            onEnterBack: () => {
                gsap.to(cardsRefs.current[1], {
                    y: 0,
                    duration: 0.9,
                    ease: "back.out(1.1)",
                    overwrite: "auto",
                });
            },
        });

        // card 3 (bg-main-red): non-scrub trigger animation
        ScrollTrigger.create({
            trigger: cardsRefs.current[2],
            start: "top bottom",
            onEnter: () => {
                gsap.to(cardsRefs.current[2], {
                    y: 0,
                    duration: 0.9,
                    ease: "back.out(1.2)",
                    overwrite: "auto",
                });
            },
            onEnterBack: () => {
                gsap.to(cardsRefs.current[2], {
                    y: 0,
                    duration: 0.9,
                    ease: "back.out(1.2)",
                    overwrite: "auto",
                });
            },
        });

    }, { scope: scopeRef, dependencies: [heroLayoutReady] })

    return (
        <section className="min-h-screen py-32 bg-black flex flex-col gap-" >
            <div className="md:sm-container container xl:space-y-28 lg:space-y-24 md:space-y-20 space-y-10" ref={scopeRef}>
                <div className="text-white space-y-4 text-center" ref={headingBlockRef}>
                    <h2
                        className={clsx("text-white font-bold text-center", "xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl")}                     >
                        {maximizingContent?.title || t("heading")}
                    </h2>
                    <p className="xl:text-base md:text-sm text-xs">
                        {maximizingContent?.description || t("subtitle")}
                    </p>
                </div>
                <div className="flex gap-4 max-md:flex-col">
                    <div className="lg:w-[60%] md:w-[50%] w-full space-y-4 flex flex-col items-end *:h-fit">
                        <Card1
                            ref={(el) => { cardsRefs.current[0] = el; }}
                            dir={dir}
                            title={maximizingContent?.cards?.card_1?.title}
                            description={maximizingContent?.cards?.card_1?.description}
                        />
                        <Card3
                            ref={(el) => { cardsRefs.current[2] = el; }}
                            dir={dir}
                            title={maximizingContent?.cards?.card_3?.title}
                            description={maximizingContent?.cards?.card_3?.description}
                        />
                    </div>
                    <div className="lg:w-[40%] md:w-[50%] w-full 2xl:mt-62 xl:mt-48 lg:mt-36 md:mt-24 *:h-fit">
                        <Card2
                            ref={(el) => { cardsRefs.current[1] = el; }}
                            dir={dir}
                            title={maximizingContent?.cards?.card_2?.title}
                            description={maximizingContent?.cards?.card_2?.description}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Card1 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    dir: string;
    title?: string;
    description?: string;
}>(({ dir, title, description, ...props }, ref) => {
    const t = useTranslations("home.section3.card1");
    return (
        <div ref={ref} {...props} className="relative h-fit text-white">
            <div className={clsx("xl:pl-12 pl-6", "bg-main-ukraineBlue", "rounded-4xl", "overflow-hidden", CARD_CONTENT_GAP_CLASS)}>
                <div className="xl:pr-12 lg:pr-8 md:pr-6 pr-4 xl:py-10 md:py-10 py-4 space-y-3" dir={dir}>
                    <h3 className={CARD_TITLE_CLASS}>{title || t("title")}</h3>
                    <p className={CARD_PARAGRAPH_CLASS}>{description || t("description")}</p>
                </div>
                <Image src="/brand/pages/home/section3/manage.png" alt="truck" width={3072} height={1260} className="w-full h-auto mt-auto" />
            </div>
            <div className={clsx("absolute flex items-end justify-start max-md:hidden", dir === "rtl" ? "right-[-12%] -bottom-[20%] " : "-left-[15%] -bottom-[25%] ")} id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className={clsx("max-w-[15%] max-h-[15%]", dir === "rtl" ? "scale-x-[-1]" : "scale-x-[1]")} />
            </div>
        </div>
    );
});
Card1.displayName = "Card1";

const Card2 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    dir: string;
    title?: string;
    description?: string;
}>(({ dir, title, description, ...props }, ref) => {
    const t = useTranslations("home.section3.card2");
    return (
        <div ref={ref} {...props} className="relative h-fit text-black">
            <div className={clsx("xl:pr-12 pr-6", "bg-main-secondary", "rounded-4xl", "overflow-hidden", CARD_CONTENT_GAP_CLASS)}>
                <div className="xl:pl-12 pl-6 xl:py-10 py-4 space-y-3" dir={dir}>
                    <h3 className={CARD_TITLE_CLASS}>{title || t("title")}</h3>
                    <p className={clsx(CARD_PARAGRAPH_CLASS, "whitespace-pre-line")}>{description || t("description")}</p>
                </div>
                <Image src="/brand/pages/home/section3/instant.png" alt="truck" width={3072} height={1260} className="w-full h-auto mt-auto" />
            </div>
            <div className={clsx("absolute flex items-end justify-end max-md:hidden", dir === "rtl" ? "-left-[13%] -top-[15%] " : "-right-[13%] -top-[15%] ")} id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className={clsx("max-w-[15%] max-h-[15%]", dir === "rtl" ? "scale-x-[1] rotate-90" : "scale-x-[1] rotate-180")} />
            </div>
        </div>
    );
});
Card2.displayName = "Card2";

const Card3 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    dir: string;
    title?: string;
    description?: string;
}>(({ dir, title, description, ...props }, ref) => {
    const t = useTranslations("home.section3.card3");
    return (
        <div ref={ref} {...props} className="relative h-fit text-white  2xl:max-w-[70%] xl:w-[80%] lg:w-[90%] w-full">
            <div className={clsx("xl:pl-12 pl-6", "bg-main-red", "rounded-4xl", "overflow-hidden", CARD_CONTENT_GAP_CLASS)}>
                <div className="xl:pr-12 pr-6 xl:py-10 py-4 space-y-3" dir={dir}>
                    <h3 className={CARD_TITLE_CLASS}>{title || t("title")}</h3>
                    <p className={CARD_PARAGRAPH_CLASS}>{description || t("description")}</p>
                </div>
                <div className="w-full flex items-end justify-end">
                    <Image src="/brand/pages/home/section3/easy.png" alt="truck" width={3072} height={1260} className="w-[80%] max-w-[380px] max-h-[306px] mt-auto" />
                </div>
            </div>
            <div className={clsx("absolute flex items-end justify-start max-md:hidden", dir === "rtl" ? "right-[-15%] -bottom-[18%] " : "-left-[15%] -bottom-[20%] ")} id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className={clsx("max-w-[18%] max-h-[18%]", dir === "rtl" ? "scale-x-[-1]" : "scale-x-[1]")} />
            </div>
        </div>
    );
});
Card3.displayName = "Card3";

export default Section3;