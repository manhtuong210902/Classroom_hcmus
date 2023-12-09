import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import ClassworkTab from "./components/ClassworkTab";
import StreamTab from "./components/StreamTab/StreamTab";
import PeopleTab from "./components/PeopleTab/PeopleTab";

const ClassPage = () => {
    const tabs = [
        {
            id: 1,
            title: "Stream",
            content: <StreamTab />,
        },
        {
            id: 2,
            title: "Classwork",
            content: <ClassworkTab />,
        },
        {
            id: 3,
            title: "People",
            content: <PeopleTab />,
        },
    ];

    return (
        <div className="w-full">
            <Tabs defaultValue={tabs[0]?.title} className="w-full">
                <TabsList className="bg-transparent px-5">
                    <TabsTrigger value={tabs[0]?.title}>{tabs[0]?.title}</TabsTrigger>
                    <TabsTrigger value={tabs[1]?.title}>{tabs[1]?.title}</TabsTrigger>
                    <TabsTrigger value={tabs[2]?.title}>{tabs[2]?.title}</TabsTrigger>
                </TabsList>
                {tabs.map((tab) => {
                    return (
                        <TabsContent key={tab?.id} value={tab?.title}>
                            {tab?.content}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default ClassPage;
