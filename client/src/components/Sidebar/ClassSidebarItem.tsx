import { ClassInfo } from "@src/utils/types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getFirstCharacter } from "@src/utils/lib";

type Props = {
    item: ClassInfo;
    isShowSideBar: boolean;
};

const ClassSidebarItem = (props: Props) => {
    const { item, isShowSideBar } = props;
    return (
        <div className="flex items-center gap-2 text-base font-semibold px-6 py-3 group cursor-pointer hover:bg-muted max-w-[300px] truncate mr-3 rounded-e-full">
            <Avatar className="w-6 h-6">
                <AvatarImage src={item?.avatar} alt="" />
                <AvatarFallback className="font-semibold text-xl">{getFirstCharacter(item.creator)}</AvatarFallback>
            </Avatar>
            <span className={`${!isShowSideBar && "hidden"}`}>{item.name}</span>
        </div>
    );
};

export default ClassSidebarItem;
