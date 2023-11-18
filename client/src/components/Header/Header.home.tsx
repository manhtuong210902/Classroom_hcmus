import BookImg from "@image/img_book.png";
import { LogOutIcon, MenuIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const HeaderHome = ({ setIsShowSideBar, isShowSideBar }: { setIsShowSideBar: any; isShowSideBar: boolean }) => {
    const handleToggleShow = () => {
        setIsShowSideBar((prev: any) => !prev);
    };

    return (
        <div className="h-[60px] shadow-md">
            <div className="w-full h-full flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                    <div
                        className={`rounded-full hover:bg-muted ${
                            isShowSideBar && "bg-muted"
                        } w-[40px] h-[40px] flex items-center justify-center cursor-pointer select-none`}
                        onClick={handleToggleShow}
                    >
                        <MenuIcon width={32} />
                    </div>
                    <img src={BookImg} alt="" className="w-8 h-8 object-cover select-none" />
                    <h1 className="font-bold text-2xl text-primary select-none">Education</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-muted w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                        <PlusIcon width={32} />
                    </div>

                    <div className="cursor-pointer">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.pn" />
                                    <AvatarFallback className="font-semibold">T</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent>
                                <div>
                                    <div className="flex flex-col justify-center items-center gap-2 py-4 border-b border-border">
                                        <Avatar className="w-[50px] h-[50px]">
                                            <AvatarImage src="https://github.com/shadcn.pn" />
                                            <AvatarFallback className="font-semibold text-xl">T</AvatarFallback>
                                        </Avatar>
                                        <div className="capitalize font-medium">NGUYEN MANH TUONG</div>
                                    </div>

                                    <div className="py-2">
                                        <div className="flex items-center gap-2 text-base font-semibold py-3 group cursor-pointer">
                                            <LogOutIcon />
                                            <span className="group-hover:underline">Log out</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHome;
