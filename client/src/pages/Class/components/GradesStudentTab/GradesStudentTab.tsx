import { Button } from "@src/components/ui/button";
import { useAppSelector } from "@src/hooks/appHook";
import { getGradesView } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { useEffect } from "react";

const GradesStudentTab = () => {
    const currClass = useAppSelector(selectCurrClass);
    useEffect(() => {
        getGradesView(String(currClass?.id));
    }, [currClass?.id]);

    return (
        <div className="p-10 grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-3 p-4 rounded-lg border border-border">
                <p className="text-xl text-center font-bold mb-2">Grades Midterm</p>
                <p className="text-sm">
                    Student ID: <span className="font-bold">SE123456</span>
                </p>
                <p className="text-sm">
                    Full Name: <span className="font-bold">Nguyen Van A</span>
                </p>
                <p className="text-sm">
                    Grade: <span className="font-bold">10</span>
                </p>
                <p className="text-sm">
                    Created At: <span className="font-bold">10pm 21/09/2023</span>
                </p>
                <p className="text-sm">
                    Updated At: <span className="font-bold">10pm 21/09/2023</span>
                </p>
                <Button>Request Review</Button>
            </div>
        </div>
    );
};

export default GradesStudentTab;
