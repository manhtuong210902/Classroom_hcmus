import { FacebookIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full bg-primary text-white">
            <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-5 py-10 px-5 md:px-0">
                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold">{t("footer.products.title")}</h3>
                    <p className="text-sm cursor-pointer hover:underline">Classroom</p>
                    <p className="text-sm cursor-pointer hover:underline">Education meet</p>
                    <p className="text-sm cursor-pointer hover:underline">Assignments</p>
                    <p className="text-sm cursor-pointer hover:underline">Chromebooks</p>
                </div>

                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold">{t("footer.our_team.title")}</h3>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.our_team.member_1")}</p>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.our_team.member_2")}</p>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.our_team.member_3")}</p>
                </div>

                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold">{t("footer.about.title")}</h3>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.about.link_1")}</p>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.about.link_2")}</p>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.about.link_3")}</p>
                    <p className="text-sm cursor-pointer hover:underline">{t("footer.about.link_4")}</p>
                </div>

                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold">{t("footer.social.title")}</h3>
                    <div className="flex gap-2 items-center">
                        <TwitterIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Twitter</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FacebookIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Facebook</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LinkedinIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">LinkedIn</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <GithubIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Github</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
