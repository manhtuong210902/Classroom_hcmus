import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@src/components/ui/table";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { getGradeBoard } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { useEffect } from "react";
import ImportFile from "./ImportFile";
import ExportFile from "./ExportFile";
import { selectGradeCompositionList, selectGradeStudentList } from "@src/store/reducers/gradeSlice";
import { ExportType, FileType } from "@src/utils/enum";
import EditValueColumn from "./EditValueColumn";

const GradesTab = () => {
    const currClass = useAppSelector(selectCurrClass);
    const gradesComposition = useAppSelector(selectGradeCompositionList);
    const gradesBoard = useAppSelector(selectGradeStudentList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getGradeBoard(dispatch, String(currClass?.id));
    }, [currClass]);

    const totalGrade = (student: any) => {
        let total = 0;
        gradesComposition.forEach((grade) => {
            total += student?.[grade.name]?.grade * (grade.scale / 100);
        });
        return total;
    };

    return (
        <div className="p-5 w-full">
            <div className="mb-6 flex md:flex-row md:justify-between md:items-center gap-3 flex-col justify-start">
                <div className="flex md:items-center gap-3 justify-between md:justify-start">
                    <ImportFile title="Import Student List" type={FileType.STUDENT_LIST} />
                    <ExportFile title="Download Template" type={ExportType.STUDENT_LIST} />
                </div>
                <div className="flex md:items-center gap-3 justify-between md:justify-start">
                    <ImportFile title="Import Grade Board" type={FileType.GRADES} />
                    <ExportFile title="Export Grade Board" type={ExportType.GRADES} />
                </div>
            </div>
            <Table>
                <TableCaption>Student Transcripts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Full Name</TableHead>
                        {gradesComposition.map((grade, index) => (
                            <TableHead key={index}>
                                {grade.name} ({grade.scale}%)
                            </TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gradesBoard.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index}</TableCell>
                            <TableCell>{student?.studentId}</TableCell>
                            <TableCell>{student?.fullName}</TableCell>
                            {gradesComposition.map((grade, index) => (
                                <TableCell key={index}>
                                    <EditValueColumn
                                        studentId={student?.studentId}
                                        gradeId={grade?.id}
                                        name={"grade"}
                                        defaultValue={student?.[grade.name]?.grade}
                                        type="number"
                                        className="w-[100px]"
                                    />
                                </TableCell>
                            ))}
                            <TableCell>{totalGrade(student)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4 + gradesComposition.length - 1}>Total Student</TableCell>
                        <TableCell>{gradesBoard.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default GradesTab;
