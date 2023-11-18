import HeaderHome from "@src/components/Header/Header.home";
import Sicebar from "@src/components/Sidebar/Sicebar";
import { useState } from "react";

type Props = {
    children: JSX.Element;
};

const HomeLayout = ({ children }: Props) => {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    return (
        <div>
            <HeaderHome setIsShowSideBar={setIsShowSideBar} isShowSideBar={isShowSideBar} />
            <div className="flex">
                <Sicebar isShowSideBar={isShowSideBar} />
                <div className="h-[calc(100vh_-60px)] p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
