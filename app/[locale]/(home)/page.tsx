import HomeClient from "@/shared/components/pages/home/home-client";
import clsx from "clsx";

const Home = () => {
    return (
        <main className={clsx("bg-main-codGray overflow-hidden")}>
            <HomeClient />
        </main>
    )
}


export default Home;