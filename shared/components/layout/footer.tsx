"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { footerLinks } from "@/shared/constants/footer-links";
import { AppStoreButton, GooglePlayButton } from "../common";
import { FacebookIcon, Globe, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FooterProps = { heroLayoutReady?: boolean, className?: string };

const Footer = ({ heroLayoutReady = false, className }: FooterProps) => {
    const scopeRef = useRef<HTMLDivElement>(null);
    const elementsRefs = useRef<Array<HTMLDivElement | null>>([]);

    useGSAP(() => {
        if (!heroLayoutReady || !scopeRef.current || !elementsRefs.current[0] || !elementsRefs.current[1] || !elementsRefs.current[2]) return;

        gsap.set(elementsRefs.current, { autoAlpha: 0, y: 80 });

        const startEnter = "top bottom-=100";

        const fadeUp = (el: HTMLDivElement) => gsap.to(el, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });

        [0, 1].forEach((i) => {
            const el = elementsRefs.current[i];
            if (!el) return;
            const st = ScrollTrigger.create({
                trigger: el,
                start: startEnter,
                onEnter: () => fadeUp(el),
                onEnterBack: () => fadeUp(el),
            });
            if (st.isActive) fadeUp(el);
        });

        const copyrightEl = elementsRefs.current[2];
        if (copyrightEl) {
            const st = ScrollTrigger.create({
                trigger: scopeRef.current,
                start: "top bottom-=200",
                onEnter: () => fadeUp(copyrightEl),
            });
            if (st.isActive) fadeUp(copyrightEl);
        }
    }, { scope: scopeRef, dependencies: [heroLayoutReady] });

    return (
        <footer ref={scopeRef} className={clsx("pb-5 bg-black", className)}>
            <div className={clsx("space-y-10 container font-medium")}>
                {/* logo */}
                <div ref={(el) => { elementsRefs.current[0] = el; }}>
                    <Logo />
                </div>
                {/* links */}
                <div ref={(el) => { elementsRefs.current[1] = el; }}>
                    <Links />
                </div>
                {/* copyright */}
                <div ref={(el) => { elementsRefs.current[2] = el; }}>
                    <Copyright />
                </div>
            </div>
        </footer>
    );
};

const Logo = () => {
    return (
        <div>
            <Image src="/brand/logo.png" alt="logo" width={100} height={100} />
        </div>
    );
};

const Links = () => {
    const t = useTranslations("footer");
    return (
        <div className="flex items-start justify-between flex-wrap gap-x-12 gap-y-8 capitalize">
            {footerLinks.map((section) => (
                <div key={section.titleKey} className="space-y-3.5">
                    <p className={clsx("font-medium text-xs leading-5 text-main-secondary")}>{t(section.titleKey)}</p>
                    <ul className={clsx("space-y-1.5 text-main-carbonBlue")}>
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.titleKey} className="flex items-center gap-1">
                                    <Link href={item.href}>{t(item.titleKey)}</Link>
                                    {Icon && <Icon className="size-4 shrink-0" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            {/* ship card */}
            <div className="space-y-3.5">
                <p className={clsx("font-medium text-xs leading-5 text-main-secondary")}>{t("shipYourCargo")}</p>
                <div className="flex items-center justify-between gap-x-3">
                    <AppStoreButton />
                    <GooglePlayButton />
                </div>
            </div>
        </div>
    );
};

const socialLinks = [
    { href: "#", icon: FacebookIcon, label: "Facebook" },
    { href: "#", icon: Globe, label: "Website" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
] as const;

const Copyright = () => {
    const t = useTranslations("footer");
    return (
        <div className="border-t border-main-darkGrey pt-4 text-[11px] text-main-darkGrey">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm  font-medium ">
                    {t("copyright", { year: new Date().getFullYear() })}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Link href="#" className="hover:underline">
                            {t("terms")}
                        </Link>
                        <span aria-hidden>·</span>
                        <Link href="#" className="hover:underline">
                            {t("privacy")}
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="rounded p-1.5 transition-opacity hover:opacity-80"
                            >
                                <Icon className="size-4" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;