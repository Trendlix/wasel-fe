import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { RefObject, useRef } from "react";
import gsap from "gsap";

type HeroProps = { onLayoutReady?: () => void };

const Hero = ({ onLayoutReady }: HeroProps) => {
    const locale = useLocale();
    const t = useTranslations("services.hero");
    const dir = locale === "ar" ? "rtl" : "ltr";
    const headingRef = useRef<HTMLHeadingElement>(null);
    const headingXWidthRef = useRef<HTMLSpanElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const setHeadingXWidthRef = (el: HTMLSpanElement | null) => { headingXWidthRef.current = el; };
    const setParagraphRef = (el: HTMLParagraphElement | null) => { paragraphRef.current = el; };

    useGSAP(() => {
        if (!headingRef.current || !headingXWidthRef.current || !paragraphRef.current) return;
        gsap.set(headingRef.current, { autoAlpha: 0, y: 100 });
        gsap.set(headingXWidthRef.current, { width: 0 });
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 150 });

        const tl = gsap.timeline({
            onComplete: () => onLayoutReady?.(),
        });
        tl.to(headingRef.current, {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)",
        }).to(headingXWidthRef.current, { width: "100%", duration: 1, ease: "back.out(1)" }, "<")
            .to(paragraphRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<0");
    }, { scope: headingRef });

    return (<section className="">
        <div className="container mt-36">
            <Heading t={t} dir={dir} headingRef={headingRef} setHeadingXWidthRef={setHeadingXWidthRef} setParagraphRef={setParagraphRef} />
        </div>
    </section>);
}

const Heading = ({ t, dir, headingRef, setHeadingXWidthRef, setParagraphRef }: { t: (key: string) => string; dir: string; headingRef: RefObject<HTMLHeadingElement | null>; setHeadingXWidthRef: (el: HTMLSpanElement | null) => void; setParagraphRef: (el: HTMLParagraphElement | null) => void }) => {
    return (<div className="flex flex-col items-center justify-center gap-y-4" dir={dir}>
        <h1 className={clsx("text-white font-bold 2xl:text-5xl xl:text-4xl  text-3xl", "flex flex-col items-center justify-center", "opacity-0", "text-start", dir === "rtl" && "text-end")} ref={headingRef}>
            <p>
                <span className="dark:text-white text-black">{t("line1")}</span>
                {" "}
                <span className={clsx("w-fit", "relative py-1")}>
                    <span className="relative z-10 text-white p-1">{t("line2")}</span>
                    <span ref={setHeadingXWidthRef} className={clsx("absolute", "inset-0 w-full h-full bg-main-ukraineBlue z-0 ")}></span>
                </span>
            </p>
            <p className="mt-1 dark:text-white text-black">{t("line3")}</p>
        </h1>
        <p ref={setParagraphRef} className={clsx("lg:text-lg text-base leading-[21px]  md:leading-[27px] text-center 2xl:max-w-[50%] opacity-0")}>
            {t("subtitle")}
        </p>
    </div>)
}

export default Hero;