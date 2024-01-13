import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Input } from "@src/components/ui/input";
import { ReviewInfo } from "@src/utils/types";
import { FileType2Icon, SendHorizonalIcon, Users } from "lucide-react";

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
                    <span className="text-lg font-bold">Review Grade {data?.name}</span>
                    <p className="text-sm">
                        Current Grade: <span className="font-bold">{data?.currentGrade}</span>
                    </p>
                    <div className="text-sm font-medium">
                        <h1 className="font-bold mb-2">Student Request Review:</h1>
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
            <div className="py-3 border-t border-primary">
                <div>
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span className="font-semibold">3 comments</span>
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center">
                                <Avatar className="w-[35px] h-[35px]">
                                    <AvatarImage src={""} alt="" />
                                    <AvatarFallback className="font-semibold text-sm">H</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-sm">
                                    Nguyen Van A <span className="font-normal text-xs text-gray-700">Oct 31, 2020</span>
                                </p>
                                <span className="text-sm">Hello bạn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Input className="flex-1" placeholder="Add review comment" />
                    <div className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center">
                        <SendHorizonalIcon color="#FFFFFF" size={14} className="text-[#FFFFFF]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
