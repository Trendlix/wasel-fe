import type { Metadata } from "next";
import HomeClient from "@/shared/components/pages/home/home-client";
import HomeThemeLock from "@/shared/components/pages/home/home-theme-lock";
import clsx from "clsx";

export const metadata: Metadata = {
    title: "Wasel | Smart Cargo Delivery",
    description: "Wasel helps you move cargo faster with smart pricing, trusted drivers, and real-time delivery tracking.",
};

const Home = () => {
    return (
        <main className={clsx("bg-main-codGray overflow-hidden")}>
            <HomeThemeLock />
            <HomeClient />
        </main>
    )
}


export default Home;