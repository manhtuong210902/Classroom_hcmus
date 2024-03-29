import BookImg from "@image/img_book.png";
import { Bell, ChevronRight, LogOutIcon, MenuIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { getFirstCharacter } from "@src/utils/lib";
import { logoutUser } from "@src/services/auth/apiRequest";
import { useNavigate } from "react-router-dom";
import routes from "@src/configs/router";
import { useState } from "react";
import ModalCreateClass from "../Modal/ModalCreateClass";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import ListNotification from "../Notification/ListNotification";

const HeaderHome = ({ setIsShowSideBar, isShowSideBar }: { setIsShowSideBar: any; isShowSideBar: boolean }) => {
    const user = useAppSelector(selectUserInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const currClass = useAppSelector(selectCurrClass);

    const handleToggleShow = () => {
        setIsShowSideBar((prev: any) => !prev);
    };

    const handleLogOut = () => {
        logoutUser(dispatch);
        navigate(routes.LANDINGPAGE);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleOpenModal = () => {
        setIsShowModal(true);
    };

    return (
        <>
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
                        <img
                            src={BookImg}
                            alt=""
                            className={`w-8 h-8 object-cover select-none ${currClass ? "hidden md:block" : ""}`}
                        />
                        <h1
                            className={`font-bold texl-xl md:text-2xl text-primary select-none ${
                                currClass ? "hidden md:block" : ""
                            }`}
                        >
                            Education
                        </h1>
                        {currClass && (
                            <div className="flex items-center gap-4">
                                <ChevronRight />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-sm font-semibold max-w-[120px] md:max-w-[400px] truncate">
                                        {currClass.name}
                                    </h3>
                                    <p className="text-xs text-secondary-foreground max-w-[120px] md:max-w-[400px] truncate">
                                        {currClass.subject}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <Popover>
                            <PopoverTrigger>
                                <div className="rounded-full bg-muted w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                                    <Bell width={32} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[320px]">
                                <ListNotification />
                            </PopoverContent>
                        </Popover>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className="rounded-full bg-muted w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                                        onClick={handleOpenModal}
                                    >
                                        <PlusIcon width={32} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Create a class</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        <AvatarImage src={user ? user.imgUrl : undefined} />
                                        <AvatarFallback className="font-semibold">
                                            {user && getFirstCharacter(user?.fullname || user?.username)}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent>
                                    <div>
                                        <div className="flex flex-col justify-center items-center gap-2 py-4 border-b border-border">
                                            <Avatar className="w-[50px] h-[50px]">
                                                <AvatarImage src={user ? user.imgUrl : undefined} alt="" />
                                                <AvatarFallback className="font-semibold text-xl">
                                                    {user && getFirstCharacter(user?.fullname || user?.username)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="capitalize font-medium">
                                                {user?.fullname || user?.username}
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <div
                                                className="flex items-center gap-2 text-base font-semibold py-3 group cursor-pointer"
                                                onClick={handleLogOut}
                                            >
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
            {isShowModal && <ModalCreateClass isOpen={isShowModal} close={handleCloseModal} />}
        </>
    );
};

export default HeaderHome;
