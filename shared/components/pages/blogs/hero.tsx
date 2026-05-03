import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import BannerSlider from "./banner";
import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IBlogsHeroSection } from "@/shared/types/pages/blogs.types";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    heroData: IBlogsHeroSection | null;
    onLayoutReady?: () => void;
}

const Hero = ({ heroData, onLayoutReady }: HeroProps) => {
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isAr = locale === "ar";
    const scopeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 },
            onComplete: onLayoutReady,
        });

        tl.from(scopeRef.current, {
            autoAlpha: 0,
            duration: 0.6
        })
            .from(headingRef.current, {
                y: 60,
                autoAlpha: 0
            })
            .from(
                bannerRef.current,
                {
                    y: 80,
                    autoAlpha: 0,
                    scale: 0.96
                },
                "-=0.5"
            );

    }, { scope: scopeRef });

    return (
        <section ref={scopeRef} dir={dir}>
            <div className="container space-y-10 mt-36">
                <Heading headingRef={headingRef} heroData={heroData} />
                <Banner bannerRef={bannerRef} dir={dir} isAr={isAr} bannerData={heroData?.banner ?? []} />
            </div>
        </section>
    );
};

interface HeadingProps {
    headingRef: RefObject<HTMLDivElement | null>;
    heroData: IBlogsHeroSection | null;
}

const Heading = ({ headingRef, heroData }: HeadingProps) => {
    const t = useTranslations("blogs.hero");
    const locale = useLocale();
    const isAr = locale === "ar";

    // Use CMS data if available, otherwise fall back to i18n
    const title = heroData?.title || t("title");
    const description = heroData?.description || t("subtitle");

    return (
        <div className="space-y-4" ref={headingRef}>
            <h1
                className="dark:text-white text-black font-bold 2xl:text-5xl xl:text-4xl text-3xl"
                dangerouslySetInnerHTML={{ __html: title }}
            />

            <p
                className="lg:text-lg text-base leading-[21px] md:leading-[27px] max-w-3xl dark:text-white text-black"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};

interface BannerProps {
    bannerRef: RefObject<HTMLDivElement | null>;
    dir?: "ltr" | "rtl";
    isAr?: boolean;
    bannerData: IBlogsHeroSection["banner"];
}

const Banner = ({ bannerRef, dir, isAr, bannerData }: BannerProps) => {
    return (
        <div
            ref={bannerRef}
            dir={dir}
            className={clsx(
                "max-h-[80vh] md:min-h-[600px]",
                "rounded-[30px] overflow-hidden",
                "relative",
                "flex items-end justify-start",
            )}
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(/brand/pages/blogs/hero/blogs-banner.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-linear-to-t from-main-ukraineBlue to-main-primary absolute inset-0 z-0 opacity-80 w-full h-full"></div>

            <div className={clsx("relative h-full w-full flex items-end", isAr ? "justify-start" : "justify-end")}>
                <BannerSlider isAr={isAr} bannerData={bannerData} />
            </div>
        </div>
    );
};

export default Hero;
