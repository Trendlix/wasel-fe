"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import DynamicIsland from "./components/hero/dynamic-island";
import SentencesCards from "./components/hero/SentencesCards";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const backOut = (t: number, amplitude = 1.7): number => {
    const c1 = amplitude;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type HeroProps = {
    onLayoutReady?: (ready: boolean) => void;
    onMountStart?: () => void;
};

const Hero = ({ onLayoutReady, onMountStart }: HeroProps) => {
    const tWords = useTranslations("home.hero.words");
    const tPhone = useTranslations("home.hero.phoneContent");
    const containerRef = useRef<HTMLDivElement>(null);
    const iphoneRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const dynamicIslandRef = useRef<HTMLDivElement>(null);
    const subtitleBlockRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const phoneContentWrapperRef = useRef<HTMLDivElement>(null);
    const sentencesRef = useRef<HTMLDivElement[]>([]);
    const currentImageRef = useRef<string>("/brand/pages/home/iphone.png");
    const [imageSrc, setImageSrc] = useState("/brand/pages/home/iphone.png");
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);

    useEffect(() => {
        const firstSrc = "/brand/pages/home/iphone.png";
        const img = new window.Image();
        img.src = firstSrc;
        const onLoad = () => {
            setFirstImageLoaded(true);
            onMountStart?.();
        };
        if (img.complete) {
            queueMicrotask(onLoad);
        } else {
            img.onload = onLoad;
        }
    }, [onMountStart]);

    // ── Mount animation for iPhone (waits for first image) ──
    useGSAP(() => {
        if (!firstImageLoaded) return;
        if (!iphoneRef.current || !dynamicIslandRef.current || !blurRef.current) return;

        const iphoneMountTl = gsap.timeline();
        iphoneMountTl.fromTo(
            iphoneRef.current,
            { bottom: "-130%", scale: 1.9 },
            { bottom: "-90%", scale: 1.9, duration: 2, ease: "back.out(1.7)" },
        );
        iphoneMountTl.fromTo(
            blurRef.current,
            { top: "50%", rotate: 0 },
            { top: "0%", rotate: 20, duration: 2, ease: "back.out(1.7)", opacity: 1, width: "80%", height: "120%" },
            "<",
        );

        const islandCamera = dynamicIslandRef.current.querySelector("#dynamic-island-camera") as HTMLDivElement | null;
        const islandContent = dynamicIslandRef.current.querySelector("#dynamic-island-content") as HTMLDivElement | null;
        const islandRoot = dynamicIslandRef.current.querySelector("#dynamic-island-root") as HTMLDivElement | null;

        const openPadX = window.innerWidth * 0.01;
        const openCameraPx = 40;
        const openCameraPt = window.innerWidth * 0.007;
        const heroImageSources = [
            "/brand/pages/home/iphone.png",
            "/brand/pages/home/iphone-location.png",
            "/brand/pages/home/iphone-truck.png",
            "/brand/pages/home/iphone-select-price.png",
            "/brand/pages/home/iphone-select-driver.png",
            "/brand/pages/home/iphone-confirmed.png",
        ];
        let imgTimeline: gsap.core.Timeline | null = null;
        let pendingImageSrc: string | null = null;
        let lastSwapRequestedAt = 0;
        const loadedImageSrcs = new Set<string>();

        heroImageSources.forEach((src) => {
            const img = new window.Image();
            img.decoding = "async";
            img.src = src;
            if (img.complete) loadedImageSrcs.add(src);
            img.onload = () => loadedImageSrcs.add(src);
        });

        const swapImage = (newSrc: string) => {
            if (currentImageRef.current === newSrc || pendingImageSrc === newSrc) return;
            pendingImageSrc = newSrc;
            const now = Date.now();
            const rapidSwap = now - lastSwapRequestedAt < 220;
            lastSwapRequestedAt = now;

            const runSwap = () => {
                if (pendingImageSrc !== newSrc) return;
                imgTimeline?.kill();

                if (rapidSwap) {
                    if (iphoneRef.current) iphoneRef.current.style.opacity = "1";
                    currentImageRef.current = newSrc;
                    setImageSrc(newSrc);
                    pendingImageSrc = null;
                    return;
                }

                const state = { opacity: 1 };
                imgTimeline = gsap.timeline({
                    onComplete: () => {
                        if (pendingImageSrc === newSrc) pendingImageSrc = null;
                    },
                })
                    .to(state, {
                        opacity: 0.72,
                        duration: 0.16,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (!iphoneRef.current) return;
                            iphoneRef.current.style.opacity = `${state.opacity}`;
                        },
                    })
                    .add(() => {
                        if (pendingImageSrc !== newSrc) return;
                        currentImageRef.current = newSrc;
                        setImageSrc(newSrc);
                    })
                    .to(state, {
                        opacity: 1,
                        duration: 0.26,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (!iphoneRef.current) return;
                            iphoneRef.current.style.opacity = `${state.opacity}`;
                        },
                    });
            };

            if (loadedImageSrcs.has(newSrc)) {
                runSwap();
                return;
            }
            const nextImage = new window.Image();
            nextImage.decoding = "async";
            nextImage.src = newSrc;
            if (nextImage.complete) {
                loadedImageSrcs.add(newSrc);
                runSwap();
                return;
            }
            nextImage.onload = () => {
                loadedImageSrcs.add(newSrc);
                runSwap();
            };
            nextImage.onerror = runSwap;
        };
        let contentOpenHeight = 0;
        if (islandContent) {
            const prevDisplay = islandContent.style.display;
            const prevVisibility = islandContent.style.visibility;
            islandContent.style.display = "flex";
            islandContent.style.visibility = "hidden";
            contentOpenHeight = islandContent.scrollHeight;
            islandContent.style.display = prevDisplay;
            islandContent.style.visibility = prevVisibility;
        }
        const getClosedIslandHeight = () => {
            const cameraHeight = islandCamera?.scrollHeight ?? 0;
            return Math.max(24, cameraHeight);
        };
        const applyProgress = (rawProgress: number) => {
            const phoneP = gsap.utils.clamp(0, 1, rawProgress);
            // Dynamic Island finishes by 50% of iPhone progress.
            const islandP = gsap.utils.clamp(0, 1, rawProgress / 0.5);
            // Hide island + phone content after island is fully open by +10% phone progress.
            const hideStartP = 0.6;
            const hideRange = 0.08;
            const hideP = gsap.utils.clamp(0, 1, (phoneP - hideStartP) / hideRange);
            const closedHeight = getClosedIslandHeight();

            const cameraH = islandCamera?.scrollHeight ?? 0;
            const paddingTop = 0;
            const openHeight = cameraH + contentOpenHeight + paddingTop;
            const fromPadding = 0;
            const isOpen = islandP > 0.02;

            gsap.set(iphoneRef.current, {
                bottom: `${gsap.utils.interpolate(-90, 0, phoneP)}%`,
                scale: gsap.utils.interpolate(1.9, 1, phoneP),
            });

            gsap.set(dynamicIslandRef.current, {
                width: "90%",
                maxWidth: `${gsap.utils.interpolate(50, 90, islandP)}%`,
                opacity: gsap.utils.interpolate(1, 0, hideP),
            });

            gsap.set(islandRoot, {
                height: islandP >= 0.99 ? "auto" : gsap.utils.interpolate(closedHeight, openHeight, islandP),
                minHeight: islandP >= 0.99 ? openHeight : closedHeight,
                borderRadius: gsap.utils.interpolate(200, 55, islandP),
                paddingLeft: `${gsap.utils.interpolate(fromPadding, openPadX, islandP)}px`,
                paddingRight: `${gsap.utils.interpolate(fromPadding, openPadX, islandP)}px`,
                paddingTop: `${gsap.utils.interpolate(0, paddingTop, islandP)}px`,
            });

            if (islandCamera) {
                gsap.set(islandCamera, {
                    width: gsap.utils.interpolate("100%", "auto", islandP),
                    height: gsap.utils.interpolate("100%", "auto", islandP),
                    paddingLeft: `${gsap.utils.interpolate(8, openCameraPx, islandP)}px`,
                    paddingRight: `${gsap.utils.interpolate(8, openCameraPx, islandP)}px`,
                    paddingTop: `${gsap.utils.interpolate(8, openCameraPt, islandP)}px`,
                    paddingBottom: "8px",
                });
            }

            if (islandContent) {
                islandContent.style.display = isOpen ? "flex" : "none";
                gsap.set(islandContent, {
                    opacity: gsap.utils.interpolate(0, 1, islandP),
                    scale: gsap.utils.interpolate(0.92, 1, islandP),
                });
            }

            if (subtitleBlockRef.current) {
                gsap.set(subtitleBlockRef.current, {
                    opacity: gsap.utils.interpolate(1, 0, islandP),
                    scale: gsap.utils.interpolate(1, 0.2, islandP),
                });
            }
            if (headingRef.current && subtitleBlockRef.current) {
                const subtitleHeight = subtitleBlockRef.current.offsetHeight;
                gsap.set(headingRef.current, {
                    y: gsap.utils.interpolate(0, -subtitleHeight, islandP),
                });
            }
            if (phoneContentWrapperRef.current) {
                gsap.set(phoneContentWrapperRef.current, {
                    opacity: gsap.utils.interpolate(1, 0, hideP),
                });
            }
        };

        gsap.set(dynamicIslandRef.current, {
            width: "90%",
            maxWidth: "50%",
        });
        if (islandCamera) {
            gsap.set(islandCamera, {
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "8px",
                paddingBottom: "8px",
            });
        }
        gsap.set(islandRoot, {
            height: getClosedIslandHeight(),
            borderRadius: 200,
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "0px",
        });
        if (islandContent) gsap.set(islandContent, { display: "none", opacity: 0, scale: 0.92 });

        const words = sentencesRef.current;
        gsap.set(words, { opacity: 0, y: 80 });
        const CARD_FADE_IN_END = 0.35;
        const CARD_HOLD_END = 0.70;
        const cardOpacity = (rawP: number) =>
            rawP <= CARD_FADE_IN_END
                ? rawP / CARD_FADE_IN_END
                : rawP <= CARD_HOLD_END
                    ? 1
                    : Math.max(1 - (rawP - CARD_HOLD_END) / (1 - CARD_HOLD_END), 0);
        const cardFadeOutP = (rawP: number) =>
            rawP <= CARD_HOLD_END ? 0 : (rawP - CARD_HOLD_END) / (1 - CARD_HOLD_END);
        const MID_STUCK_START = 0.45;
        const MID_STUCK_END = 0.55;
        const midStuckProgress = (rawP: number) => {
            const clamped = gsap.utils.clamp(0, 1, rawP);
            if (clamped <= MID_STUCK_START) {
                return gsap.utils.mapRange(0, MID_STUCK_START, 0, 0.5, clamped);
            }
            if (clamped <= MID_STUCK_END) return 0.5;
            return gsap.utils.mapRange(MID_STUCK_END, 1, 0.5, 1, clamped);
        };
        const revealProgress = (rawP: number) =>
            gsap.utils.clamp(0, 1, midStuckProgress(rawP) * 2);

        const vh = window.innerHeight;
        /** Higher values = more scroll needed to get through the hero (slower feel). */
        const SCROLL_PACE = 3;
        const IPHONE_SCALE_END = 300 * SCROLL_PACE;
        const LOCATION_THRESHOLD = IPHONE_SCALE_END * 0.6;
        const SENTENCE_START = 300 * SCROLL_PACE;
        const SENTENCE_SPACING = vh * 0.5 * SCROLL_PACE;
        const SENTENCE_DURATION = 200 * SCROLL_PACE;
        const TOTAL_SCROLL = IPHONE_SCALE_END + words.length * SENTENCE_SPACING + 500 * SCROLL_PACE;
        const s0FadeStart = SENTENCE_START + SENTENCE_SPACING;
        const sentence2End = SENTENCE_START + SENTENCE_SPACING + SENTENCE_DURATION;
        const s1FadeStart = SENTENCE_START + SENTENCE_SPACING * 2;
        const sentence3End = SENTENCE_START + SENTENCE_SPACING * 2 + SENTENCE_DURATION;
        const s2FadeStart = SENTENCE_START + SENTENCE_SPACING * 3;
        const sentence4End = SENTENCE_START + SENTENCE_SPACING * 3 + SENTENCE_DURATION;
        const confirmedWordStart = SENTENCE_START + SENTENCE_SPACING * 4;
        const word0End = SENTENCE_START + SENTENCE_DURATION;
        const word1End = SENTENCE_START + SENTENCE_SPACING + SENTENCE_DURATION;
        const word2End = SENTENCE_START + SENTENCE_SPACING * 2 + SENTENCE_DURATION;
        const word3End = SENTENCE_START + SENTENCE_SPACING * 3 + SENTENCE_DURATION;
        const word4End = SENTENCE_START + SENTENCE_SPACING * 4 + SENTENCE_DURATION;
        const cardDuration = sentence2End - s0FadeStart;
        const priceCardDuration = sentence3End - s1FadeStart;
        const driverCardDuration = sentence4End - s2FadeStart;
        const cardTravelVh = 4.5;
        const truckCard = containerRef.current?.querySelector<HTMLElement>("#truck-card");
        const selectPriceCard = containerRef.current?.querySelector<HTMLElement>("#select-price-card");
        const selectDriverCard = containerRef.current?.querySelector<HTMLElement>("#select-driver-card");

        const mainTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${TOTAL_SCROLL}`,
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                const scroll = self.progress * TOTAL_SCROLL;
                const phoneRawP = scroll <= IPHONE_SCALE_END ? scroll / IPHONE_SCALE_END : 1;
                applyProgress(phoneRawP);
                if (blurRef.current) {
                    const blurStates = [
                        { xPercent: 0, opacity: 0.3 }, // center (initial)
                        { xPercent: 0, opacity: 0.4 }, // center
                        { xPercent: 18, opacity: 0.3 }, // right
                        { xPercent: 0, opacity: 0.4 }, // center
                        { xPercent: 0, opacity: 0.3 }, // center (last)
                    ];
                    const lerp = (from: number, to: number, p: number) => gsap.utils.interpolate(from, to, p);
                    let xPercent = blurStates[0].xPercent;
                    let opacity = blurStates[0].opacity;

                    if (scroll <= word0End) {
                        xPercent = blurStates[0].xPercent;
                        opacity = blurStates[0].opacity;
                    } else if (scroll <= word1End) {
                        const p = gsap.utils.clamp(0, 1, (scroll - word0End) / (word1End - word0End));
                        xPercent = lerp(blurStates[0].xPercent, blurStates[1].xPercent, p);
                        opacity = lerp(blurStates[0].opacity, blurStates[1].opacity, p);
                    } else if (scroll <= word2End) {
                        const p = gsap.utils.clamp(0, 1, (scroll - word1End) / (word2End - word1End));
                        xPercent = lerp(blurStates[1].xPercent, blurStates[2].xPercent, p);
                        opacity = lerp(blurStates[1].opacity, blurStates[2].opacity, p);
                    } else if (scroll <= word3End) {
                        const p = gsap.utils.clamp(0, 1, (scroll - word2End) / (word3End - word2End));
                        xPercent = lerp(blurStates[2].xPercent, blurStates[3].xPercent, p);
                        opacity = lerp(blurStates[2].opacity, blurStates[3].opacity, p);
                    } else if (scroll <= word4End) {
                        const p = gsap.utils.clamp(0, 1, (scroll - word3End) / (word4End - word3End));
                        xPercent = lerp(blurStates[3].xPercent, blurStates[4].xPercent, p);
                        opacity = lerp(blurStates[3].opacity, blurStates[4].opacity, p);
                    } else {
                        xPercent = blurStates[4].xPercent;
                        opacity = blurStates[4].opacity;
                    }
                    // Monotonic rotation: increases on forward scroll, decreases on backward scroll.
                    const rotationP = gsap.utils.clamp(0, 1, (scroll - word0End) / (word4End - word0End));
                    const rotate = gsap.utils.interpolate(0, 120, rotationP);

                    gsap.set(blurRef.current, {
                        width: "70%",
                        height: "100%",
                        xPercent,
                        rotate,
                        opacity,
                    });
                }

                if (scroll < s0FadeStart) {
                    if (scroll < LOCATION_THRESHOLD) {
                        swapImage("/brand/pages/home/iphone.png");
                    } else {
                        swapImage("/brand/pages/home/iphone-location.png");
                    }
                } else if (scroll <= sentence2End) {
                    swapImage("/brand/pages/home/iphone-truck.png");
                } else if (scroll < s1FadeStart) {
                    swapImage("/brand/pages/home/iphone-truck.png");
                } else if (scroll <= sentence3End) {
                    swapImage("/brand/pages/home/iphone-select-price.png");
                } else if (scroll < s2FadeStart) {
                    swapImage("/brand/pages/home/iphone-select-price.png");
                } else if (scroll <= sentence4End) {
                    swapImage("/brand/pages/home/iphone-select-driver.png");
                } else if (scroll >= confirmedWordStart) {
                    swapImage("/brand/pages/home/iphone-confirmed.png");
                } else {
                    swapImage("/brand/pages/home/iphone-select-driver.png");
                }

                if (truckCard) {
                    if (scroll < s0FadeStart) {
                        truckCard.style.opacity = "0";
                        truckCard.style.transform = `translateY(${cardTravelVh}vh)`;
                    } else if (scroll <= sentence2End) {
                        const rawP = Math.min((scroll - s0FadeStart) / cardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const eased = backOut(stuckP, 1.7);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);
                        const y = cardTravelVh * (1 - eased) - foP * cardTravelVh;

                        truckCard.style.opacity = `${op}`;
                        truckCard.style.transform = `translateY(${y}vh)`;
                    } else {
                        truckCard.style.opacity = "0";
                        truckCard.style.transform = `translateY(-${cardTravelVh}vh)`;
                    }
                }

                if (selectPriceCard) {
                    if (scroll < s1FadeStart) {
                        selectPriceCard.style.opacity = "0";
                        selectPriceCard.style.transform = `translateY(${cardTravelVh}vh)`;
                    } else if (scroll <= sentence3End) {
                        const rawP = Math.min((scroll - s1FadeStart) / priceCardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const eased = backOut(stuckP, 1.7);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);
                        const y = Math.max(cardTravelVh * (1 - eased), 0);
                        const scaleOut = gsap.utils.interpolate(1, 0.88, foP);

                        selectPriceCard.style.opacity = `${op}`;
                        selectPriceCard.style.transform = `translateY(${y}vh) scale(${scaleOut})`;
                    } else {
                        selectPriceCard.style.opacity = "0";
                        selectPriceCard.style.transform = "translateY(0vh) scale(0.88)";
                    }
                }

                if (selectDriverCard) {
                    if (scroll < s2FadeStart) {
                        selectDriverCard.style.opacity = "0";
                        selectDriverCard.style.transform = "translateY(0vh) scale(0.88)";
                    } else if (scroll <= sentence4End) {
                        const rawP = Math.min((scroll - s2FadeStart) / driverCardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);
                        const scaleIn = gsap.utils.interpolate(0.88, 1, Math.min(stuckP / CARD_FADE_IN_END, 1));
                        const scaleOut = gsap.utils.interpolate(1, 0.88, foP);
                        const scale = stuckP <= CARD_FADE_IN_END ? scaleIn : scaleOut;

                        selectDriverCard.style.opacity = `${op}`;
                        selectDriverCard.style.transform = `translateY(0vh) scale(${scale})`;
                    } else {
                        selectDriverCard.style.opacity = "0";
                        selectDriverCard.style.transform = "translateY(0vh) scale(0.88)";
                    }
                }

                words.forEach((el, i) => {
                    const isLast = i === words.length - 1;
                    const wordStart = SENTENCE_START + i * SENTENCE_SPACING;
                    const wordEnd = wordStart + SENTENCE_DURATION;
                    const fadeOutStart = wordEnd;
                    const fadeOutEnd = fadeOutStart + SENTENCE_DURATION;

                    if (scroll < wordStart) {
                        gsap.set(el, { opacity: 0, y: 80 });
                    } else if (scroll <= wordEnd) {
                        const p = (scroll - wordStart) / SENTENCE_DURATION;
                        const revealP = revealProgress(p);
                        gsap.set(el, {
                            opacity: revealP,
                            y: 80 * (1 - revealP),
                            scale: gsap.utils.interpolate(0.96, 1, revealP),
                        });
                    } else if (!isLast && scroll <= fadeOutEnd) {
                        const p = (scroll - fadeOutStart) / SENTENCE_DURATION;
                        const stuckP = midStuckProgress(p);
                        const foP = cardFadeOutP(stuckP);
                        gsap.set(el, {
                            opacity: 1 - p,
                            y: -60 * stuckP - 20 * foP,
                        });
                    } else if (!isLast && scroll > fadeOutEnd) {
                        gsap.set(el, { opacity: 0, y: -60 });
                    } else {
                        gsap.set(el, { opacity: 1, y: 0 });
                    }
                });
            },
        });

        applyProgress(0);
        requestAnimationFrame(() => {
            applyProgress(mainTrigger.progress);
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                onLayoutReady?.(true);
            });
        });
    }, { scope: containerRef, dependencies: [firstImageLoaded] });

    const setRef = (el: HTMLDivElement | null, index: number) => {
        if (el) sentencesRef.current[index] = el;
    };

    return (
        <section ref={containerRef} className="h-screen w-screen flex flex-col bg-black text-white relative">
            <div className="basis-[10%]" />
            <BluredBackground blurRef={blurRef} />
            <div className="basis-[80%] grid grid-cols-3 items-center">
                <div className="flex items-start justify-center h-full pt-[25%]">
                    <div className="relative">
                        <div ref={(el) => setRef(el, 0)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-left opacity-0 translate-y-[80px]">{tWords("selectLocation")}</div>
                        <div ref={(el) => setRef(el, 4)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-left absolute inset-0 opacity-0 translate-y-[80px]">{tWords("confirmed")}</div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full relative">
                    <div ref={iphoneRef} className="absolute h-full w-full" style={{ bottom: "-130%", transform: "scale(1.9)" }}>
                        {/* iPhone frame */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative h-full aspect-[285/580]">
                                <SentencesCards />
                                <NextImage
                                    src={imageSrc}
                                    alt={tPhone("heroImageAlt")}
                                    fill
                                    className="object-contain"
                                />

                                {/* Dynamic Island responsive content */}
                                <div className="absolute top-5 w-full flex items-center justify-center flex-col">
                                    <div
                                        ref={dynamicIslandRef}
                                        className="w-[90%] max-w-[50%] flex items-center justify-center"
                                    >
                                        <DynamicIsland />
                                    </div>
                                    <div ref={phoneContentWrapperRef} className="mt-[1vw]">
                                        <IPhoneContent subtitleBlockRef={subtitleBlockRef} headingRef={headingRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full">
                    <div ref={(el) => setRef(el, 2)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-right opacity-0 translate-y-[80px]">{tWords("selectPrice")}</div>
                </div>
            </div>

            <div className="basis-[10%] flex items-center justify-center">
                <div className="relative">
                    <div ref={(el) => setRef(el, 1)} className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center opacity-0 translate-y-[80px]">{tWords("chooseTruck")}</div>
                    <div ref={(el) => setRef(el, 3)} className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center absolute inset-0 opacity-0 translate-y-[80px]">{tWords("selectDriver")}</div>
                </div>
            </div>
        </section>
    );
};



type IPhoneContentProps = {
    subtitleBlockRef: React.RefObject<HTMLDivElement | null>;
    headingRef: React.RefObject<HTMLDivElement | null>;
};

const IPhoneContent = ({ subtitleBlockRef, headingRef }: IPhoneContentProps) => {
    const t = useTranslations("home.hero.phoneContent");

    return (<div className="flex flex-col gap-y-[0.7vw] items-center justify-center">
        {/* upper part */}
        <div ref={subtitleBlockRef} className="flex flex-col items-center justify-center gap-y-[0.1vw]">
            <p className="text-[0.5vw] font-light leading-2.5">{t("subtitle")}</p>
            <p className="flex flex-col items-center font-medium text-[1vw] leading-[1.4vw]">
                <span>{t("requestToDelivery")}</span>
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{t("allInOneApp")}</span>
            </p>
        </div>

        {/* lower part */}
        <div ref={headingRef} className="flex flex-col items-center justify-center font-medium text-[1.8vw] leading-[2vw]">
            <p className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{t("smartWayTo")}</p>
            <p>
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{t("moveYour")}</span>
                {" "}
                <span>{t("cargo")}</span>
            </p>
        </div>
    </div>)
}

type BluredBackgroundProps = {
    blurRef: React.RefObject<HTMLDivElement | null>;
};

const BluredBackground = ({ blurRef }: BluredBackgroundProps) => {
    return (
        <div className={clsx("flex items-center justify-center", "absolute inset-0", "h-full", "w-full")}>
            <div
                ref={blurRef}
                className={clsx(
                    "bg-main-ukraineBlue h-full w-[70%] blur-[120px] opacity-30 relative top-[50%]",
                    "rounded-full pointer-events-none z-0",
                )}
            />
        </div>
    );
}

export default Hero;