import clsx from "clsx";
import BannerSlider from "./banner";
import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onLayoutReady }: { onLayoutReady?: () => void }) => {
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
        <section ref={scopeRef}>
            <div className="container space-y-10 mt-36">
                <Heading headingRef={headingRef} />
                <Banner bannerRef={bannerRef} />
            </div>
        </section>
    );
};

const Heading = ({ headingRef }: { headingRef: RefObject<HTMLDivElement | null> }) => {
    return (
        <div className="space-y-1" ref={headingRef}>
            <h1 className="text-white font-bold 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl">
                Wasel Blogs
            </h1>

            <p className="text-sm sm:text-base md:text-lg xl:text-xl leading-normal sm:leading-[27px] max-w-3xl">
                Stay updated with the latest trends, insights, and innovations in logistics, transportation, and supply chain management.
            </p>
        </div>
    );
};

const Banner = ({ bannerRef }: { bannerRef: RefObject<HTMLDivElement | null> }) => {
    return (
        <div
            ref={bannerRef}
            className={clsx(
                "max-h-[80vh] min-h-[600px]",
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

            <div className="relative h-full w-full flex items-end justify-start">
                <BannerSlider />
            </div>
        </div>
    );
};

export default Hero;