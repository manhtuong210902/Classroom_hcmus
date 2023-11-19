import { Banner } from "@src/pages/Landing/components/Banner";
import Content from "@src/pages/Landing/components/Content/Content";
import Footer from "@src/pages/Landing/components/Footer/Footer";
import Header from "./components/Header/Header";

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
