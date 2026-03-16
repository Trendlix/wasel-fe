"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import clsx from "clsx";
import { LanguageSwitcher, navLinks } from "./navbar-large";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import ThemeSwitcher from "../common/layout/theme-switcher";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import useNavbarStore from "@/shared/hooks/store/layout/useNavbr";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuIcon from "@/shared/assets/icons/menu";
import { useHeroMountReady } from "@/shared/components/pages/home/home-client";

gsap.registerPlugin(ScrollTrigger);

const NavbarSmall = ({ scrollTriggerRef }: { scrollTriggerRef?: React.RefObject<HTMLDivElement | null> } = {}) => {
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const heroMountReady = useHeroMountReady();
    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const isRtl = dir === "rtl";
    const t = useTranslations("nav");
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname?.endsWith("/");
    const isAboutPage = pathname === "/about" || pathname?.endsWith("/about");
    const isNotHomeOrAboutPage = !isHomePage && !isAboutPage;
    const { colors, setColors, setAboutScrolled } = useNavbarStore();
    const { bg: bgClass } = colors;
    const aboutBaseColors = {
        text: { active: "text-black dark:text-white", inactive: "text-black/54 hover:text-black dark:text-white/54 dark:hover:text-white" },
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

    useGSAP(() => {
        if (!navRef.current) return;
        if (!heroMountReady) {
            gsap.set(navRef.current, { y: "-100%", opacity: 0 });
            return;
        }
        gsap.set(navRef.current, { y: "-100%", opacity: 0 });
        gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)"
        });
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

    useEffect(() => {
        const panel = menuPanelRef.current;
        if (!panel) return;
        const xFrom = isRtl ? "100%" : "-100%";
        if (menuOpen) {
            gsap.fromTo(panel, { x: xFrom }, { x: 0, duration: 0.35, ease: "power3.out" });
        } else {
            gsap.set(panel, { x: xFrom });
        }
    }, [menuOpen, isRtl]);

    const closeMenu = () => {
        if (!menuOpen) return;
        const panel = menuPanelRef.current;
        if (!panel) return;
        const xTo = isRtl ? "100%" : "-100%";
        gsap.to(panel, {
            x: xTo,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => setMenuOpen(false),
        });
    };

    const openMenu = () => setMenuOpen(true);

    useEffect(() => {
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const menuOverlay = (
        <div
            className={clsx(
                "fixed inset-0 top-[72px] z-[1500] flex",
                "transition-opacity duration-300",
                menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}
            aria-hidden={!menuOpen}
        >
            <div
                className="absolute inset-0 bg-black/30"
                onClick={closeMenu}
                aria-hidden
            />
            <div
                ref={menuPanelRef}
                className={clsx(
                    "relative w-full h-full",
                    "bg-white dark:bg-main-codGray backdrop-blur-sm",
                    "overflow-auto"
                )}
            >
                <NavbarSmallMenu onLinkClick={closeMenu} />
            </div>
        </div>
    );

    return (
        <>
            <div
                ref={navRef}
                className={clsx(
                    "fixed top-0 left-0 right-0 w-full z-[2000]",
                    navbarBgClass
                )}
            >
                <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between py-4 px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => (menuOpen ? closeMenu() : openMenu())}
                            className="p-1.5 -m-1.5 rounded-lg dark:text-white text-black hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                        <Link href="/" className="shrink-0" onClick={() => menuOpen && closeMenu()}>
                            <Image src="/brand/logo.png" alt="Wasel" width={100} height={100} className="max-w-[75px] max-h-[75px] object-contain" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button className={clsx("bg-main-ukraineBlue text-white border-none max-h-[31px] flex items-center justify-center text-sm font-medium px-4")}>
                            {t("downloadApp")}
                        </Button>
                    </div>
                </div>
            </div>
            {mounted && createPortal(menuOverlay, document.body)}
        </>
    );
};

const NavbarSmallMenu = ({ onLinkClick }: { onLinkClick?: () => void }) => {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname?.endsWith("/");
    const isAboutPage = pathname === "/about" || pathname?.endsWith("/about");
    const isNotHomeOrAboutPage = !isHomePage && !isAboutPage;

    const themeBasedActive = "dark:text-white text-black";
    const themeBasedInactive = "dark:text-white/54 text-black/54 hover:text-black dark:hover:text-white";
    const activeClass = isNotHomeOrAboutPage ? themeBasedActive : "dark:text-white text-black";
    const inactiveClass = isNotHomeOrAboutPage ? themeBasedInactive : "dark:text-white/54 text-black/54";

    const t = useTranslations("nav");

    return (
        <nav className="flex flex-col h-full overflow-auto px-6 py-6 w-full">
            <div className="flex flex-col gap-1">
                {navLinks.map(({ href, labelKey }) => {
                    const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onLinkClick}
                            className={clsx(
                                isActive ? activeClass : inactiveClass,
                                "font-medium transition-colors py-3 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-lg"
                            )}
                        >
                            {t(labelKey)}
                        </Link>
                    );
                })}
            </div>

            <div className={clsx("mt-auto pt-6 border-t dark:border-white/10 border-black/10 space-y-4", isHomePage && "flex items-center justify-between *:first:flex-1 gap-4")}>
                <Link href="/contact" onClick={onLinkClick}>
                    <Button className={clsx("w-full bg-main-ukraineBlue text-white border-none max-h-[50px] flex items-center justify-center font-medium")}>
                        {t("contact")}
                    </Button>
                </Link>
                {isHomePage && <div className="h-full flex items-center justify-center *:text-base"><LanguageSwitcher inactiveClass={inactiveClass} activeClass={activeClass} /></div>}
                {!isHomePage &&
                    <div className="flex items-center gap-4 justify-between py-2">
                        <ThemeSwitcher activeClass={activeClass} className="w-6 h-6" />
                        <LanguageSwitcher inactiveClass={inactiveClass} activeClass={activeClass} />
                    </div>
                }
            </div>
        </nav>
    );
};

export default NavbarSmall;