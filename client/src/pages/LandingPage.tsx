import { Banner } from "@src/components/Banner";
import Content from "@src/components/Content/Content";
import Footer from "@src/components/Footer/Footer";
import Header from "@src/components/Header/Header.landing";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Content />
            <Footer />
        </div>
    );
};

export default LandingPage;
