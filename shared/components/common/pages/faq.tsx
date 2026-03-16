"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type FAQProps = { heroLayoutReady?: boolean, className?: string };

const FAQ = ({ heroLayoutReady = false, className }: FAQProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const t = useTranslations("faq");
    const tItems = useTranslations("faq.items");
    const count = 7;
    const scopeRef = useRef<HTMLElement>(null);
    const elementsRefs = useRef<Array<HTMLDivElement | null>>([]);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !elementsRefs.current[0] || !elementsRefs.current[1]) return;

        const isMdOrUp = window.matchMedia("(min-width: 768px)").matches;
        if (!isMdOrUp) {
            gsap.set(elementsRefs.current, { autoAlpha: 1, y: 0 });
            return;
        }

        gsap.set(elementsRefs.current, { autoAlpha: 0.2, y: 150 });

        [0, 1].forEach((i) => {
            const el = elementsRefs.current[i];
            if (!el) return;

            const opacityTl = gsap.timeline({
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 60%", scrub: true },
            });
            opacityTl.to(el, { autoAlpha: 1, ease: "none" });

            ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                onEnter: () => gsap.to(el, { y: 0, duration: 0.9, ease: "back.out(1.1)", overwrite: "auto" }),
                onEnterBack: () => gsap.to(el, { y: 0, duration: 0.9, ease: "back.out(1.1)", overwrite: "auto" }),
            });
        });

        const leaveTl = gsap.timeline({
            scrollTrigger: { trigger: scopeRef.current, start: "30% top", end: "70% top", scrub: true },
        });
        leaveTl.to(elementsRefs.current, { autoAlpha: 0.2, ease: "none" });
    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <section ref={scopeRef} className={clsx("text-black dark:text-white", className)} dir={dir}>
            <div className="container flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16">
                <div ref={(el) => { elementsRefs.current[0] = el; }} className="w-full lg:max-w-md xl:max-w-lg shrink-0">
                    <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] leading-tight xl:leading-[56px] text-black dark:text-white">
                        {t("heading")}
                    </h3>
                    <p className="mt-3 font-normal text-[15px] sm:text-base md:text-[17px] leading-6 dark:text-main-matteLightGray text-main-black">
                        {t("description")}
                    </p>
                </div>
                <div ref={(el) => { elementsRefs.current[1] = el; }} className="w-full flex-1 min-w-0 [&_[data-slot=accordion-trigger]]:text-black [&_[data-slot=accordion-trigger]]:dark:text-white [&_[data-slot=accordion-content]]:text-black [&_[data-slot=accordion-content]]:dark:text-white [&_.text-muted-foreground]:text-black [&_.text-muted-foreground]:dark:text-white">
                    <Accordion type="single" collapsible>
                        {Array.from({ length: count }, (_, i) => (
                            <AccordionItem className="border-b last:border-b-0 border-main-grayHint" key={i} value={`item-${i}`}>
                                <AccordionTrigger>{tItems(`${i}.q`)}</AccordionTrigger>
                                <AccordionContent>{tItems(`${i}.a`)}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;