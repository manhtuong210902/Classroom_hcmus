import { useAppSelector } from "@src/hooks/appHook";
import { getReview } from "@src/services/review/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { useEffect, useState } from "react";
import { ReviewInfo } from "@src/utils/types";
import ReviewItem from "./ReviewItem";

const ReviewTab = () => {
    const currClass = useAppSelector(selectCurrClass);
    const [review, setReview] = useState<ReviewInfo[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getReview(String(currClass?.id), Boolean(currClass?.isTeacher)).then((res) => {
            if (res.statusCode === 200) {
                setReview(res.data);
                setLoading(false);
            }
        });
    }, [currClass?.id]);

    return (
        <div className="p-5">
            <div className="flex flex-col items-center gap-6">
                {loading ? (
                    <>
                        <div className="text-center">Loading...</div>
                    </>
                ) : (
                    <>
                        {review.length > 0 ? (
                            review.map((item) => {
                                return <ReviewItem data={item} key={item.id} />;
                            })
                        ) : (
                            <>
                                <div>
                                    <p className="text-center text-xl font-semibold">There are no review post</p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewTab;
