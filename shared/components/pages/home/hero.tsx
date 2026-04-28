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
import { IHomePageResponse } from "@/shared/types/pages/home.types";

gsap.registerPlugin(ScrollTrigger);

const backOut = (t: number, amplitude = 1.7): number => {
    const c1 = amplitude;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type HeroProps = {
    onLayoutReady?: (ready: boolean) => void;
    onMountStart?: () => void;
    heroContent: NonNullable<IHomePageResponse["content"]>["hero"] | null;
    altImg: IHomePageResponse["alt_img"];
};

const Hero = ({ onLayoutReady, onMountStart, heroContent, altImg }: HeroProps) => {
    const tWords = useTranslations("home.hero.words");
    const tPhone = useTranslations("home.hero.phoneContent");
    const heroTitles = {
        screen2: heroContent?.screen_2 || tWords("selectLocation"),
        screen3: heroContent?.screen_3 || tWords("chooseTruck"),
        screen4: heroContent?.screen_4 || tWords("selectPrice"),
        screen5: heroContent?.screen_5 || tWords("selectDriver"),
        screen6: heroContent?.screen_6 || tWords("confirmed"),
    };
    const heroImageAlt = altImg || heroContent?.screen_2 || tPhone("heroImageAlt");
    const containerRef = useRef<HTMLDivElement>(null);
    const iphoneRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const dynamicIslandRef = useRef<HTMLDivElement>(null);
    const subtitleBlockRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const phoneContentWrapperRef = useRef<HTMLDivElement>(null);
    const desktopSentencesRef = useRef<HTMLDivElement[]>([]);
    const mobileSentencesRef = useRef<HTMLDivElement[]>([]);
    const getBaseIphoneSrc = () =>
        (typeof window !== "undefined" && window.innerWidth < 768)
            ? "/brand/pages/home/iphone-small.png"
            : "/brand/pages/home/iphone.png";
    const [imageSrc, setImageSrc] = useState("/brand/pages/home/iphone.png");
    const currentImageRef = useRef<string>("/brand/pages/home/iphone.png");
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [islandTop, setIslandTop] = useState<string | undefined>(undefined);

    useEffect(() => {
        const firstSrc = getBaseIphoneSrc();
        currentImageRef.current = firstSrc;
        queueMicrotask(() => setImageSrc(firstSrc));
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

        const updateTop = () => {
            const w = window.innerWidth;
            if(w>=1050){
                setIslandTop('3%');
            }
            else if (w >= 1024 && w < 1050) {
                setIslandTop('20.5%');
            } else if (w >= 800) {
                setIslandTop('22.5%');
            } else if (w >= 700) {
                setIslandTop('20.5%');
            } else if (w >= 400) {
                setIslandTop("40%");
            }
        };
        updateTop();
        window.addEventListener('resize', updateTop);
        return () => window.removeEventListener('resize', updateTop);
    }, [onMountStart]);

    // ── Mount animation for iPhone (waits for first image) ──
    useGSAP(() => {
        if (!firstImageLoaded) return;
        if (!iphoneRef.current || !dynamicIslandRef.current || !blurRef.current) return;

        const isMdOrUp = window.innerWidth >= 768;
        const bottomTo = isMdOrUp ? "-90%" : "-30%";

        const iphoneMountTl = gsap.timeline();
        iphoneMountTl.fromTo(
            iphoneRef.current,
            { bottom: "-130%", scale: 1.9 },
            { bottom: bottomTo, scale: 1.9, duration: 2, ease: "back.out(1.7)" },
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
        const baseIphoneSrc = isMdOrUp ? "/brand/pages/home/iphone.png" : "/brand/pages/home/iphone-small.png";
        const heroImageSources = [
            "/brand/pages/home/iphone.png",
            "/brand/pages/home/iphone-small.png",
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

            // On mobile, mount ends at -30%; on md+ it ends at -90%. Scroll starts from that end state.
            const bottomFrom = isMdOrUp ? -90 : -30;
            gsap.set(iphoneRef.current, {
                bottom: `${gsap.utils.interpolate(bottomFrom, 0, phoneP)}%`,
                scale: gsap.utils.interpolate(1.9, 1, phoneP),
            });

            gsap.set(dynamicIslandRef.current, {
                width: "90%",
                maxWidth: `${gsap.utils.interpolate(36, 65, islandP)}%`,
                opacity: gsap.utils.interpolate(1, 0, hideP),
            });

            gsap.set(islandRoot, {
                height: islandP >= 0.99 ? "auto" : gsap.utils.interpolate(closedHeight, Math.min(openHeight, 366), islandP),
                minHeight: islandP >= 0.99 ? Math.min(openHeight, 366) : closedHeight,
                maxHeight: "366px",
                borderRadius: gsap.utils.interpolate(200, 30, islandP),
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
            maxHeight: "366px",
            borderRadius: 200,
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "0px",
        });
        if (islandContent) gsap.set(islandContent, { display: "none", opacity: 0, scale: 0.92 });

        const words = isMdOrUp ? desktopSentencesRef.current : mobileSentencesRef.current;
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
        const SCROLL_PACE = isMdOrUp ? 3 : 2;
        const IPHONE_SCALE_END = 300 * SCROLL_PACE;
        const LOCATION_THRESHOLD = IPHONE_SCALE_END * 0.6;
        const SENTENCE_START = 300 * SCROLL_PACE;
        const SENTENCE_SPACING = vh * 0.5 * SCROLL_PACE;
        const SENTENCE_DURATION = 200 * SCROLL_PACE;
        const TOTAL_SCROLL = IPHONE_SCALE_END + words.length * SENTENCE_SPACING + SENTENCE_DURATION + 80 * SCROLL_PACE;
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
                        swapImage(baseIphoneSrc);
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

    const setDesktopRef = (el: HTMLDivElement | null, index: number) => {
        if (el) desktopSentencesRef.current[index] = el;
    };

    const setMobileRef = (el: HTMLDivElement | null, index: number) => {
        if (el) mobileSentencesRef.current[index] = el;
    };

    return (
        <section ref={containerRef} className="h-screen w-screen flex flex-col bg-black text-white relative">
            <div className="basis-[10%]" />
            <BluredBackground blurRef={blurRef} />
            <div className="basis-[80%] grid grid-cols-3 items-center">
                <div className="flex items-start justify-center h-full pt-[25%]">
                    <div className="relative">
                        <div ref={(el) => setDesktopRef(el, 0)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-left opacity-0 translate-y-[80px] invisible md:visible">{heroTitles.screen2}</div>
                        <div ref={(el) => setDesktopRef(el, 4)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-left absolute inset-0 opacity-0 translate-y-[80px] invisible md:visible">{heroTitles.screen6}</div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full relative ">
                    <div ref={iphoneRef} className="absolute h-full w-full " style={{ bottom: "-130%", transform: "scale(1.9)" }}>
                        {/* iPhone frame */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative h-full aspect-[150/480] md:aspect-[285/580] md:max-w-[100%] max-md:w-[150%]">
                                <SentencesCards />
                                <NextImage
                                    src={imageSrc}
                                    alt={heroImageAlt}
                                    fill
                                    className={clsx("object-contain")}
                                />

                                {/* Dynamic Island + iPhone content: hidden on < md */}
                                <div
                                    className="absolute  w-full flex items-center justify-center flex-col"
                                    style={{ top: islandTop }}
                                >
                                    <div
                                        ref={dynamicIslandRef}
                                        className="w-[90%] max-w-[50%] hidden md:flex items-center justify-center"
                                    >
                                        <DynamicIsland />
                                    </div>
                                    <div ref={phoneContentWrapperRef} className="mt-[0.5vw]">
                                        <IPhoneContent
                                            subtitleBlockRef={subtitleBlockRef}
                                            headingRef={headingRef}
                                            heroContent={heroContent}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full">
                    <div ref={(el) => setDesktopRef(el, 2)} className="xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl  leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-right opacity-0 translate-y-[80px] invisible md:visible">{heroTitles.screen4}</div>
                </div>
            </div>

            <div className="absolute left-1/2 bottom-[15vh] -translate-x-1/2 z-20 pointer-events-none md:hidden w-full">
                <div className="relative w-full flex items-center justify-center">
                    <div ref={(el) => setMobileRef(el, 0)} className="absolute left-1/2 -translate-x-1/2 xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-center opacity-0 translate-y-[80px]">{heroTitles.screen2}</div>
                    <div ref={(el) => setMobileRef(el, 1)} className="absolute left-1/2 -translate-x-1/2 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center opacity-0 translate-y-[80px]">{heroTitles.screen3}</div>
                    <div ref={(el) => setMobileRef(el, 2)} className="absolute left-1/2 -translate-x-1/2 xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-center opacity-0 translate-y-[80px]">{heroTitles.screen4}</div>
                    <div ref={(el) => setMobileRef(el, 3)} className="absolute left-1/2 -translate-x-1/2 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center opacity-0 translate-y-[80px]">{heroTitles.screen5}</div>
                    <div ref={(el) => setMobileRef(el, 4)} className="absolute left-1/2 -translate-x-1/2 xl:text-5xl lg:text-4xl md:tet-3xl sm:text-2xl text-xl leading-[clamp(1.4rem,2.5vw,2.7rem)] font-bold text-center opacity-0 translate-y-[80px]">{heroTitles.screen6}</div>
                </div>
            </div>

            <div className="basis-[10%] hidden md:flex items-center justify-center">
                <div className="relative">
                    <div ref={(el) => setDesktopRef(el, 1)} className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center opacity-0 translate-y-[80px]">{heroTitles.screen3}</div>
                    <div ref={(el) => setDesktopRef(el, 3)} className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg leading-[clamp(1.3rem,2.1vw,2.3rem)] font-semibold text-center absolute inset-0 opacity-0 translate-y-[80px]">{heroTitles.screen5}</div>
                </div>
            </div>
        </section>
    );
};



type IPhoneContentProps = {
    subtitleBlockRef: React.RefObject<HTMLDivElement | null>;
    headingRef: React.RefObject<HTMLDivElement | null>;
    heroContent: NonNullable<IHomePageResponse["content"]>["hero"] | null;
};

const IPhoneContent = ({ subtitleBlockRef, headingRef, heroContent }: IPhoneContentProps) => {
    const t = useTranslations("home.hero.phoneContent");
    const screen1 = heroContent?.screen_1 ?? [];
    const requestToDelivery = screen1[1] || t("requestToDelivery");
    const allInOneApp = screen1[2] || t("allInOneApp");
    const smartWayTo = screen1[3] || t("smartWayTo");
    const moveYourCargo = screen1[4] || `${t("moveYour")} ${t("cargo")}`;

    return (<div className="flex flex-col lg:gap-y-[0.7vw] md:gap-y-[1.4vw] gap-y-[15px] items-center justify-center">
        {/* upper part */}
        <div ref={subtitleBlockRef} className="flex flex-col items-center justify-center gap-y-[0.1vw]">
            <p className="lg:text-[0.3vw] md:text-[0.6vw] text-[5px] font-light leading-2.5">{t("subtitle")}</p>
            <p className="flex flex-col items-center font-medium lg:text-[0.7vw] md:text-[1.2vw] text-[10px] lg:leading-[0.8vw] md:leading-[1.4vw] leading-[2.8vw]">
                <span>{requestToDelivery}</span>
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{allInOneApp}</span>
            </p>
        </div>

        {/* lower part */}
        <div ref={headingRef} className="flex flex-col items-center justify-center font-medium lg:text-[1.5vw] md:text-[3vw] text-[16px] lg:leading-[1.5vw] md:leading-[3vw] leading-[4vw]">
            <p className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{smartWayTo}</p>
            <p className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">{moveYourCargo}</span>
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