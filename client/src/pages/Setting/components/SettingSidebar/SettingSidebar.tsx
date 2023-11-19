import routes from "@src/configs/router";
import { UserCircle2Icon, FileKey } from "lucide-react";
import { Link } from "react-router-dom";

const SettingSidebar = ({ isShowSideBar }: { isShowSideBar: boolean }) => {
    const contents = [
        {
            id: 1,
            icon: <UserCircle2Icon />,
            title: "Profile",
            path: routes.PROFILE,
        },

        {
            id: 2,
            icon: <FileKey />,
            title: "Privacy",
            path: routes.HOME,
        },
    ];

    return (
        <div>
            {contents.map((item) => {
                return (
                    <Link key={item.id} to={item.path}>
                        <div className="flex items-center gap-2 text-base font-semibold px-6 py-3 group cursor-pointer hover:bg-muted max-w-[300px] truncate mr-3 rounded-e-full">
                            {item.icon}
                            <span className={`group-hover:underline ${!isShowSideBar && "hidden"}`}>{item.title}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SettingSidebar;
