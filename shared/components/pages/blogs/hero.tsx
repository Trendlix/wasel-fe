import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import BannerSlider from "./banner";
import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onLayoutReady }: { onLayoutReady?: () => void }) => {
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
                <Heading headingRef={headingRef} />
                <Banner bannerRef={bannerRef} dir={dir} isAr={isAr} />
            </div>
        </section>
    );
};

const Heading = ({ headingRef }: { headingRef: RefObject<HTMLDivElement | null> }) => {
    const t = useTranslations("blogs.hero");
    return (
        <div className="space-y-4" ref={headingRef}>
            <h1 className="dark:text-white text-black font-bold 2xl:text-5xl xl:text-4xl text-3xl">
                {t("title")}
            </h1>

            <p className="lg:text-lg text-base leading-[21px] md:leading-[27px] max-w-3xl dark:text-white text-black">
                {t("subtitle")}
            </p>
        </div>
    );
};

const Banner = ({ bannerRef, dir, isAr }: { bannerRef: RefObject<HTMLDivElement | null>; dir?: "ltr" | "rtl"; isAr?: boolean }) => {
    return (
        <div
            ref={bannerRef}
            dir={dir}
            className={clsx(
                "max-h-[80vh] md:min-h-[600px]",
                "rounded-[30px] overflow-hidden",
                "relative",
                "flex items-end justify-start",
                // "aspect-video"
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
                <BannerSlider isAr={isAr} />
            </div>
        </div>
    );
};

export default Hero;