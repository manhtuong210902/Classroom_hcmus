import { ArrowDown, Clock2Icon, Terminal, Tv2Icon, User2Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion";
import LearningAmicoSVG from "@image/svg_learning_amico.svg";
import DesignerSVG from "@image/svg_designer.svg";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";

const Content = () => {
    const contentFeatures = [
        {
            id: 1,
            title: "Personalize learning",
            icon: <Tv2Icon />,
        },

        {
            id: 2,
            title: "Simplify everyday tasks",
            icon: <Clock2Icon />,
        },

        {
            id: 3,
            title: "Gain insights and visibility",
            icon: <User2Icon />,
        },
    ];

    return (
        <div>
            <section className="bg-accent">
                <div className="max-w-[1200px] mx-auto text-center py-28">
                    <div className="w-full px-3 md:px-0 md:max-w-[800px] mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">
                            150M people worldwide use Education Classroom
                        </h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            Education Classroom is designed with feedback from the educational community, influencing
                            the development of new features that let educators focus on teaching and students focus on
                            learning.
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
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">Enrich and personalize learning</h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            Drive student agency with tools that meet students where they are – and build skills for
                            their future.
                        </p>
                    </div>

                    <div className="flex mt-10 justify-between gap-20">
                        <div className="flex-1">
                            <h1 className="text-center md:text-left text-2xl font-semibold mb-4">
                                <span className="text-lime-700">Premium features</span> that inspire new ways of <br />{" "}
                                teaching and learning
                            </h1>
                            <Accordion type="single" collapsible className="w-full px-3 md:px-0">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        Inform instruction with data-driven insights
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        Classroom analytics provide educators with insights and visibility into how
                                        students turn in, perform on, and engage with assignments, so educators can make
                                        informed decisions about the best way to provide support.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        Streamline lesson planning
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        Create a link to your class, then share it with peers in your organization, so
                                        they can easily preview, select, and import high-quality classwork into their
                                        classes.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-left text-xl font-semibold">
                                        Support originality with plagiarism detection
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left text-muted-foreground text-sm md:text-base">
                                        Help students integrate citations and avoid unintentional plagiarism with
                                        unlimited originality reports and a school-owned repository of past work.
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
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">
                            Amplify instruction with tools that simplify everyday tasks
                        </h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            Boost instructional time with tools purpose-built for teaching, productivity, and
                            collaboration
                        </p>
                    </div>

                    <div className="grid grid-cols-3 mt-10 text-left gap-10 px-3 md:px-0">
                        <h1 className="col-span-3 text-center md:text-left text-2xl font-semibold mb-4">
                            <span className="text-lime-700">Premium features</span> that elevate teaching
                        </h1>
                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">
                                Inform instruction with data-driven insights
                            </h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                Classroom analytics provide educators with insights and visibility into how students
                                turn in, perform on, and engage with assignments, so educators can make informed
                                decisions about the best way to provide support.
                            </p>
                        </div>

                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">Streamline lesson planning</h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                Create a link to your class, then share it with peers in your organization, so they can
                                easily preview, select, and import high-quality classwork into their classes.
                            </p>
                        </div>

                        <div className="col-span-3 md:col-span-1">
                            <h2 className="text-xl text-primary font-semibold">
                                Support originality with plagiarism detection
                            </h2>
                            <p className="md:text-base text-sm text-muted-foreground">
                                Help students integrate citations and avoid unintentional plagiarism with unlimited
                                originality reports and a school-owned repository of past work.
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
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">
                            Operate with solutions designed to gain visibility, insights, and control
                        </h2>
                        <p className="text-sm md:text-base font-medium text-muted-foreground mt-6">
                            Create learning environments that are easier to manage and support educators and students
                            with connected, safer tools.
                        </p>
                    </div>

                    <div className="flex mt-10 justify-between gap-20 px-3 md:px-0">
                        <div className="w-[400px] hidden md:block">
                            <img src={DesignerSVG} alt="" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-center md:text-left text-2xl font-semibold mb-4">
                                <span className="text-lime-700">Premium features</span> to support your organization and
                                <br /> foster stronger learning outcomes
                            </h1>

                            <div className="flex flex-col gap-3 text-left">
                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        Make data-driven decisions
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        Gain visibility into everything from class performance to individual student
                                        assignment completion with Classroom analytics (coming soon)
                                    </AlertDescription>
                                </Alert>

                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        Distribute high-quality class templates to educators
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        Easily share high-quality class templates so educators in your organization can
                                        preview and import classwork into their own classes.
                                    </AlertDescription>
                                </Alert>

                                <Alert>
                                    <Terminal className="h-6 w-6" />
                                    <AlertTitle className="text-lg font-semibold">
                                        Virtually visit classes to support teachers and students
                                    </AlertTitle>
                                    <AlertDescription className="md:text-base text-sm text-muted-foreground">
                                        Designated education leaders and staff can temporarily access classes to support
                                        educators, manage substitute teachers, see information for guardian
                                        conversations, and more.
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
