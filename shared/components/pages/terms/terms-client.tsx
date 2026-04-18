import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Hero from "./hero";
import TermsSection from "./terms-section";


const TermsClient = () => {

    return (<div className="bg-white dark:bg-main-codGray">
        <Navbar />
        <Hero />
        <TermsSection />
        <Footer className="bg-white dark:bg-main-codGray" />
    </div>)
}

export default TermsClient;