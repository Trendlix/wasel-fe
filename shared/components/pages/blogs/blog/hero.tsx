"use client";

import { IBlogCardItem } from "@/shared/constants/blogs";
import { Link } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ArrowLeftIcon, Calendar, Clock } from "lucide-react";
import { useRef } from "react";

const tagsColors = [
    { text: "text-white", bg: "bg-main-red" },
    { text: "text-black", bg: "bg-main-secondary" },
    { text: "text-white", bg: "bg-main-ukraineBlue" },
];

const Hero = ({ blog, onLayoutReady }: { blog: IBlogCardItem; onLayoutReady?: () => void }) => {
    const t = useTranslations("blogs");
    const tCards = useTranslations("blogs.cards");
    const tTabs = useTranslations("blogs.banner.tabs");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const color = tagsColors[(blog.id - 1) % tagsColors.length];

    const scopeRef = useRef<HTMLElement>(null);
    const backRef = useRef<HTMLAnchorElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
            onComplete: onLayoutReady,
        });

        tl.from(scopeRef.current, { autoAlpha: 0, duration: 0.5 })
            .from(backRef.current, { y: 20, autoAlpha: 0 }, "-=0.2")
            .from(tagRef.current, { y: 20, autoAlpha: 0 }, "-=0.5")
            .from(contentRef.current?.children ?? [], { y: 40, autoAlpha: 0, stagger: 0.12 }, "-=0.4");
    }, { scope: scopeRef });

    return (
        <section
            ref={scopeRef}
            className={clsx("relative")}
            style={{
                backgroundImage: `url(${blog.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-linear-to-t from-main-codGray via-black/50 to-black/70 w-full h-full absolute inset-0 z-0" />

            <div className={clsx("relative z-10 h-full min-h-[600px] 2xl:max-w-3xl! mx-auto container", "flex items-end", dir === "rtl" ? "justify-end" : "justify-start", "py-14")} dir={dir}>
                <div className="h-full space-y-8">
                    <Link ref={backRef} href="/blogs" className="text-white/70 text-sm leading-[24px] tracking-0 flex items-center gap-2">
                        <span><ArrowLeftIcon size={20} /></span>
                        <span>{t("backToBlogs")}</span>
                    </Link>

                    <div ref={tagRef} className={clsx("rounded-full px-4 py-1.5 w-fit", "uppercase text-xs font-medium tracking-[3px]", color.bg, color.text)}>
                        {tTabs(blog.type)}
                    </div>

                    <div ref={contentRef} className="space-y-4">
                        <h2 className="text-white font-bold 2xl:text-5xl xl:text-4xl text-3xl">
                            {tCards(`${blog.slug}.title`)}
                        </h2>

                        <p className="text-white/70 lg:text-lg text-base leading-[21px] md:leading-[27px] max-w-3xl">
                            {tCards(`${blog.slug}.description`)}
                        </p>

                        <div className="flex items-center gap-6 text-white/70 text-base *:flex *:items-center *:gap-2">
                            <p>
                                <Calendar size={15} />
                                <span>{tCards(`${blog.slug}.date`)}</span>
                            </p>
                            <p>
                                <Clock size={15} />
                                <span>{tCards(`${blog.slug}.readTime`)}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;