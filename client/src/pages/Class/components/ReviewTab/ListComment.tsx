import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Input } from "@src/components/ui/input";
import { addComment, getComments } from "@src/services/review/apiRequest";
import { convertTimestampToFormattedDate, getFirstCharacter } from "@src/utils/lib";
import { CommentInfo } from "@src/utils/types";
import { SendHorizonalIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";

const ListComment = ({ classId, reviewId, gradeId }: { classId: string; reviewId: string; gradeId: string }) => {
    const [listComment, setListComment] = useState<CommentInfo[]>([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        getComments(classId, reviewId, gradeId).then((res) => {
            setListComment(res.data);
        });
    }, []);

    const handleComment = async () => {
        const res = await addComment(classId, {
            reviewId,
            gradeId,
            content: comment,
        });

        if (res.statusCode === 201) {
            setListComment((prevComment) => [...prevComment, res?.data]);
            setComment("");
        }
    };

    return (
        <div className="py-3 border-t border-primary">
            {listComment.length > 0 && (
                <div>
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span className="font-semibold">{listComment.length} comments</span>
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        {listComment.map((item) => {
                            return (
                                <div className="flex items-center gap-4" key={item.id}>
                                    <div className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center">
                                        <Avatar className="w-[35px] h-[35px]">
                                            <AvatarImage src={item.imgUrl} alt="" />
                                            <AvatarFallback className="font-semibold text-sm">
                                                {getFirstCharacter(item?.fullName || "")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold text-sm">
                                            {item?.fullName}{" "}
                                            <span className="font-normal text-xs text-gray-700">
                                                {convertTimestampToFormattedDate(item?.createdAt || "")}
                                            </span>
                                        </p>
                                        <span className="text-sm">{item?.content}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="flex items-center gap-3">
                <Input
                    className="flex-1"
                    placeholder="Add review comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div
                    className="w-[36px] h-[36px] cursor-pointer rounded-full bg-primary flex items-center justify-center"
                    onClick={handleComment}
                >
                    <SendHorizonalIcon color="#FFFFFF" size={14} className="text-[#FFFFFF]" />
                </div>
            </div>
        </div>
    );
};

export default ListComment;
