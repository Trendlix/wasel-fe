"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useHeroMountReady } from "@/shared/components/pages/home/home-client";
import { Button } from "../ui/button";
import clsx from "clsx";
import ThemeSwitcher from "../common/layout/theme-switcher";
import useNavbarStore from "@/shared/hooks/store/layout/useNavbr";
import { useTheme } from "next-themes";

export const navLinks = [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/services", labelKey: "services" },
    { href: "/contact", labelKey: "contact" },
    { href: "/blogs", labelKey: "blogs" },
    { href: "/order-tracking", labelKey: "orderTracking" },
] as const;

const NavbarLarge = ({ scrollTriggerRef }: { scrollTriggerRef?: React.RefObject<HTMLDivElement | null> } = {}) => {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const heroMountReady = useHeroMountReady();
    const isHomePage = pathname === "/" || pathname?.endsWith("/");
    const isAboutPage = pathname === "/about" || pathname?.endsWith("/about");
    const isNotHomeOrAboutPage = !isHomePage && !isAboutPage;

    const navRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const { colors, setColors, aboutScrolled, setAboutScrolled } = useNavbarStore();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { text: { active: textActiveClass, inactive: textInactiveClass }, bg: bgClass } = colors;

    const themeBasedActive = "dark:text-white text-black";
    const themeBasedInactive = "dark:text-white/54 text-black/54 hover:text-black dark:hover:text-white";
    const activeClass = isNotHomeOrAboutPage ? themeBasedActive : textActiveClass;
    const inactiveClass = isNotHomeOrAboutPage ? themeBasedInactive : textInactiveClass;
    const aboutBaseColors = {
        text: { active: "text-white", inactive: "text-white/54 hover:text-white" },
        bg: "bg-transparent",
    };
    const scrolledColors = {
        text: { active: "text-black dark:text-white", inactive: "text-main-zenGray hover:text-black dark:hover:text-white" },
        bg: "bg-white/95 dark:bg-main-codGray/95 backdrop-blur-sm",
    };
    const defaultBaseColors = {
        text: { active: "text-white", inactive: "text-white/54 hover:text-white" },
        bg: "bg-transparent",
    };

    const navbarBgClass = isNotHomeOrAboutPage
        ? "bg-white/95 dark:bg-main-codGray/95 backdrop-blur-sm"
        : bgClass;
    const logoSrc = isAboutPage && mounted && resolvedTheme === "light" && aboutScrolled
        ? "/brand/logo-light.png"
        : "/brand/logo.png";

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        if (!navRef.current) return;
        if (!heroMountReady) {
            gsap.set(navRef.current, { y: "-100%", opacity: 0 });
            return;
        }
        gsap.fromTo(
            navRef.current,
            { y: "-100%", opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: "back.out(1.7)" }
        );
        if (isAboutPage) {
            setAboutScrolled(false);
            setColors(aboutBaseColors);
        }

        const triggerEl = scrollTriggerRef?.current;
        if (triggerEl) {
            const st = ScrollTrigger.create({
                trigger: triggerEl,
                start: "top top",
                onEnter: () => {
                    setAboutScrolled(true);
                    setColors(scrolledColors);
                },
                onLeaveBack: () => {
                    setAboutScrolled(false);
                    setColors(isAboutPage ? aboutBaseColors : defaultBaseColors);
                },
            });
            return () => {
                st.kill();
                setAboutScrolled(false);
                setColors(isAboutPage ? aboutBaseColors : defaultBaseColors);
            };
        }
    }, { scope: navRef, dependencies: [heroMountReady, scrollTriggerRef, isAboutPage] });

    return (
        <div ref={navRef} className={clsx("fixed top-0 z-1000 w-full -translate-y-full", navbarBgClass)}>
            <nav className="max-w-[90%] xl:max-w-[85%] mx-auto flex items-center justify-between py-4">
                <div className="flex items-center xl:gap-6 2xl:gap-9 lg:gap-5 gap-3">
                    <Link href="/">
                        <Image src={logoSrc} alt="logo" width={100} height={100} className="max-w-[75px] max-h-[75px]" />
                    </Link>
                    <div className="hidden md:flex items-center gap-6" dir={dir}>
                        {navLinks.map(({ href, labelKey }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={clsx(isActive ? activeClass : inactiveClass, "font-medium transition-colors xl:text-sm text-xs text-nowrap")}
                                >
                                    {t(labelKey)}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 *:flex *:items-center *:justify-center">
                        <Button
                            variant="secondary"
                            className={clsx(
                                "whitespace-nowrap min-w-0 shrink font-medium border transition-colors",
                                "2xl:text-sm xl:text-xs md:text-[10px] 2xl:max-h-[45px] xl:max-h-[40px] md:max-h-[30px]",
                                isAboutPage
                                    ? aboutScrolled
                                        ? "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                                        : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
                                    : isHomePage
                                        ? "bg-transparent"
                                        : "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                            )}
                        >
                            <span className="hidden sm:inline">{t("companiesAdvertisers")}</span>
                            <span className="sm:hidden">{t("companies")}</span>
                        </Button>
                        <Button
                            variant="primary"
                            className={clsx("bg-main-ukraineBlue border-main-ukraineBlue hover:bg-transparent hover:text-white text-white whitespace-nowrap min-w-0 shrink font-medium", "2xl:text-sm xl:text-xs md:text-[10px] 2xl:max-h-[45px] xl:max-h-[40px] md:max-h-[30px]", isHomePage ? "hover:bg-white hover:text-main-ukraineBlue" : "hover:bg-white hover:text-main-ukraineBlue")}
                        >
                            <span className="hidden sm:inline">{t("downloadApp")}</span>
                            <span className="sm:hidden">{t("download")}</span>
                        </Button>
                    </div>
                    {!isHomePage && <ThemeSwitcher activeClass={activeClass} />}
                    <LanguageSwitcher inactiveClass={inactiveClass} activeClass={activeClass} />
                </div>
            </nav>
        </div>
    );
};

export const LanguageSwitcher = ({ inactiveClass, activeClass }: { inactiveClass?: string; activeClass?: string }) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const defaultInactive = "text-main-zenGray hover:text-white";
    const defaultActive = "text-white";

    return (
        <div className="flex items-center gap-1 text-xs">
            <button
                onClick={() => router.replace(pathname || "/", { locale: "en" })}
                className={clsx("transition-colors", locale === "en" ? (activeClass ?? defaultActive) : (inactiveClass ?? defaultInactive))}
            >
                EN
            </button>
            <button
                onClick={() => router.replace(pathname || "/", { locale: "ar" })}
                className={clsx("transition-colors", locale === "ar" ? (activeClass ?? defaultActive) : (inactiveClass ?? defaultInactive))}
            >
                العربيه
            </button>
        </div>
    );
};

export default NavbarLarge;