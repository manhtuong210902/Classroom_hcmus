import { Button } from "@src/components/ui/button";
import { GradeInfo } from "@src/utils/types";
import ReviewRequestModal from "./ReviewRequestModal";
import { useState } from "react";
import { convertTimestampToFormattedDate } from "@src/utils/lib";

const GradesViewItem = ({ data }: { data: GradeInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex flex-col gap-3 p-4 rounded-lg border border-border">
                <p className="text-xl text-center font-bold mb-2">{data?.name} Grade</p>
                <p className="text-sm">
                    Student ID: <span className="font-bold">{data?.studentId}</span>
                </p>
                <p className="text-sm">
                    Full Name: <span className="font-bold">{data?.fullName}</span>
                </p>
                <p className="text-sm">
                    Grade: <span className="font-bold">{data?.grade}</span>
                </p>
                <p className="text-sm">
                    Created At:{" "}
                    <span className="font-bold">{convertTimestampToFormattedDate(data?.createdAt || "")}</span>
                </p>
                {data?.updatedAt && (
                    <p className="text-sm">
                        Updated At: <span className="font-bold">{data?.updatedAt}</span>
                    </p>
                )}
                <Button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Make Review Request
                </Button>
            </div>
            <ReviewRequestModal
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                classId={data?.classId}
                gradeId={data?.gradeId}
            />
        </>
    );
};

export default GradesViewItem;
