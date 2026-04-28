"use client";

import NavbarLarge from "./navbar-large";
import NavbarSmall from "./navbar-small";

const Navbar = ({ scrollTriggerRef }: { scrollTriggerRef?: React.RefObject<HTMLDivElement | null> } = {}) => {
    return (
        <>
            <div className="hidden lg:block">
                <NavbarLarge scrollTriggerRef={scrollTriggerRef} />
            </div>
            <div className="block lg:hidden">
                <NavbarSmall scrollTriggerRef={scrollTriggerRef} />
            </div>
        </>
    );
}

export default Navbar;