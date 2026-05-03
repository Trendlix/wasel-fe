"use client";

import { IBlogItem } from "@/shared/types/pages/blogs.types";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const TAGS_COLORS = [
    { text: "text-white", bg: "bg-main-red" },
    { text: "text-black", bg: "bg-main-secondary" },
    { text: "text-white", bg: "bg-main-ukraineBlue" },
] as const;

type BlogCardProps = {
    item: IBlogItem;
    colorIndex: number;
};

// Helper to strip HTML tags for preview
const stripHtml = (html: string): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

// Helper to truncate text
const truncate = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
};

// Format date
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

const BlogCard = ({ item, colorIndex }: BlogCardProps) => {
    const locale = useLocale();
    const isAr = locale === "ar";
    const color = TAGS_COLORS[colorIndex];
    const pCircleRef = useRef<HTMLDivElement>(null);

    // Get clean preview text from description (strip HTML and truncate)
    const previewText = truncate(stripHtml(item.description), 120);

    return (
        <Link
            href={`/blogs/${item.slug}`}
            className={clsx(
                "rounded-[20px] overflow-hidden",
                "border dark:border-main-carbonFiber border-main-techWhite",
                "flex flex-col",
                "dark:bg-[#0d0d0d] bg-white",
                "group cursor-pointer"
            )}
            onMouseEnter={() => {
                if (pCircleRef.current) {
                    gsap.to(pCircleRef.current, {
                        scale: 1.1,
                        padding: 100,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                }
            }}
            onMouseLeave={() => {
                if (pCircleRef.current) {
                    gsap.to(pCircleRef.current, {
                        scale: 1,
                        padding: 0,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                }
            }}
        >
            <div className="relative aspect-video w-full shrink-0">
                <Image
                    src={item.cover_img || "/brand/pages/blogs/hero/blogs-banner.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
                <div className={clsx(
                    "absolute top-4 left-4 rtl:left-auto rtl:right-4",
                    "rounded-full px-4 py-1.5",
                    "uppercase text-xs font-medium tracking-wider",
                    color.bg,
                    color.text
                )}>
                    {item.category}
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4 mt-auto">
                <h3
                    className="dark:text-white text-black font-bold md:text-2xl text-xl leading-[30px] tracking-0"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                />

                <p className="dark:text-white/70 text-black/70 font-normal text-base leading-[22px] tracking-0">
                    {previewText}
                </p>

                <div className="flex items-center justify-between dark:text-white/50 text-black/50 font-normal text-sm leading-[21px] tracking-0">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {formatDate(item.published_at || item.created_at, locale)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {item.time_to_read}
                        </span>
                    </div>
                    <ArrowRight size={16} className={clsx("text-main-secondary", isAr && "rotate-180")} />
                </div>
            </div>
            <div ref={pCircleRef} className={clsx(
                "p-0 rounded-full dark:bg-main-carbonFiber bg-main-techWhite absolute -bottom-20 z-[-1]",
                isAr ? "-left-20" : "-right-20"
            )} />
        </Link>
    );
};

export { BlogCard, TAGS_COLORS };
