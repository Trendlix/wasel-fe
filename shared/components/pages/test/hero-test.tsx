"use client";

import NextImage from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DynamicIsland from "./components/hero/dynamic-island";

gsap.registerPlugin(ScrollTrigger);

const HeroTest = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iphoneRef = useRef<HTMLDivElement>(null);
    const dynamicIslandRef = useRef<HTMLDivElement>(null);
    const subtitleBlockRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const phoneContentWrapperRef = useRef<HTMLDivElement>(null);
    const sentencesRef = useRef<HTMLDivElement[]>([]);
    const currentImageRef = useRef<string>("/brand/pages/home/iphone.png");
    const [imageSrc, setImageSrc] = useState("/brand/pages/home/iphone.png");

    // ── Mount animation for iPhone ──
    useGSAP(() => {
        if (!iphoneRef.current || !dynamicIslandRef.current) return;

        const iphoneMountTl = gsap.timeline();
        iphoneMountTl.fromTo(
            iphoneRef.current,
            { bottom: "-130%", scale: 1.9 },
            { bottom: "-90%", scale: 1.9, duration: 2, ease: "back.out(1.7)" },
        );

        const islandCamera = dynamicIslandRef.current.querySelector("#dynamic-island-camera") as HTMLDivElement | null;
        const islandContent = dynamicIslandRef.current.querySelector("#dynamic-island-content") as HTMLDivElement | null;
        const islandRoot = dynamicIslandRef.current.querySelector("#dynamic-island-root") as HTMLDivElement | null;

        const openPadX = window.innerWidth * 0.01; // px-[1vw]
        const openCameraPx = 40; // px-10
        const openCameraPt = window.innerWidth * 0.007; // pt-[0.7vw]
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
        const CARD_HOLD_END = 0.70;
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
        const IPHONE_SCALE_END = 300;
        const LOCATION_THRESHOLD = IPHONE_SCALE_END * 0.6;
        const SENTENCE_START = 300;
        const SENTENCE_SPACING = vh * 0.5;
        const SENTENCE_DURATION = 200;
        const TOTAL_SCROLL = IPHONE_SCALE_END + words.length * SENTENCE_SPACING + 500;
        const s0FadeStart = SENTENCE_START + SENTENCE_SPACING;
        const sentence2End = SENTENCE_START + SENTENCE_SPACING + SENTENCE_DURATION;
        const s1FadeStart = SENTENCE_START + SENTENCE_SPACING * 2;
        const sentence3End = SENTENCE_START + SENTENCE_SPACING * 2 + SENTENCE_DURATION;
        const s2FadeStart = SENTENCE_START + SENTENCE_SPACING * 3;
        const sentence4End = SENTENCE_START + SENTENCE_SPACING * 3 + SENTENCE_DURATION;
        const confirmedWordStart = SENTENCE_START + SENTENCE_SPACING * 4;

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
        requestAnimationFrame(() => applyProgress(mainTrigger.progress));
    }, { scope: containerRef });

    const setRef = (el: HTMLDivElement | null, index: number) => {
        if (el) sentencesRef.current[index] = el;
    };

    return (
        <div ref={containerRef} className="h-screen w-screen flex flex-col bg-black text-white">
            <div className="basis-[10%]" />

            <div className="basis-[80%] grid grid-cols-3 items-center">
                <div className="flex items-start justify-center h-full pt-[10%]">
                    <div className="relative">
                        <div ref={(el) => setRef(el, 0)} className="text-4xl font-bold text-left">Select Location</div>
                        <div ref={(el) => setRef(el, 4)} className="text-4xl font-bold text-left absolute inset-0">Confirmed</div>
                    </div>
                </div>

                <div className="flex items-center justify-center border h-full relative">
                    <div ref={iphoneRef} className="absolute h-full w-full">
                        {/* iPhone frame */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative h-full aspect-[285/580]">
                                <NextImage
                                    src={imageSrc}
                                    alt="hero-image"
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
                    <div ref={(el) => setRef(el, 2)} className="text-4xl font-bold text-right translate-y-[10%]">Select Price</div>
                </div>
            </div>

            <div className="basis-[10%] flex items-center justify-center">
                <div className="relative">
                    <div ref={(el) => setRef(el, 1)} className="text-3xl font-semibold text-center">Choose Truck</div>
                    <div ref={(el) => setRef(el, 3)} className="text-3xl font-semibold text-center absolute inset-0">Select Driver</div>
                </div>
            </div>
        </div>
    );
};



type IPhoneContentProps = {
    subtitleBlockRef: React.RefObject<HTMLDivElement | null>;
    headingRef: React.RefObject<HTMLDivElement | null>;
};

const IPhoneContent = ({ subtitleBlockRef, headingRef }: IPhoneContentProps) => {
    return (<div className="flex flex-col gap-y-[0.7vw] items-center justify-center">
        {/* upper part */}
        <div ref={subtitleBlockRef} className="flex flex-col items-center justify-center gap-y-[0.1vw]">
            <p className="text-[0.5vw] font-light leading-2.5">Smarter Routes. Stronger Logistics.</p>
            <p className="flex flex-col items-center font-medium text-[1vw] leading-[1.4vw]">
                <span>From Request to Delivery</span>
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">All in One App</span>
            </p>
        </div>

        {/* lower part */}
        <div ref={headingRef} className="flex flex-col items-center justify-center font-medium text-[1.8vw] leading-[2vw]">
            <p className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">The Smart Way to</p>
            <p>
                <span className="bg-gradient-to-b from-[#FFFFFF] to-[#CCCCCC] bg-clip-text text-transparent">Move Your</span>
                {" "}
                <span>Cargo</span>
            </p>
        </div>
    </div>)
}
export default HeroTest;