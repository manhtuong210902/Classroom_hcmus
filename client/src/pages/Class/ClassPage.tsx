import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import StreamTab from "./components/StreamTab/StreamTab";
import PeopleTab from "./components/PeopleTab/PeopleTab";
import { useAppSelector } from "@src/hooks/appHook";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import GradesTab from "./components/GradesTab/GradesTab";
import GradeCompositionTab from "./components/GradesCompostionTab/GradeCompositionTab";

const ClassPage = () => {
    const currClass = useAppSelector(selectCurrClass);
    const tabs = [
        {
            id: 1,
            title: "Stream",
            content: <StreamTab />,
        },
        {
            id: 2,
            title: "People",
            content: <PeopleTab />,
        },
        {
            id: 3,
            title: "Grade Composition",
            content: <GradeCompositionTab />,
            isTeacher: true,
        },
        {
            id: 4,
            title: "Grades",
            content: <GradesTab />,
            isTeacher: true,
        },
    ];

    return (
        <div className="w-full">
            <Tabs defaultValue={tabs[0]?.title} className="w-full">
                <TabsList className="bg-transparent px-5">
                    <TabsTrigger value={tabs[0]?.title}>{tabs[0]?.title}</TabsTrigger>
                    <TabsTrigger value={tabs[1]?.title}>{tabs[1]?.title}</TabsTrigger>
                    <TabsTrigger value={tabs[2]?.title}>{tabs[2]?.title}</TabsTrigger>
                    {currClass?.isTeacher && <TabsTrigger value={tabs[3]?.title}>{tabs[3]?.title}</TabsTrigger>}
                </TabsList>
                {tabs.map((tab) => {
                    if (tab.isTeacher && !currClass?.isTeacher) return null;

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
