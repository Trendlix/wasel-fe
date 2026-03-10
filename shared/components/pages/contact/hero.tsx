"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";

import ContactForm from "./contact-form";

type HeroProps = { onLayoutReady?: () => void };

const Hero = ({ onLayoutReady }: HeroProps) => {
    const t = useTranslations("contact.hero");
    const scopeRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    useGSAP(() => {
        if (!headingRef.current || !paragraphRef.current || !formRef.current) return;

        gsap.set(headingRef.current, { autoAlpha: 0, y: 80 });
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 80 });
        gsap.set(formRef.current, { autoAlpha: 0, y: 80 });

        const tl = gsap.timeline({
            onComplete: () => onLayoutReady?.(),
        });
        tl.to(headingRef.current, { y: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.7)" })
            .to(paragraphRef.current, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "<0.2")
            .to(formRef.current, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "<0.3");
    }, { scope: scopeRef });

    return (
        <section ref={scopeRef} dir={dir} className="pb-28">
            <div className="container mt-36 space-y-8">
                <div className={clsx("flex flex-col gap-1")}>
                    <h1 ref={headingRef} className={clsx("font-medium 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl opacity-0 dark:text-white text-black")}>
                        {t("title")}
                    </h1>
                    <p ref={paragraphRef} className={clsx("text-sm sm:text-base md:text-lg xl:text-xl leading-normal sm:leading-[27px] tracking-0 max-w-2xl opacity-0 dark:text-white text-black")}>
                        {t("subtitle")}
                    </p>
                </div>
                <div ref={formRef} className="opacity-0">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default Hero;