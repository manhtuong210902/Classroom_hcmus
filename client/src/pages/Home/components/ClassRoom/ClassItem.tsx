import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@src/components/ui/popover";
import { useAppDispatch } from "@src/hooks/appHook";
import { setCurrClass } from "@src/store/reducers/classSlice";
import { getFirstCharacter } from "@src/utils/lib";
import { ClassInfo } from "@src/utils/types";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClassItem = ({ item }: { item: ClassInfo }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickClassItem = () => {
        dispatch(setCurrClass(item));
        navigate(`/class/${item.id}`);
    };

    return (
        <div
            className="mb-6 rounded-md border border-border shadow-md w-[300px] overflow-hidden cursor-pointer hover:shadow-lg"
            onClick={handleClickClassItem}
        >
            <div className="bg-primary p-4 flex flex-col text-base text-white relative">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg capitalize truncate">{item.name}</h3>
                    <Popover>
                        <PopoverTrigger>
                            <MoreVertical className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-2">
                            <div className="">
                                <div className="hover:bg-muted px-2 py-2 rounded-md cursor-pointer font-medium">
                                    Unenroll
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <span className="text-sm">{item.creator}</span>
                <div className="absolute right-5 top-full -translate-y-1/2">
                    <Avatar>
                        <AvatarImage src={item?.avatar} />
                        <AvatarFallback className="font-semibold text-primary">
                            {getFirstCharacter(item.creator)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="py-[80px]"></div>
        </div>
    );
};

export default ClassItem;
