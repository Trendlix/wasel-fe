import useHeroAnimation from "@/shared/hooks/animation/pages/hero/useHeroAnimation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import DynamicIslandContent from "./components/hero/DynamicIslandContent";
import useHeroIphoneStuff from "@/shared/hooks/animation/pages/hero/useHeroIphoneStuff";
import ContentOnPinnedIphone from "./components/hero/ContentOnPinnedIphone";
import SentencesCards from "./components/hero/SentencesCards";

const Hero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const iphoneRef = useRef<HTMLDivElement>(null);
    const titleChunk1Ref = useRef<HTMLDivElement>(null);
    const titleChunk2Ref = useRef<HTMLDivElement>(null);
    const dynamicIslandRef = useRef<HTMLDivElement>(null);
    const currentImageRef = useRef<string>("/brand/pages/home/iphone.png");

    const { imageLoaded, setImageLoaded, imageSrc, updateImageSrc } = useHeroIphoneStuff();

    useHeroAnimation(
        imageLoaded,
        sectionRef,
        iphoneRef,
        dynamicIslandRef,
        titleChunk1Ref,
        titleChunk2Ref,
        currentImageRef,
        updateImageSrc,
    );

    const t = useTranslations("home.section-1");
    const words = t("titles.2").split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");

    return (
        <div ref={sectionRef} className="relative overflow-hidden">
            <ContentOnPinnedIphone />
            <div className="mx-auto relative"
                ref={iphoneRef}
                style={{ width: "50%" }}
            >
                {imageLoaded && (
                    <>
                        <div className="absolute left-0 right-0 z-10 flex flex-col items-center text-white text-center
                            gap-y-2
                            lg:gap-y-5
                            xl:gap-y-6
                            2xl:gap-y-8
                        ">
                            {/* ── Subtitle block ── */}
                            <div
                                ref={titleChunk1Ref}
                                className={clsx(
                                    "flex flex-col items-center opacity-0 whitespace-pre-line w-full",
                                    // top padding
                                    "pt-5",
                                    "lg:pt-8",
                                    "xl:pt-10",
                                    "2xl:pt-12",
                                    // gap between island and subtitle text
                                    "gap-y-2",
                                    "lg:gap-y-3",
                                    "xl:gap-y-3",
                                    "2xl:gap-y-4",
                                )}
                            >
                                <IphoneDynamicIsland ref={dynamicIslandRef} />

                                <div
                                    id="iphone-subtitle"
                                    className={clsx(
                                        "flex flex-col mt-4",
                                        "gap-y-1 lg:gap-y-2 xl:gap-y-2 2xl:gap-y-3 3xl:gap-y-3 4xl:gap-y-4"
                                    )}
                                >
                                    {/* Eyebrow */}
                                    <span className={clsx(
                                        "font-light",
                                        "text-[8px]",
                                        "lg:text-xs",
                                        "xl:text-sm",
                                        "2xl:text-base",
                                    )}>
                                        {t("titles.0")}
                                    </span>

                                    {/* Tagline */}
                                    <span className={clsx(
                                        "font-medium leading-tight px-2",
                                        "text-xs",
                                        "lg:text-lg lg:leading-7",
                                        "xl:text-xl xl:leading-8",
                                        "2xl:text-2xl 2xl:leading-9",
                                    )}>
                                        {t("titles.1")}
                                    </span>
                                </div>
                            </div>

                            {/* ── H1 ── */}
                            <h1
                                ref={titleChunk2Ref}
                                className={clsx(
                                    "font-medium whitespace-pre-line leading-[80px] mt-10",
                                    "text-sm",
                                    "lg:text-3xl lg:px-4",
                                    "xl:text-4xl xl:px-8",
                                    "2xl:text-7xl 2xl:px-10",
                                )}
                            >
                                {firstPart.split("to").join("to \n")}{" "}
                                <span className={clsx(
                                    "relative inline-block",
                                    "bg-gradient-to-t from-[#062ca7] via-[#ffffff] to-[#ffffff]",
                                    "bg-clip-text text-transparent",
                                    // underline glow
                                    "after:absolute after:content-['']",
                                    "after:bg-main-primary",
                                    "after:left-10 after:blur-xl",
                                    // underline size per breakpoint
                                    "after:w-[60%] after:h-[2px] after:bottom-[-4px]",
                                    "lg:after:w-[65%] lg:after:h-[3px] lg:after:bottom-[-6px]",
                                    "xl:after:w-[68%] xl:after:h-[4px] xl:after:bottom-[-8px]",
                                    "2xl:after:w-[70%] 2xl:after:h-[5px] 2xl:after:bottom-[-10px]",
                                )}>
                                    {lastWord}
                                </span>
                            </h1>
                        </div>
                    </>
                )}

                {/* ── iPhone image ── */}
                <div className="relative z-0">
                    <SentencesCards/>
                    <Image
                        src={imageSrc}
                        alt="iphone"
                        width={100}
                        height={100}
                        unoptimized
                        priority
                        onLoad={() => setImageLoaded(true)}
                        className={clsx(
                            "w-full transition-opacity duration-500",
                            imageLoaded ? "opacity-100" : "opacity-0"
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const IphoneDynamicIsland = forwardRef<HTMLDivElement>(
    function IphoneDynamicIsland(_, ref) {
        return (
            <div
                ref={ref}
                className="bg-black overflow-hidden relative"
            >
                {/* Camera pill */}
                <div
                    id="dynamic-island-camera"
                    className={clsx(
                        "flex items-center justify-end px-4 h-full",
                    )}
                >
                    <span className={clsx(
                        "rounded-full bg-main-solidBlack",
                        // camera dot size per breakpoint
                        "h-4 w-4",
                        "lg:h-5 lg:w-5",
                        "xl:h-6 xl:w-6",
                        "2xl:h-7 2xl:w-7",
                    )} />
                </div>

                <DynamicIslandContent />
            </div>
        );
    }
);

export default Hero;