import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { checkNotification, getNotification } from "@src/services/notification/apiRequest";
import { convertTimestampToFormattedDate, getFirstCharacter } from "@src/utils/lib";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const ListNotification = () => {
    const [notifications, setNotifications] = useState<any>([]);
    useEffect(() => {
        getNotification().then((res) => {
            setNotifications(res.data);
        });
    }, []);

    const handleClickNotification = async (item: any) => {
        await checkNotification(item?.id);
        window.open(`/class/${item?.class_id}`);
    };

    return (
        <div className="flex flex-col gap-3 h-[400px] overflow-y-auto">
            <div>
                <p className="text-xl font-semibold">Notifications</p>
            </div>
            {notifications.length > 0 ? (
                notifications.map((item: any) => {
                    return (
                        <div
                            className="flex items-center cursor-pointer justify-between gap-4 rounded-lg py-2 px-4 border border-border"
                            key={item.id}
                            onClick={() => handleClickNotification(item)}
                        >
                            <div className="flex gap-3">
                                <Avatar>
                                    <AvatarImage src={item?.sender_img} className="rounded-full" />
                                    <AvatarFallback className="font-semibold rounded-full flex items-center justify-center">
                                        {getFirstCharacter(item?.sender_fullname || item?.sender_username)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-sm">
                                        <span className="font-normal text-xs text-gray-700">
                                            {convertTimestampToFormattedDate(item?.created_at || "")}
                                        </span>
                                    </p>
                                    <div className="text-sm">
                                        <span className="font-bold">{item?.sender_fullname}</span> {item?.content}
                                    </div>
                                </div>
                            </div>
                            <div>{item?.is_seen && <Check size={12} />}</div>
                        </div>
                    );
                })
            ) : (
                <p className="text-sm font-semibold">There are no notifications</p>
            )}
        </div>
    );
};

export default ListNotification;
