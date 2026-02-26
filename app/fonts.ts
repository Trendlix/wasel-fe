import localFont from "next/font/local";

export const rocGrotesk = localFont({
    src: [
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-thin.otf", weight: "100" },
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-light.otf", weight: "300" },
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-regular.otf", weight: "400" },
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-medium.otf", weight: "500" },
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-bold.otf", weight: "700" },
        { path: "../public/fonts/rock/Fontspring-DEMO-rocgrotesk-black.otf", weight: "900" },
    ],
    variable: "--font-roc-main",
});

export const rocGroteskCond = localFont({
    src: [{ path: "../public/fonts/rock/Fontspring-DEMO-rocgroteskcond-bold.otf", weight: "700" }],
    variable: "--font-roc-cond",
});

export const rocGroteskWide = localFont({
    src: [{ path: "../public/fonts/rock/Fontspring-DEMO-rocgroteskwide-bold.otf", weight: "700" }],
    variable: "--font-roc-wide",
});