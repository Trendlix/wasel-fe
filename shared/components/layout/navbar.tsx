"use client";

import NavbarLarge from "./navbar-large";
import NavbarSmall from "./navbar-small";

const Navbar = ({ scrollTriggerRef, hideLanguageSwitcher }: { scrollTriggerRef?: React.RefObject<HTMLDivElement | null>; hideLanguageSwitcher?: boolean } = {}) => {
    return (
        <>
            <div className="hidden lg:block">
                <NavbarLarge scrollTriggerRef={scrollTriggerRef} hideLanguageSwitcher={hideLanguageSwitcher} />
            </div>
            <div className="block lg:hidden">
                <NavbarSmall scrollTriggerRef={scrollTriggerRef} hideLanguageSwitcher={hideLanguageSwitcher} />
            </div>
        </>
    );
}

export default Navbar;