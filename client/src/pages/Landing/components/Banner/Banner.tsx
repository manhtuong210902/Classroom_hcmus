import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/button";

type Props = {};

function Banner({}: Props) {
    const { t } = useTranslation();
    return (
        <div className="bg-primary relative w-full pt-[100px] pb-[100px] px-3 md:px-0">
            {/* <div className="absolute w-full h-full bg-transparent bg-[linear-gradient(180deg,#1D1D1D_0%,#1D1D1D7A_100%)] opacity-[0.45] left-0 top-0"></div> */}

            <div className="relative text-center text-white z-[1]">
                <h1 className="capitalize font-bold text-[35px] md:text-[50px]">{t("banner.title")}</h1>
                <p className="text-sm md:text-base mb-[18px] font-normal mt-3 max-w-[800px] mx-auto">
                    {t("banner.description")}
                </p>
                <Button variant="outline" className="text-primary">
                    {t("banner.button")}
                </Button>
            </div>
        </div>
    );
}

export default Banner;
