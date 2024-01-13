import { getNotification } from "@src/services/notification/apiRequest";
import { convertTimestampToFormattedDate } from "@src/utils/lib";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListNotification = () => {
    const [notifications, setNotifications] = useState<any>([]);
    useEffect(() => {
        getNotification().then((res) => {
            setNotifications(res.data);
        });
    }, []);
    return (
        <div className="flex flex-col gap-3 h-[400px] overflow-y-auto">
            <div>
                <p className="text-xl font-semibold">Notifications</p>
            </div>
            {notifications.length > 0 ? (
                notifications.map((item: any) => {
                    return (
                        <Link to={`/class/${item?.class_id}`}>
                            <div className="flex items-center gap-4" key={item.id}>
                                <div className="flex flex-col gap-1 rounded-lg py-1 px-2 border border-border">
                                    <p className="font-semibold text-sm">
                                        <span className="font-normal text-xs text-gray-700">
                                            {convertTimestampToFormattedDate(item?.created_at || "")}
                                        </span>
                                    </p>
                                    <span className="text-sm">{item?.content}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p className="text-center text-xl font-semibold">There are no notifications</p>
            )}
        </div>
    );
};

export default ListNotification;
