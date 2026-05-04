"use client";
import { RichTextHtml } from "@/shared/components/common/rich-text-html";
import { IFaqItem } from "@/shared/constants/faq";
import useFaqsStore, { faqUiLang } from "@/shared/hooks/store/pages/faqs/usefaqsStore";
import { formatLegalClauseRef } from "@/shared/lib/ui-locale";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const FaqItem = ({
    item,
    isOpen,
    onToggle,
    clauseRef,
    isRtl,
}: {
    item: IFaqItem;
    isOpen: boolean;
    onToggle: () => void;
    clauseRef: string;
    isRtl: boolean;
}) => {
    const answerRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    const dividerOrigin = isRtl ? "right center" : "left center";

    useEffect(() => {
        if (!answerRef.current) return;

        if (isFirstRender.current) {
            gsap.set(answerRef.current, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
            isFirstRender.current = false;
            return;
        }

        if (isOpen) {
            gsap.set(answerRef.current, { height: "auto", opacity: 1 });
            gsap.from(answerRef.current, {
                height: 0, opacity: 0, duration: 0.4, ease: "power2.out",
            });
            if (dividerRef.current) {
                gsap.fromTo(
                    dividerRef.current,
                    { scaleX: 0, transformOrigin: dividerOrigin },
                    { scaleX: 1, duration: 0.35, ease: "power2.out", delay: 0.15 },
                );
            }
        } else {
            gsap.to(answerRef.current, {
                height: 0, opacity: 0, duration: 0.35, ease: "power2.in",
            });
        }
    }, [isOpen, dividerOrigin]);

    return (
        <div
            className={clsx(
                "rounded-2xl overflow-hidden border transition-colors duration-200",
                isOpen
                    ? "border-gray-300 bg-gray-100 dark:border-[#50505061] dark:bg-main-blackOut/70"
                    : "border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-main-blackOut"
            )}
        >
            <button
                type="button"
                onClick={onToggle}
                className={clsx(
                    "flex w-full items-center justify-between gap-4 px-6 py-5 text-start",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-main-secondary/60",
                )}
            >
                <span className="flex min-w-0 flex-1 items-baseline gap-2 pe-2">
                    <span
                        dir="ltr"
                        translate="no"
                        className="shrink-0 tabular-nums text-xs font-semibold text-foreground/50 sm:text-sm"
                    >
                        {clauseRef}
                    </span>
                    <RichTextHtml
                        as="span"
                        html={item.q}
                        className={clsx(
                            "min-w-0 flex-1 text-start font-sans text-sm font-semibold leading-5 tracking-tight transition-colors duration-200 sm:text-base sm:leading-snug",
                            isOpen ? "text-foreground" : "text-foreground/70",
                        )}
                    />
                </span>

                <span
                    className={clsx(
                        "size-8 shrink-0 flex items-center justify-center text-xl font-light leading-none transition-colors duration-200 rounded-full",
                        isOpen
                            ? "bg-main-secondary text-black"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-main-lightBlack dark:text-[#aaaaaa] dark:hover:bg-[#3a3a3a]"
                    )}
                    aria-hidden
                >
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            <div ref={answerRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div
                    ref={dividerRef}
                    className="mx-6 mb-3 w-8 h-[3px] rounded-full bg-main-secondary"
                />
                <div className="px-6 pb-6 font-sans text-sm leading-5 text-foreground/60 dark:text-[#9a9a9a]">
                    <RichTextHtml html={item.aHtml?.trim() ? item.aHtml : item.a} />
                </div>
            </div>
        </div>
    );
};

const FaqContent = () => {
    const { category, categories } = useFaqsStore();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const listRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const isFirstRender = useRef(true);
    const locale = useLocale();
    const isAr = faqUiLang(locale) === "ar";

    useGSAP(() => {
        if (!listRef.current || !titleRef.current) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const items = listRef.current.querySelectorAll<HTMLElement>(":scope > *");

        gsap.set(titleRef.current, { autoAlpha: 0, y: 30 });
        gsap.set(items, { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline();

        tl.to(titleRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
        }).to(
            items,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.07,
            },
            "<0.1"
        );
    }, { dependencies: [category] });

    const handleToggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const sectionNum =
        Math.max(
            1,
            categories.findIndex((c) => c.categoryKey === category.categoryKey) + 1,
        );

    return (
        <div className="min-w-0">
            <h1
                ref={titleRef}
                className={clsx(
                    "relative mb-6 w-fit font-sans font-bold text-xl leading-7 tracking-[0px]",
                    "text-foreground",
                    "before:absolute before:top-0 before:h-full before:w-1 before:rounded-full before:bg-main-secondary before:content-['']",
                    isAr ? "before:right-[-15px]" : "before:left-[-15px]"
                )}
            >
                <RichTextHtml
                    as="span"
                    html={category.category}
                    className="font-sans font-bold text-xl leading-7 text-foreground [&_p]:mb-0 [&_p]:inline"
                />
            </h1>

            <div ref={listRef} className="flex flex-col gap-3">
                {category.items.map((item, index) => (
                    <FaqItem
                        key={`${category.categoryKey}-${index}`}
                        item={item}
                        isOpen={openIndex === index}
                        clauseRef={formatLegalClauseRef(sectionNum, index + 1, locale)}
                        isRtl={isAr}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqContent;