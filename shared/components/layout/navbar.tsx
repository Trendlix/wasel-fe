"use client";

import { useEffect, useState } from "react";
import NavbarLarge from "./navbar-large";
import NavbarSmall from "./navbar-small";

const Navbar = ({ scrollTriggerRef }: { scrollTriggerRef?: React.RefObject<HTMLDivElement | null> } = {}) => {
    const [isLarge, setIsLarge] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const update = () => {
            setIsMounted(true);
            setIsLarge(window.innerWidth >= 1024);
        };
        const id = requestAnimationFrame(update);
        window.addEventListener("resize", update);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", update);
        };
    }, []);
    if (!isMounted) return null;
    return (
        <div>
            {isLarge ? <NavbarLarge scrollTriggerRef={scrollTriggerRef} /> : <NavbarSmall scrollTriggerRef={scrollTriggerRef} />}
        </div>
    );
}

export default Navbar;