import localFont from "next/font/local";
import { Alexandria, Plus_Jakarta_Sans } from "next/font/google";

/** Arabic UI: [Alexandria](https://fonts.google.com/specimen/Alexandria) — scoped via `locale-ar` in `[locale]/layout`. */
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const rocGrotesk = localFont({
  src: [
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Thin.otf", weight: "100" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk ExtraLight.otf", weight: "200" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Light.otf", weight: "300" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Regular.otf", weight: "400" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Medium.otf", weight: "500" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Bold.otf", weight: "700" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk ExtraBold.otf", weight: "800" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Black.otf", weight: "900" },
  ],
  variable: "--font-roc-main",
});

export const rocGroteskCond = localFont({
  src: [
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Condensed.otf", weight: "400" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Condensed Bold.otf", weight: "700" },
  ],
  variable: "--font-roc-cond",
});

export const rocGroteskWide = localFont({
  src: [
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Wide.otf", weight: "400" },
    { path: "../public/fonts/rock2/Kostic - Roc Grotesk Wide Bold.otf", weight: "700" },
  ],
  variable: "--font-roc-wide",
});
