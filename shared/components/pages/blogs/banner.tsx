"use client";

import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IBlogsBanner } from "@/shared/types/pages/blogs.types";
import Link from "next/link";

/** Sentinel value for the synthetic "All" tab — means no category filter. */
const ALL_TAB = "";

interface BannerSliderProps {
    isAr?: boolean;
    bannerData: IBlogsBanner[];
}

const BannerSlider = ({ isAr, bannerData }: BannerSliderProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";

    // Default to ALL_TAB so "All" is selected on first render
    const [activeTab, setActiveTab] = useState<string>(ALL_TAB);

    // If the current activeTab is not ALL and is no longer in bannerData, reset to ALL
    const resolvedTab =
        activeTab === ALL_TAB || bannerData.find((i) => i.tag_slug === activeTab)
            ? activeTab
            : ALL_TAB;

    const activeItem = bannerData.find((i) => i.tag_slug === resolvedTab) ?? null;

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            }
        );
    }, [resolvedTab]);

    return (
        <div className={clsx("space-y-10", "xl:p-[70px] lg:p-[50px] md:p-[40px] p-[30px] w-full")} dir={dir}>
            <SliderTabs
                activeTab={resolvedTab}
                setActiveTab={setActiveTab}
                bannerData={bannerData}
            />
            {resolvedTab === ALL_TAB
                ? <AllContent ref={contentRef} />
                : <SliderContent ref={contentRef} activeItem={activeItem} isAr={isAr} />
            }
        </div>
    );
};

interface SliderTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    bannerData: IBlogsBanner[];
}

const SliderTabs = ({ activeTab, setActiveTab, bannerData }: SliderTabsProps) => {
    const locale = useLocale();
    const isAr = locale === "ar";
    const t = useTranslations("blogs.banner.tabs");
    const tabsRef = useRef<HTMLDivElement>(null);

    const baseClass = "font-medium text-sm leading-7 tracking-[1%] rounded-full uppercase";
    const activeClass = "bg-main-ukraineBlue text-white py-1 px-4";
    const inactiveClass = "text-white/70 bg-transparent py-1";

    useEffect(() => {
        if (!tabsRef.current) return;

        gsap.fromTo(
            tabsRef.current.children,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            }
        );
    }, []);

    return (
        <div ref={tabsRef} className={clsx("uppercase flex items-center gap-4 flex-wrap")}>
            {/* Synthetic "All" tab — clears the category filter */}
            <Link
                href="/blogs"
                className={clsx(baseClass, activeTab === ALL_TAB ? activeClass : inactiveClass)}
                onClick={() => setActiveTab(ALL_TAB)}
            >
                {t("all")}
            </Link>

            {bannerData.map((item) => {
                const label = isAr
                    ? (item.tag_ar || item.tag_en)
                    : (item.tag_en || item.tag_ar);

                return (
                    <Link
                        key={item.tag_slug}
                        href={`/blogs?category=${item.tag_slug}`}
                        className={clsx(baseClass, activeTab === item.tag_slug ? activeClass : inactiveClass)}
                        onClick={() => setActiveTab(item.tag_slug)}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
};

/* ── Default "All" content ──────────────────────────────────────────── */
interface AllContentProps {
    ref: React.Ref<HTMLDivElement>;
}

const AllContent = ({ ref }: AllContentProps) => {
    const t = useTranslations("blogs.banner.allContent");
    const locale = useLocale();
    const isAr = locale === "ar";

    return (
        <div ref={ref} className="space-y-4">
            <h2
                className={clsx(
                    "text-white font-bold xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl max-w-5xl",
                    isAr ? "leading-tight" : "xl:leading-14"
                )}
            >
                {t("title")}
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg xl:text-xl leading-normal sm:leading-[27px] max-w-3xl">
                {t("description")}
            </p>
        </div>
    );
};

interface SliderContentProps {
    isAr?: boolean;
    activeItem: IBlogsBanner | null;
    ref: React.Ref<HTMLDivElement>;
}

const SliderContent = ({ isAr, activeItem, ref }: SliderContentProps) => {
    const locale = useLocale();
    const isArLocale = locale === "ar";

    if (!activeItem) return null;

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(isArLocale ? "ar-EG" : "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div ref={ref} className={clsx("space-y-4")}>
            <Link
                href={`/blogs?category=${activeItem.tag_slug}`}
                className="block group"
            >
                <h2
                    className={clsx(
                        "text-white font-bold xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl max-w-5xl",
                        isAr ? "leading-tight" : "xl:leading-14",
                        "group-hover:text-main-secondary transition-colors"
                    )}
                    dangerouslySetInnerHTML={{ __html: activeItem.title }}
                />
            </Link>

            <p
                className="text-white/70 text-sm sm:text-base md:text-lg xl:text-xl leading-normal sm:leading-[27px] max-w-3xl"
                dangerouslySetInnerHTML={{ __html: activeItem.description }}
            />

            <div className="flex items-center gap-6 text-white/70 md:text-base text-xs *:flex *:items-center *:gap-2">
                <p>
                    <Calendar size={15} />
                    <span>{formatDate(activeItem.created_at)}</span>
                </p>

                <p>
                    <Clock size={15} />
                    <span>{activeItem.time_to_read}</span>
                </p>
            </div>
        </div>
    );
};

export default BannerSlider;
