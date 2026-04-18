import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import PolicySection from "./policy-section";


const PolicyClient = () => {

    return (<div className="bg-white dark:bg-main-codGray">
        <Navbar />
        <Hero />
        <PolicySection />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>)
}

export default PolicyClient;