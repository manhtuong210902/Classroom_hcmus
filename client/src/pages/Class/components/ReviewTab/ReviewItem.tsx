import { ReviewInfo } from "@src/utils/types";
import { FileType2Icon } from "lucide-react";
import ListComment from "./ListComment";
import { convertTimestampToFormattedDate } from "@src/utils/lib";

type Props = {
    data: ReviewInfo;
};

const ReviewItem = (props: Props) => {
    const { data } = props;
    return (
        <div className="flex flex-col w-full md:w-[700px] gap-3">
            <div className="flex gap-4 py-4 px-6 rounded-lg border border-border">
                <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                    <FileType2Icon color="#FFFFFF" className="text-[#FFFFFF]" />
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-lg font-bold">{data?.gradeName} Grade Review</p>
                        <p className="text-gray-700 text-xs">
                            {data?.fullName} - {convertTimestampToFormattedDate(data?.createdAt || "")}
                        </p>
                    </div>
                    <p className="text-sm">
                        Current Grade: <span className="font-bold">{data?.currentGrade}</span>
                    </p>
                    <div className="text-sm font-medium">
                        <h1 className="font-bold mb-2">Review Request:</h1>
                        <p className="mb-1">
                            - Student ID: <span className="font-bold">{data?.studentId}</span>
                        </p>
                        <p className="mb-1">
                            - Full Name: <span className="font-bold">{data?.fullName}</span>
                        </p>
                        <p className="mb-1">
                            - Expected Grade: <span className="font-bold">{data?.expectedGrade}</span>
                        </p>
                        <h1 className="font-bold mb-2">Explaination:</h1>
                        <p className="mb-1">
                            - Explaination: <span className="font-bold">{data?.explaination}</span>
                        </p>
                    </div>
                </div>
            </div>
            <ListComment classId={data?.classId} reviewId={data?.id} gradeId={data?.gradeId} />
        </div>
    );
};

export default ReviewItem;
