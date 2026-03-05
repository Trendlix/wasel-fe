import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/common/theme-provider";
import { ScrollSpeedController } from "@/shared/components/common/scroll-speed";
import { rocGrotesk, rocGroteskCond, rocGroteskWide } from "./fonts";

export const metadata: Metadata = {
  title: "Wasel",
  description: "Wasel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rocGrotesk.variable} ${rocGroteskCond.variable} ${rocGroteskWide.variable}`}
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