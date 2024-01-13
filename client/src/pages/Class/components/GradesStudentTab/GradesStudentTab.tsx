import { useAppSelector } from "@src/hooks/appHook";
import { getGradesView } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { GradeInfo } from "@src/utils/types";
import { useEffect, useState } from "react";
import GradesViewItem from "./GradesViewItem";

const GradesStudentTab = () => {
    const currClass = useAppSelector(selectCurrClass);
    const [gradesView, setGradesView] = useState<GradeInfo[]>([]);
    useEffect(() => {
        getGradesView(String(currClass?.id)).then((res) => {
            if (res?.statusCode === 200) {
                setGradesView(res?.data);
            }
        });
    }, [currClass?.id]);

    return (
        <div className="p-10 grid grid-cols-3 gap-6">
            {getGradesView.length > 0 ? (
                gradesView?.map((grade) => {
                    return <GradesViewItem data={grade} key={grade?.id} />;
                })
            ) : (
                <p className="text-center text-xl font-bold">There are no grades to public</p>
            )}
        </div>
    );
};

export default GradesStudentTab;
