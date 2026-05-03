"use client";

import { IBlogItem } from "@/shared/types/pages/blogs.types";
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

// Format date helper
const formatDate = (dateString: string, locale: string): string => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return dateString;
    }
};

interface HeroProps {
    blog: IBlogItem;
    onLayoutReady?: () => void;
}

const Hero = ({ blog, onLayoutReady }: HeroProps) => {
    const t = useTranslations("blogs");
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";

    // Use index based on id for consistent coloring
    const colorIndex = blog.id ? parseInt(blog.id, 36) % tagsColors.length : 0;
    const color = tagsColors[colorIndex];

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
                backgroundImage: `url(${blog.cover_img || "/brand/pages/blogs/hero/blogs-banner.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-linear-to-t from-main-codGray via-black/50 to-black/70 w-full h-full absolute inset-0 z-0" />

            <div className={clsx(
                "relative z-10 h-full min-h-[600px] 2xl:max-w-3xl! mx-auto container",
                "flex items-end",
                // dir === "rtl" ? "justify-end" : "justify-start",
                "py-14"
            )} dir={dir}>
                <div className="h-full space-y-8">
                    <Link
                        ref={backRef}
                        href="/blogs"
                        className="text-white/70 text-sm leading-[24px] tracking-0 flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <span><ArrowLeftIcon size={20} className={clsx(isAr && "rotate-180")} /></span>
                        <span>{t("backToBlogs")}</span>
                    </Link>

                    <div
                        ref={tagRef}
                        className={clsx(
                            "rounded-full px-4 py-1.5 w-fit",
                            "uppercase text-xs font-medium tracking-[3px]",
                            color.bg,
                            color.text
                        )}
                    >
                        {blog.category}
                    </div>

                    <div ref={contentRef} className="space-y-4">
                        <h2
                            className="text-white font-bold 2xl:text-5xl xl:text-4xl text-3xl"
                            dangerouslySetInnerHTML={{ __html: blog.title }}
                        />

                        <div className="flex items-center gap-6 text-white/70 text-base *:flex *:items-center *:gap-2">
                            <p>
                                <Calendar size={15} />
                                <span>{formatDate(blog.created_at, locale)}</span>
                            </p>
                            <p>
                                <Clock size={15} />
                                <span>{blog.time_to_read}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
