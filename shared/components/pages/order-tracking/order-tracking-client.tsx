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
        <div className={clsx("bg-main-codGray", "overflow-hidden", "relative")}>
            <Navbar />
            <Hero onLayoutReady={() => setHeroLayoutReady(true)} />
            <Track />
            <BrandBanner heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
            <FAQ heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
            <Footer heroLayoutReady={heroLayoutReady} className="bg-main-codGray" />
        </div>
    );
};

export default OrderTrackingClient;
