import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ListClass = () => {
    return (
        <div className="flex items-center gap-6 flex-wrap">
            <div className="mb-6 rounded-md border border-border shadow-sm w-[300px] overflow-hidden">
                <div className="bg-primary p-4 flex flex-col text-base text-white relative">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg capitalize">CNPM - TH2020/1</h3>
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
                    <span className="text-sm">Khoa Ngo Ngoc Dang</span>
                    <div className="absolute right-5 top-full -translate-y-1/2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.pn" />
                            <AvatarFallback className="font-semibold text-primary">T</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="py-[80px]"></div>
            </div>
        </div>
    );
};

export default ListClass;
