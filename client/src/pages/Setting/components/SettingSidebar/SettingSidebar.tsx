import {  UserCircle2Icon, FileKey } from "lucide-react";
import { Link } from "react-router-dom";

const SettingSidebar = ({ isShowSideBar }: { isShowSideBar: boolean }) => {
    
    const topContents = [
        {
            id: 1,
            icon: <UserCircle2Icon/>,
            title: "Profile",
            path: "/setting/profile"
        },
    ];

    const botttomContents = [
        {
            id: 1,
            icon: <FileKey />,
            title: "Privacy",
            path: "/setting/privacy"
        },
    ];

    return (
        <div
            className={`h-[calc(100vh_-60px)] ${
                isShowSideBar ? "w-[300px]" : "w-[86px]"
            }  border-r border-border overflow-hidden transition-all duration-300`}
        >
            <div className="border-b border-border py-3">
                {topContents.map((item) => {
                    return (
                        <Link
                            to = {`${item.path}`}
                            key={item.id}
                            className="flex items-center gap-2 text-base font-semibold px-6 py-3 group cursor-pointer hover:bg-muted max-w-[300px] truncate mr-3 rounded-e-full"
                        >
                            {item.icon}
                            <span className={`group-hover:underline ${!isShowSideBar && "hidden"}`}>{item.title}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="py-3">
                {botttomContents.map((item) => {
                    return (
                        <Link
                            to = {`${item.path}`}
                            key={item.id}
                            className="flex items-center gap-2 text-base font-semibold px-6 py-3 group cursor-pointer hover:bg-muted max-w-[300px] truncate mr-3 rounded-e-full"
                        >
                            {item.icon}
                            <span className={`group-hover:underline ${!isShowSideBar && "hidden"}`}>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SettingSidebar;
