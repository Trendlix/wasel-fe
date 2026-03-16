import clsx from "clsx";

const MenuIcon = ({ className }: { className?: string }) => {
    return (
        <svg className={clsx("text-current", className)} width="25" height="40" viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.0976562" y="25.6675" width="16.8651" height="2.66667" rx="1.33333" fill="currentColor" />
            <rect x="0.0976562" y="17.9998" width="23.6111" height="2.66667" rx="1.33333" fill="currentColor" />
            <rect x="0.0976562" y="10.3331" width="16.8651" height="2.66667" rx="1.33333" fill="currentColor" />
        </svg>
    );
};

export default MenuIcon;