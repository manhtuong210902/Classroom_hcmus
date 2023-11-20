import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@src/components/ui/popover";
import { getFirstCharacter } from "@src/utils/lib";
import { MoreVertical } from "lucide-react";

export type ClassInfo = {
    name: string;
    creator: string;
    avatar: string;
};

const ClassItem = ({ item }: { item: ClassInfo }) => {
    return (
        <div className="mb-6 rounded-md border border-border shadow-md w-[300px] overflow-hidden cursor-pointer hover:shadow-lg">
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
                        <AvatarImage src={item.avatar} />
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
