import { Button } from "../ui/button";

type Props = {};

function Banner({}: Props) {
    return (
        <div className="bg-[url('./img_banner.jpg')] bg-cover bg-center bg-no-repeat relative w-full pt-[100px] pb-[100px] px-0">
            {/* <div className="absolute w-full h-full bg-transparent bg-[linear-gradient(180deg,#1D1D1D_0%,#1D1D1D7A_100%)] opacity-[0.45] left-0 top-0"></div> */}

            <div className="relative text-center text-white z-[1]">
                <h1 className="capitalize font-bold text-[50px]">Welcome To Education</h1>
                <p className="text-base mb-[18px] font-normal mt-3 max-w-[800px] mx-auto">
                    Education Classroom helps educators create engaging learning experiences they can personalize,
                    manage, and measure. Part of Education Workspace for Education, it empowers educators to enhance
                    their impact and prepare students for the future.
                </p>
                <Button variant="outline" className="text-primary">
                    Getstarted
                </Button>
            </div>
        </div>
    );
}

export default Banner;
