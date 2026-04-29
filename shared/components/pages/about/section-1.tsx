import clsx from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { IAboutPageContent } from "@/shared/types/pages/about.types";
gsap.registerPlugin(ScrollTrigger);


type Section1Props = {
    founded?: IAboutPageContent["founded"];
};

const Section1 = ({ founded }: Section1Props) => {
    const t = useTranslations("about.section1");
    const scopeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const headingXWidthRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);

    useGSAP(() => {
        if (!scopeRef.current || !headingRef.current || !headingXWidthRefs.current[0] || !headingXWidthRefs.current[1] || !paragraphRef.current) return;

        gsap.set(headingRef.current, { autoAlpha: 0, y: 200 });
        gsap.set(headingXWidthRefs.current[0], { width: 0 });
        gsap.set(headingXWidthRefs.current[1], { width: 0 });
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 200 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 50%",
            },
        });
        tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 1, ease: "back.out(1)" });
        tl.to(headingXWidthRefs.current[0], { width: "100%", duration: 1, ease: "back.out(1)" }, "<");
        tl.to(headingXWidthRefs.current[1], { width: "100%", duration: 1, ease: "back.out(1)" }, "<");
        tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 1, ease: "back.out(1)" }, "<");

        if (paragraphRef.current && spanRefs.current[0] && spanRefs.current[1] && spanRefs.current[2]) {
            const s0 = spanRefs.current[0];
            const s1 = spanRefs.current[1];
            const s2 = spanRefs.current[2];
            const toS0 = gsap.quickTo(s0, "opacity", { duration: 0.25, ease: "power2.out" });
            const toS1 = gsap.quickTo(s1, "opacity", { duration: 0.25, ease: "power2.out" });
            const toS2 = gsap.quickTo(s2, "opacity", { duration: 0.25, ease: "power2.out" });
            const setSpanOpacities = () => {
                const p = paragraphRef.current;
                if (!p || !s0 || !s1 || !s2) return;
                const rect = p.getBoundingClientRect();
                const vh = typeof window !== "undefined" ? window.innerHeight : 0;
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, vh);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const ratio = rect.height > 0 ? Math.min(1, visibleHeight / rect.height) : 0;
                const op1 = 1;
                const op2 = ratio >= 0.4 ? 1 : 0.5;
                const op3 = ratio >= 1 ? 1 : 0.5;
                toS0(op1);
                toS1(op2);
                toS2(op3);
            };
            gsap.set(spanRefs.current[0], { opacity: 1 });
            gsap.set(spanRefs.current[1], { opacity: 0.5 });
            gsap.set(spanRefs.current[2], { opacity: 0.5 });
            ScrollTrigger.create({
                trigger: paragraphRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: false,
                onUpdate: setSpanOpacities,
            });
            setSpanOpacities();
        }
    }, { scope: scopeRef })

    const title0 = founded?.titles?.[0] || t("foundedIn");
    const title1 = founded?.titles?.[1] || t("year");
    const title2 = founded?.titles?.[2] || t("wasel");
    const title3 = founded?.titles?.[3] || t("technologyDriven");
    const title4 = founded?.titles?.[4] || t("logistics");
    const title5 = founded?.titles?.[5] || t("platform");
    const para1 = founded?.descriptions?.[0] || t("para1");
    const para2 = founded?.descriptions?.[1] || t("para2");
    const para3 = founded?.descriptions?.[2] || t("para3");

    return (
        <section ref={scopeRef} className={clsx("py-28")}>
            <div className="container *: space-y-10">
                <div className="text-black dark:text-white *:text-center">
                    <h2 ref={headingRef} className={clsx("font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl xl:leading-14 opacity-0")}>
                        <span className="">{title0}</span>
                        {" "}
                        <span className={clsx("w-fit", "relative")}>
                            <span className="relative z-10 text-white dark:text-black">{title1}</span>
                            <span ref={(el) => { headingXWidthRefs.current[0] = el; }} className={clsx("absolute", "inset-0 w-0 h-full bg-main-secondary z-0")}></span>
                        </span>
                        {" "}
                        <br />
                        <span className={clsx("w-fit", "relative")}>
                            <span className="relative z-10 text-white dark:text-black">{title2}</span>
                            <span ref={(el) => { headingXWidthRefs.current[1] = el; }} className={clsx("absolute", "inset-0 w-0 h-full bg-main-red z-0")}></span>
                        </span>
                        {" "}
                        <span className="font-medium">{title3}</span>
                        {" "}
                        <span>{title4}<br className="max-md:hidden" /> {title5}</span>
                    </h2>
                </div>
                <div className="text-black dark:text-white *:text-center md:max-w-[80%] mx-auto font-medium 2xl:text-3xl lg:text-2xl md:text-xl sm:text-sm text-xs">
                    <p ref={paragraphRef} className="opacity-0">
                        <span ref={(el) => { spanRefs.current[0] = el; }}>{para1}</span>
                        <span ref={(el) => { spanRefs.current[1] = el; }}>{para2}</span>
                        <span ref={(el) => { spanRefs.current[2] = el; }}>{para3}</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Section1;