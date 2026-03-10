"use client";

import clsx from "clsx";
import { useState } from "react";
import BrandBanner from "../../common/pages/brand-banner";
import FAQ from "../../common/pages/faq";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import Track from "./track";

const OrderTrackingClient = () => {
    const [heroLayoutReady, setHeroLayoutReady] = useState(false);

    return (
        <div className={clsx("dark:bg-main-codGray bg-white", "overflow-hidden", "relative")}>
            <Navbar />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <Track />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="dark:bg-main-codGray bg-white" />
            <FAQ heroLayoutReady={heroLayoutReady} className="dark:bg-main-codGray bg-white" />
            <Footer heroLayoutReady={heroLayoutReady} className="dark:bg-main-codGray bg-white" />
        </div>
    );
};

export default OrderTrackingClient;
