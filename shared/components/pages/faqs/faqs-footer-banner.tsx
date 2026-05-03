"use client";

import useContactEmailsStore from "@/shared/hooks/store/useContactEmailsStore";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

const GENERAL_SUPPORT_FALLBACK = "legal@flanefleet.com";

gsap.registerPlugin(ScrollTrigger);

const FaqsFooterBanner = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("faqs.footer");
    const supportEmail =
        useContactEmailsStore((s) => s.emails.general_support)?.trim() || GENERAL_SUPPORT_FALLBACK;

    useGSAP(() => {
        if (!sectionRef.current || !titleRef.current || !subtitleRef.current || !buttonsRef.current) return;

        const buttons = buttonsRef.current.querySelectorAll<HTMLElement>(":scope > *");

        gsap.set(titleRef.current, { autoAlpha: 0, y: 50 });
        gsap.set(subtitleRef.current, { autoAlpha: 0, y: 40 });
        gsap.set(buttons, { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
            },
        });

        tl.to(titleRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
        })
            .to(
                subtitleRef.current,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "<0.15"
            )
            .to(
                buttons,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "back.out(1.4)",
                    stagger: 0.1,
                },
                "<0.1"
            );
    }, { scope: sectionRef });

    const outlineLink = clsx(
        "px-7 py-3.5 rounded-full font-semibold text-sm",
        "border transition-all duration-200",
        "border-gray-300 text-black bg-transparent",
        "hover:bg-gray-200",
        "dark:border-[#3a3a3a] dark:text-white dark:hover:border-[#555] dark:hover:bg-white/5"
    );

    return (
        <section
            ref={sectionRef}
            className={clsx(
                "container rounded-2xl",
                "flex flex-col items-center justify-center text-center",
                "py-16 px-6 gap-y-4 my-16",
            )}
        >
            <h2
                ref={titleRef}
                className="font-bold text-3xl md:text-4xl leading-tight opacity-0 text-black dark:text-white"
            >
                {t("title")}
            </h2>

            <p
                ref={subtitleRef}
                className="text-sm md:text-base max-w-md opacity-0 text-gray-600 dark:text-[#9a9a9a]"
            >
                {t("subtitle")}
            </p>

            <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {/* Email — opens mail client */}
                <a
                    href={`mailto:${supportEmail}`}
                    className={clsx(
                        "px-7 py-3.5 rounded-full font-bold text-sm",
                        "bg-main-secondary text-black",
                        "hover:brightness-110 transition-all duration-200"
                    )}
                >
                    {t("emailSupport")}
                </a>

                {/* Internal navigation links */}
                <Link href="/policy" className={outlineLink}>
                    {t("privacyPolicy")}
                </Link>

                <Link href="/terms" className={outlineLink}>
                    {t("terms")}
                </Link>
            </div>
        </section>
    );
};

export default FaqsFooterBanner;