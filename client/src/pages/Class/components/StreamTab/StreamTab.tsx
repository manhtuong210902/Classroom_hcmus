import Banner from "./Banner";
import Content from "./Content";

const StreamTab = () => {
    return (
        <div className="flex flex-col items-center gap-3 w-full md:px-0 md:max-w-[1000px] md:mx-auto mt-3">
            <Banner />
            <Content />
        </div>
    );
};

export default StreamTab;
