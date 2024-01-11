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

const GradesTab = () => {
    const currClass = useAppSelector(selectCurrClass);
    const dispatch = useAppDispatch();

    const gradesBoard = [
        {
            studentId: "20120612",
            name: "Nguyen Minh Duc",
            grade: "10",
        },
        {
            studentId: "20120619",
            name: "Nguyen Manh Tuong",
            grade: "9",
        },
    ];

    useEffect(() => {
        getGradeBoard(dispatch, String(currClass?.id)).then(() => {
            console.log("Grade Board is loaded");
        });
    }, [currClass]);

    return (
        <div className="p-5 w-full">
            <div className="mb-6 flex justify-end items-center gap-3">
                <ImportFile />
                <ExportFile />
            </div>
            <Table>
                <TableCaption>Student Transcripts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead className="text-right">Midterm</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gradesBoard.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-right">{student.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Student</TableCell>
                        <TableCell className="text-right">{gradesBoard.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default GradesTab;
