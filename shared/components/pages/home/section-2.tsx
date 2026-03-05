"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";



type Section2Props = {
    heroLayoutReady?: boolean;
};

const Section2 = ({ heroLayoutReady = false }: Section2Props) => {
    const scopeRef = useRef<HTMLDivElement>(null);
    const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current) return;

        const contents = cardsRefs.current.map(card =>
            card?.querySelector("#card-content")
        );
        const links = cardsRefs.current.map(card =>
            card?.querySelector("#link")
        );


        // content animations
        if (!contents[0] || !contents[1] || !contents[2]) return;

        gsap.set(contents[0], { autoAlpha: 0, y: 200, x: -500 });
        gsap.set(contents[1], { autoAlpha: 0, y: 500 });
        gsap.set(contents[2], { autoAlpha: 0, y: 200, x: -500 });

        const ctl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 50%",
                // markers: true,
            }
        });

        ctl.to(contents[0], { autoAlpha: 1, y: 0, x: 0, duration: 1, ease: "back.out(1)" })
            .to(contents[1], { autoAlpha: 1, y: 0, duration: 1, ease: "back.out(1)" }, "<+=0.2")
            .to(contents[2], { autoAlpha: 1, y: 0, x: 0, duration: 1, ease: "back.out(1)" }, "<+=0.2");

        // links animations
        if (!links[0] || !links[1] || !links[2]) return;

        const ltl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "50% 50%",
            }
        })

        ltl.to(links[0], {
            y: -13,
            x: 10,
            duration: 1,
            ease: "bounce",
        }).to([links[1], links[2]], {
            y: -13,
            x: -10,
            duration: 1,
            ease: "bounce",
        }, "<+=0.2");

        // on leave opacity for card 2
        const c2tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "30% top",
                scrub: true,
                // markers: true
            }
        })

        c2tl.to(cardsRefs.current[1], {
            opacity: 0.2,
            duration: 1,
            ease: "back.out(1)",
        });
    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <section className="min-h-screen py-10 bg-black flex flex-col gap-4">
            <div ref={scopeRef} className="md:sm-container container">
                <div className="flex gap-4 max-md:flex-col">
                    <div className="lg:w-[60%] md:w-[50%] space-y-4 mt-20 flex flex-col items-end">
                        <Card1 ref={(el) => { cardsRefs.current[0] = el; }} />
                        <Card3 ref={(el) => { cardsRefs.current[2] = el; }} />
                    </div>
                    <div className="lg:w-[40%] md:w-[50%]">
                        <Card2 ref={(el) => { cardsRefs.current[1] = el; }} />
                    </div>
                </div>
            </div>
        </section>
    );
};



const Card1 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const t = useTranslations("home.section2.card1");
    return (
        <div ref={ref} {...props} className="relative h-fit">
            <div className="max-h-[500px] bg-main-red overflow-hidden text-white rounded-4xl xl:space-y-[clamp(1.5rem,2vw,3rem)] opacity-0" id="card-content">
                <div className="space-y-3 xl:px-12 lg:px-6 md:px-4 px-4 xl:py-10 lg:py-6 md:py-4 py-4">
                    <h3 className="font-medium text-2xl md:text-xl xl:leading-7 leading-6">{t("title")}</h3>
                    <p className="xl:text-base text-sm">{t("description")}</p>
                </div>
                <Image src="/brand/pages/home/section2/truck.png" alt="truck" width={3072} height={1260} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-[22%] -left-[13%] h-fit max-sm:hidden" id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className="max-w-[15%] max-h-[15%]" />
            </div>
        </div>
    );
});
Card1.displayName = "Card1";

const Card2 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const t = useTranslations("home.section2.card2");
    return (
        <div ref={ref} {...props} className="relative h-fit">
            <div className="bg-main-secondary rounded-4xl xl:px-14 lg:px-6 md:px-4 px-4 xl:py-10 lg:py-6 md:py-4 py-4 opacity-0" id="card-content">
                <div className="xl:space-y-3 lg:space-y-2 md:space-y-1">
                    <h3 className="font-medium text-2xl md:text-xl xl:leading-7 leading-6">{t("title")}</h3>
                    <p className="xl:text-base text-sm">{t("description")}</p>
                </div>
                <Image src="/brand/pages/home/section2/transport.png" alt="truck" width={3072} height={1260} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-[14%] -right-[22%] flex items-end justify-end max-sm:hidden" id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className="max-w-[25%] max-h-[25%] scale-x-[-1]" />
            </div>
        </div>
    );
});
Card2.displayName = "Card2";

const Card3 = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const t = useTranslations("home.section2.card3");
    return (
        <div ref={ref} {...props} className="relative h-fit flex justify-end">
            <div className=" text-white md:max-w-[80%] bg-main-ukraineBlue overflow-hidden rounded-4xl opacity-0" id="card-content">
                <div className="xl:px-12 lg:px-6 md:px-4 px-4 xl:pt-10 lg:pt-6 md:pt-4 pt-4">
                    <h3 className="font-medium text-2xl md:text-xl xl:leading-7 leading-6">{t("title")}</h3>
                    <p className="xl:text-base text-sm">{t("description")}</p>
                </div>
                <div className="pl-10">
                    <Image src="/brand/pages/home/section2/happens.png" alt="truck" width={3072} height={1260} className="w-full h-auto" />
                </div>
            </div>
            <div className="absolute -bottom-[25%] -right-[13%] flex items-end justify-end max-sm:hidden" id="link">
                <Image src="/brand/pages/home/section2/link.png" alt="truck" width={1000} height={1000} className="max-w-[15%] max-h-[15%] scale-x-[-1]" />
            </div>
        </div>
    );
});
Card3.displayName = "Card3";

export default Section2;