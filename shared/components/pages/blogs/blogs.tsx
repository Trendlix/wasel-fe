"use client";

import { BlogCard, TAGS_COLORS } from "./blog-card";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { IBlogItem } from "@/shared/types/pages/blogs.types";
import type { IPaginationMeta } from "@/shared/types/common/pagination.types";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface BlogsProps {
    blogs: IBlogItem[];
    meta: IPaginationMeta | null;
}

const Blogs = ({ blogs, meta }: BlogsProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gridRef.current?.children;
        if (!cards) return;

        gsap.from(cards, {
            y: 60,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: {
                each: 0.12,
                from: "start",
                grid: "auto",
            },
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
            },
        });
    }, { scope: gridRef });

    return (
        <div className={clsx("container", "pb-28 pt-10")} dir={dir}>
            <div ref={gridRef} className={clsx("grid md:grid-cols-2 grid-cols-1 gap-4")}>
                {blogs.map((item, index) => (
                    <BlogCard
                        key={item.id}
                        item={item}
                        colorIndex={index % TAGS_COLORS.length}
                    />
                ))}
            </div>
            {meta && meta.total_pages > 1 && (
                <Pagination meta={meta} isAr={isAr} />
            )}
        </div>
    );
};

interface PaginationProps {
    meta: IPaginationMeta;
    isAr?: boolean;
}

const Pagination = ({ meta, isAr }: PaginationProps) => {
    const currentPage = meta.current_page;
    const totalPages = meta.total_pages;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const buildPageUrl = (page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", String(page));
        return `?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            {meta.has_previous_page && (
                <Link
                    href={buildPageUrl(currentPage - 1)}
                    className="px-4 py-2 rounded-lg border border-main-carbonFiber hover:bg-main-carbonFiber/10 transition-colors"
                >
                    {isAr ? "السابق" : "Previous"}
                </Link>
            )}

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={buildPageUrl(page as number)}
                            className={clsx(
                                "px-4 py-2 rounded-lg transition-colors",
                                currentPage === page
                                    ? "bg-main-ukraineBlue text-white"
                                    : "border border-main-carbonFiber hover:bg-main-carbonFiber/10"
                            )}
                        >
                            {page}
                        </Link>
                    )
                ))}
            </div>

            {meta.has_next_page && (
                <Link
                    href={buildPageUrl(currentPage + 1)}
                    className="px-4 py-2 rounded-lg border border-main-carbonFiber hover:bg-main-carbonFiber/10 transition-colors"
                >
                    {isAr ? "التالي" : "Next"}
                </Link>
            )}
        </div>
    );
};

export default Blogs;
