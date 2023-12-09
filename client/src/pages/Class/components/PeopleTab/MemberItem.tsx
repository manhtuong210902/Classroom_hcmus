import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { getFirstCharacter } from "@src/utils/lib";
import { UserInfo } from "@src/utils/types";

const MemberItem = ({ item }: { item: UserInfo }) => {
    return (
        <div className="flex items-center gap-3 py-4 px-6 border-b border-border">
            <Avatar className="w-[35px] h-[35px]">
                <AvatarImage src={item?.imgUrl} alt="" />
                <AvatarFallback className="font-semibold text-sm">
                    {getFirstCharacter(item?.fullname || "")}
                </AvatarFallback>
            </Avatar>

            <span className="text-sm">{item?.fullname}</span>
        </div>
    );
};

export default MemberItem;
