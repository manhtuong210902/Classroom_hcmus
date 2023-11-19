import HeaderHome from "@src/components/Header/Header.home";
import { useState } from "react";
import SettingSidebar from "../components/SettingSidebar/SettingSidebar";

type Props = {
    children: JSX.Element;
};

const SettingLayout = ({ children }: Props) => {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    return (
        <div>
            <HeaderHome setIsShowSideBar={setIsShowSideBar} isShowSideBar={isShowSideBar} />
            <div className="flex">
                <SettingSidebar isShowSideBar={isShowSideBar} />
                <div className="h-[calc(100vh_-60px)] p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default SettingLayout;
