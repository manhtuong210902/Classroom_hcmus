import { ArrowDown, Clock2Icon, Terminal, Tv2Icon, User2Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion";
import LearningAmicoSVG from "@image/svg_learning_amico.svg";
import DesignerSVG from "@image/svg_designer.svg";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { useTranslation } from "react-i18next";

const Content = () => {
    const { t } = useTranslation();
    const contentFeatures = [
        {
            id: 1,
            title: t("section_content_1.feature_1"),
            icon: <Tv2Icon />,
        },

        {
            id: 2,
            title: t("section_content_1.feature_2"),
            icon: <Clock2Icon />,
        },

        {
            id: 3,
            title: t("section_content_1.feature_3"),
            icon: <User2Icon />,
        },
    ];

    return (
        <div>
            <section className="bg-accent">
                <div className="max-w-[1200px] mx-auto text-center py-28">
                    <div className="w-full px-3 md:px-0 md:max-w-[800px] mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">{t("section_content_1.title")}</h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            {t("section_content_1.description")}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center px-3 md:px-0 justify-between gap-5 mt-8">
                        {contentFeatures.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="rounded-md flex-1 w-full md:w-fit border border-primary flex flex-col items-center gap-6 p-6 group cursor-pointer hover:bg-primary/90 text-primary hover:text-secondary"
                                >
                                    {item.icon}
                                    <p className="text-sm md:text-base font-medium">{item.title}</p>
                                    <ArrowDown />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="persionalize" className="bg-white">
                <div className="max-w-[1200px] mx-auto text-center py-28">
                    <div className="w-full px-3 md:px-0 md:max-w-[800px] mx-auto">
                        <div className="flex justify-center w-full mb-4">
                            <Tv2Icon className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">{t("section_content_2.title")}</h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            {t("section_content_2.description")}
                        </p>
                    </div>

                    <div className="flex mt-10 justify-between gap-20">
                        <div className="flex-1">
                            <h1 className="text-center md:text-left text-2xl font-semibold mb-4">
                                <span className="text-lime-700">{t("section_content_2.sologan_1")}</span>{" "}
                                {t("section_content_2.sologan_2")} <br /> {t("section_content_2.sologan_3")}
                            </h1>
                            <Accordion type="single" collapsible className="w-full px-3 md:px-0">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        {t("section_content_2.feature_1.title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        {t("section_content_2.feature_1.description")}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        {t("section_content_2.feature_2.title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        {t("section_content_2.feature_2.description")}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        {t("section_content_2.feature_3.title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        {t("section_content_2.feature_3.description")}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        <div className="w-[400px] hidden md:block">
                            <img src={LearningAmicoSVG} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="persionalize" className="bg-accent">
                <div className="max-w-[1200px] mx-auto text-center py-28">
                    <div className="w-full px-3 md:px-0 md:max-w-[800px] mx-auto">
                        <div className="flex justify-center w-full mb-4">
                            <Clock2Icon className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">{t("section_content_3.title")}</h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            {t("section_content_3.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 mt-10 text-left gap-10 px-3 md:px-0">
                        <h1 className="col-span-3 text-center md:text-left text-2xl font-semibold mb-4">
                            <span className="text-lime-700">{t("section_content_3.sologan_1")}</span>{" "}
                            {t("section_content_3.sologan_2")}
                        </h1>
                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">
                                {t("section_content_3.feature_1.title")}
                            </h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                {t("section_content_3.feature_1.description")}
                            </p>
                        </div>

                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">
                                {t("section_content_3.feature_2.title")}
                            </h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                {t("section_content_3.feature_2.description")}
                            </p>
                        </div>

                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">
                                {t("section_content_3.feature_3.title")}
                            </h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                {t("section_content_3.feature_3.description")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="persionalize" className="bg-white">
                <div className="max-w-[1200px] mx-auto text-center py-28">
                    <div className="w-full px-3 md:px-0 md:max-w-[800px] mx-auto">
                        <div className="flex justify-center w-full mb-4">
                            <User2Icon className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">{t("section_content_4.title")}</h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            {t("section_content_4.description")}
                        </p>
                    </div>

                    <div className="flex mt-10 justify-between gap-20 px-3 md:px-0">
                        <div className="w-[400px] hidden md:block">
                            <img src={DesignerSVG} alt="" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-center md:text-left text-2xl font-semibold mb-4">
                                <span className="text-lime-700">{t("section_content_4.sologan_1")}</span>{" "}
                                {t("section_content_4.sologan_2")}
                                <br /> {t("section_content_4.sologan_3")}
                            </h1>

                            <div className="flex flex-col gap-3 text-left">
                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        {t("section_content_4.feature_1.title")}
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        {t("section_content_4.feature_1.description")}
                                    </AlertDescription>
                                </Alert>

                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        {t("section_content_4.feature_2.title")}
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        {t("section_content_4.feature_2.description")}
                                    </AlertDescription>
                                </Alert>

                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        {t("section_content_4.feature_3.title")}
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        {t("section_content_4.feature_3.description")}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Content;
