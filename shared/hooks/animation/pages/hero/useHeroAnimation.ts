import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { heroSentences } from "@/shared/constants/hero-sentences";
gsap.registerPlugin(ScrollTrigger);

const backOut = (t: number, amplitude = 1.7): number => {
    const c1 = amplitude;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const useHeroAnimation = (
    imageLoaded: boolean,
    sectionRef: RefObject<HTMLDivElement | null>,
    iphoneRef: RefObject<HTMLDivElement | null>,
    dynamicIslandRef: RefObject<HTMLDivElement | null>,
    titleChunk1Ref: RefObject<HTMLDivElement | null>,
    titleChunk2Ref: RefObject<HTMLDivElement | null>,
    currentImageRef: React.MutableRefObject<string>,
    updateImageSrc: (src: string) => void,
) => {

    useGSAP(() => {
        if (!imageLoaded) return;
        if (
            !iphoneRef.current ||
            !titleChunk1Ref.current ||
            !titleChunk2Ref.current ||
            !dynamicIslandRef.current
        ) return;

        const vh = window.innerHeight;
        const scale = gsap.utils.clamp(0.6, 1.4, gsap.utils.mapRange(600, 1200, 0.6, 1.4, vh));

        const IPHONE_Y_FROM = `${90 * scale}vh`;
        const IPHONE_Y_TO = `${35 * scale}vh`;
        const MAX_MARGIN_TOP_VH = 8 * scale;

        let imgTimeline: gsap.core.Timeline | null = null;
        let pendingImageSrc: string | null = null;
        const loadedImageSrcs = new Set<string>();

        const heroImageSources = [
            "/brand/pages/home/iphone.png",
            "/brand/pages/home/iphone-location.png",
            "/brand/pages/home/iphone-truck.png",
            "/brand/pages/home/iphone-select-price.png",
            "/brand/pages/home/iphone-select-driver.png",
            "/brand/pages/home/iphone-confirmed.png",
        ];

        heroImageSources.forEach((src) => {
            const img = new Image();
            img.decoding = "async";
            img.src = src;
            if (img.complete) loadedImageSrcs.add(src);
            img.onload = () => {
                loadedImageSrcs.add(src);
            };
        });

        const swapImage = (newSrc: string) => {
            if (currentImageRef.current === newSrc || pendingImageSrc === newSrc) return;
            pendingImageSrc = newSrc;

            const runSwap = () => {
                if (pendingImageSrc !== newSrc) return;

                imgTimeline?.kill();

                if (iphoneRef.current) {
                    iphoneRef.current.style.filter = "none";
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
                        updateImageSrc(newSrc);
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

            const nextImage = new Image();
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

        const iphoneH = iphoneRef.current?.offsetHeight ?? 0;
        const fromH = iphoneH * 0.04;
        gsap.set(dynamicIslandRef.current, {
            width: "35%",
            height: fromH,
            borderRadius: 200,
            paddingLeft: "0px",
            paddingRight: "0px",
        });

        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(iphoneRef.current, { y: IPHONE_Y_FROM }, {
            y: IPHONE_Y_TO,
            duration: 1.5,
            ease: "back.out(0.7)",
        }).to(titleChunk1Ref.current, { opacity: 1, duration: 1 }, "<");

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "1% top",
            end: "+=100",
            scrub: true,
            onUpdate: (self) => {
                const p = self.progress;
                const iphoneH = iphoneRef.current?.offsetHeight ?? 0;
                const fromH = iphoneH * 0.04;

                const islandCamera = dynamicIslandRef.current?.querySelector("#dynamic-island-camera") as HTMLDivElement;
                const islandContent = dynamicIslandRef.current?.querySelector("#dynamic-island-content") as HTMLDivElement;
                const cameraH = islandCamera?.scrollHeight ?? 0;
                const contentH = islandContent?.scrollHeight ?? 0;
                const paddingTop = 16;
                const toH = cameraH + contentH + paddingTop;
                const fromPadding = 0;
                const toPadding = 34;

                gsap.set(dynamicIslandRef.current, {
                    width: gsap.utils.interpolate("35%", "65%", p),
                    height: p >= 0.99 ? "auto" : gsap.utils.interpolate(fromH, toH, p),
                    minHeight: p >= 0.99 ? toH : 0,
                    borderRadius: gsap.utils.interpolate(200, 55, p),
                    paddingLeft: `${gsap.utils.interpolate(fromPadding, toPadding, p)}px`,
                    paddingRight: `${gsap.utils.interpolate(fromPadding, toPadding, p)}px`,
                    paddingTop: `${gsap.utils.interpolate(0, paddingTop, p)}px`,
                });

                if (islandCamera) {
                    gsap.set(islandCamera, {
                        width: gsap.utils.interpolate("100%", "auto", p),
                        height: gsap.utils.interpolate("100%", "auto", p),
                        paddingTop: `${gsap.utils.interpolate(0, 4, p)}px`,
                    });
                }

                const iphoneSubtitle = titleChunk1Ref.current?.querySelector("#iphone-subtitle") as HTMLDivElement;
                if (iphoneSubtitle) {
                    gsap.set(iphoneSubtitle, {
                        opacity: gsap.utils.interpolate(1, 0, p),
                        scale: gsap.utils.interpolate(1, 0.2, p),
                    });
                    const subtitleHeight = iphoneSubtitle.offsetHeight;
                    if (titleChunk2Ref.current) {
                        gsap.set(titleChunk2Ref.current, {
                            y: gsap.utils.interpolate(0, -subtitleHeight, p),
                        });
                    }
                }

                if (islandContent) {
                    gsap.set(islandContent, { opacity: gsap.utils.interpolate(0, 1, p) });
                }
            },
        });

        const IPHONE_SCALE_END = 300;
        const LOCATION_THRESHOLD = IPHONE_SCALE_END * 0.2;
        const SENTENCE_START = 300;
        const SENTENCE_SPACING = window.innerHeight * 0.5;
        const SENTENCE_DURATION = 200;
        const TOTAL_SCROLL = IPHONE_SCALE_END + heroSentences.length * SENTENCE_SPACING + 500;

        // Card fade curve: 0.00–0.35 fade in → 0.35–0.70 hold → 0.70–1.00 fade out
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

        // ── TruckCard timings (sentence 2) ──
        const s0FadeStart = SENTENCE_START + SENTENCE_SPACING;
        const sentence2End = SENTENCE_START + SENTENCE_SPACING + SENTENCE_DURATION;
        const cardDuration = sentence2End - s0FadeStart;

        // ── SelectPriceCard timings (sentence 3) ──
        const s1FadeStart = SENTENCE_START + SENTENCE_SPACING * 2;
        const sentence3End = SENTENCE_START + SENTENCE_SPACING * 2 + SENTENCE_DURATION;
        const priceCardDuration = sentence3End - s1FadeStart;

        // ── SelectDriverCard timings (sentence 4) ──
        const s2FadeStart = SENTENCE_START + SENTENCE_SPACING * 3;
        const sentence4End = SENTENCE_START + SENTENCE_SPACING * 3 + SENTENCE_DURATION;
        const driverCardDuration = sentence4End - s2FadeStart;
        const confirmedWordStart = SENTENCE_START + SENTENCE_SPACING * 4;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top+=100 top",
            end: `+=${TOTAL_SCROLL}`,
            scrub: 0.35,
            pin: true,
            onUpdate: (self) => {
                const scroll = self.progress * TOTAL_SCROLL;

                if (scroll <= IPHONE_SCALE_END) {
                    const p = scroll / IPHONE_SCALE_END;

                    gsap.set(iphoneRef.current, {
                        width: `${gsap.utils.interpolate(50, 18, p)}%`,
                        marginTop: `${MAX_MARGIN_TOP_VH * p}vh`,
                        y: gsap.utils.interpolate(`${35 * scale}vh`, "15vh", p),
                    });

                    if (dynamicIslandRef.current) {
                        gsap.set(dynamicIslandRef.current, {
                            opacity: p < 0.2 ? 1 : 0,
                        });
                    }

                    if (titleChunk2Ref.current) {
                        gsap.set(titleChunk2Ref.current, {
                            opacity: gsap.utils.interpolate(1, 0, Math.min(p / 0.2, 1)),
                        });
                    }
                }

                const words = document.querySelectorAll<HTMLElement>(".hero-word");
                const truckCard = document.querySelector<HTMLElement>("#truck-card");
                const selectPriceCard = document.querySelector<HTMLElement>("#select-price-card");
                const selectDriverCard = document.querySelector<HTMLElement>("#select-driver-card");

                // ── TruckCard ──
                if (truckCard) {
                    if (scroll < s0FadeStart) {
                        truckCard.style.opacity = "0";
                        truckCard.style.transform = "translateY(50px)";

                        if (scroll < LOCATION_THRESHOLD) {
                            swapImage("/brand/pages/home/iphone.png");
                        } else {
                            swapImage("/brand/pages/home/iphone-location.png");
                        }

                    } else if (scroll <= sentence2End) {
                        const rawP = Math.min((scroll - s0FadeStart) / cardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const eased = backOut(stuckP, 1.7);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);

                        truckCard.style.opacity = `${op}`;
                        truckCard.style.transform = `translateY(${50 * (1 - eased) - foP * 50}px)`;
                        swapImage("/brand/pages/home/iphone-truck.png");

                    } else {
                        truckCard.style.opacity = "0";
                        truckCard.style.transform = "translateY(-50px)";
                    }
                }

                // ── SelectPriceCard ──
                if (selectPriceCard) {
                    if (scroll < s1FadeStart) {
                        selectPriceCard.style.opacity = "0";
                        selectPriceCard.style.transform = "translateY(50px)";

                        if (scroll >= sentence2End) {
                            swapImage("/brand/pages/home/iphone-truck.png");
                        }

                    } else if (scroll <= sentence3End) {
                        const rawP = Math.min((scroll - s1FadeStart) / priceCardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const eased = backOut(stuckP, 1.7);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);
                        const y = Math.max(50 * (1 - eased), 0);
                        const scaleOut = gsap.utils.interpolate(1, 0.88, foP);

                        selectPriceCard.style.opacity = `${op}`;
                        selectPriceCard.style.transform = `translateY(${y}px) scale(${scaleOut})`;
                        swapImage("/brand/pages/home/iphone-select-price.png");

                    } else {
                        selectPriceCard.style.opacity = "0";
                        selectPriceCard.style.transform = "translateY(0px) scale(0.88)";
                    }
                }

                // ── SelectDriverCard ──
                if (selectDriverCard) {
                    if (scroll < s2FadeStart) {
                        selectDriverCard.style.opacity = "0";
                        selectDriverCard.style.transform = "translateY(0px) scale(0.88)";

                        if (scroll >= sentence3End) {
                            swapImage("/brand/pages/home/iphone-select-price.png");
                        }

                    } else if (scroll <= sentence4End) {
                        const rawP = Math.min((scroll - s2FadeStart) / driverCardDuration, 1);
                        const stuckP = midStuckProgress(rawP);
                        const op = cardOpacity(stuckP);
                        const foP = cardFadeOutP(stuckP);
                        const scaleIn = gsap.utils.interpolate(0.88, 1, Math.min(stuckP / CARD_FADE_IN_END, 1));
                        const scaleOut = gsap.utils.interpolate(1, 0.88, foP);
                        const scale = stuckP <= CARD_FADE_IN_END ? scaleIn : scaleOut;

                        selectDriverCard.style.opacity = `${op}`;
                        selectDriverCard.style.transform = `translateY(0px) scale(${scale})`;
                        swapImage("/brand/pages/home/iphone-select-driver.png");

                    } else {
                        selectDriverCard.style.opacity = "0";
                        selectDriverCard.style.transform = "translateY(0px) scale(0.88)";
                        // Keep select-driver image until the "Confirmed" word phase starts.
                        if (scroll >= confirmedWordStart) {
                            swapImage("/brand/pages/home/iphone-confirmed.png");
                        } else {
                            swapImage("/brand/pages/home/iphone-select-driver.png");
                        }
                    }
                }

                words.forEach((word, i) => {
                    const isLast = i === words.length - 1;
                    const wordStart = SENTENCE_START + i * SENTENCE_SPACING;
                    const wordEnd = wordStart + SENTENCE_DURATION;
                    const fadeOutStart = wordEnd;
                    const fadeOutEnd = fadeOutStart + SENTENCE_DURATION;

                    if (scroll < wordStart) {
                        gsap.set(word, { opacity: 0, y: 60 });
                    } else if (scroll <= wordEnd) {
                        const p = (scroll - wordStart) / SENTENCE_DURATION;
                        const revealP = revealProgress(p);
                        gsap.set(word, {
                            opacity: revealP,
                            y: 60 * (1 - revealP),
                            scale: gsap.utils.interpolate(0.96, 1, revealP),
                        });
                    } else if (!isLast && scroll <= fadeOutEnd) {
                        const p = (scroll - fadeOutStart) / SENTENCE_DURATION;
                        gsap.set(word, { opacity: 1 - p, y: -40 * p });
                    } else if (!isLast && scroll > fadeOutEnd) {
                        gsap.set(word, { opacity: 0, y: -40 });
                    } else {
                        gsap.set(word, { opacity: 1, y: 0 });
                    }
                });
            },
        });

    }, { dependencies: [imageLoaded] });
};

export default useHeroAnimation;