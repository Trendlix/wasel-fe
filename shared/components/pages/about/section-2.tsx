import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Section3 from "./section-3";
gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const t = useTranslations("about.section2");
    const sectionRef = useRef<HTMLElement>(null);
    const scopeRef = useRef<HTMLDivElement>(null);
    const headingXWidthRef = useRef<HTMLSpanElement>(null);
    const arrow2Ref = useRef<HTMLImageElement>(null);

    const cardsScopeRef = useRef<HTMLDivElement | null>(null);
    const card1Ref = useRef<HTMLDivElement | null>(null);
    const card2Ref = useRef<HTMLDivElement | null>(null);
    const card3Ref = useRef<HTMLDivElement | null>(null);
    const bar1Ref = useRef<HTMLDivElement | null>(null);
    const bar2Ref = useRef<HTMLDivElement | null>(null);
    const bar3Ref = useRef<HTMLDivElement | null>(null);


    useGSAP(() => {
        if (!scopeRef.current || !headingXWidthRef.current || !arrow2Ref.current) return;

        gsap.set(headingXWidthRef.current, { width: 0 });
        gsap.set(arrow2Ref.current, { y: -100 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 70%",
            },
        });

        tl.to(headingXWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<");
        tl.to(arrow2Ref.current, { y: 0, duration: 1, ease: "back.out(1)" }, "<");

        if (!cardsScopeRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current || !sectionRef.current) return;
        if (!bar1Ref.current || !bar2Ref.current || !bar3Ref.current) return;

        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { opacity: 0, y: 200 });
        gsap.set([bar1Ref.current, bar2Ref.current, bar3Ref.current], { width: 0 });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
        });

        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
            },
        });
        // Cards move into place
        cardTl.to(card1Ref.current, { y: 0, opacity: 1, duration: 0.33, ease: "back.out(1.2)" }, 0);
        cardTl.to(card2Ref.current, { y: 0, opacity: 1, duration: 0.33, ease: "back.out(1.2)" }, 0.33);
        cardTl.to(card3Ref.current, { y: 0, opacity: 1, duration: 0.34, ease: "back.out(1.2)" }, 0.66);
        // Bars scrub in sync with their card
        cardTl.to(bar1Ref.current, { width: "125%", duration: 0.33, ease: "none" }, 0);
        cardTl.to(bar2Ref.current, { width: "125%", duration: 0.33, ease: "none" }, 0.33);
        cardTl.to(bar3Ref.current, { width: "125%", duration: 0.34, ease: "none" }, 0.66);
    }, { scope: sectionRef })


    return (
        <section ref={sectionRef} className="relative min-h-screen">
            <div ref={scopeRef} className="relative z-0 py-28 flex flex-col items-center justify-center min-h-screen" id="about-section2">
                <div className="container space-y-4">
                    <h3 className={clsx("text-black dark:text-white font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl text-center")}>
                        <span>{t("whatWe")}</span>
                        {" "}
                        <span className={clsx("w-fit", "relative")}>
                            <span className="relative z-10 text-white dark:text-black">{t("stand")}</span>
                            <span ref={headingXWidthRef} className={clsx("absolute", "inset-0 w-full h-full bg-main-ukraineBlue z-0")}></span>
                        </span>
                        {t("for") ? <>{" "}<span>{t("for")}</span></> : null}
                    </h3>
                    {/* arrows */}
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/brand/pages/about/section2/link.png" alt={t("arrowAlt")} width={73} height={73} />
                        <Image src="/brand/pages/about/section2/link.png" alt={t("arrowAlt")} width={73} height={73} ref={arrow2Ref} />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div ref={cardsScopeRef} className="h-full w-full pointer-events-auto">
                    <Section3 card1Ref={card1Ref} card2Ref={card2Ref} card3Ref={card3Ref} bar1Ref={bar1Ref} bar2Ref={bar2Ref} bar3Ref={bar3Ref} />
                </div>
            </div>
        </section>
    )
}

export default Section2;