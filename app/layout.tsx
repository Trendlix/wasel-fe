import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/common/theme-provider";
import { ScrollSpeedController } from "@/shared/components/common/scroll-speed";
import { plusJakartaSans, rocGrotesk, rocGroteskCond, rocGroteskWide } from "./fonts";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Wasel",
  description: "Wasel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${rocGrotesk.variable} ${rocGroteskCond.variable} ${rocGroteskWide.variable} ${plusJakartaSans.variable} ${locale === "ar" ? "font-size-ar" : "font-size-en"}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollSpeedController />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
