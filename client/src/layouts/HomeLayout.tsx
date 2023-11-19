import Header from "@src/components/Header/Header";
import Sicebar from "@src/components/Sidebar/Sidebar";
import { useState } from "react";

type Props = {
    children?: JSX.Element;
};

const HomeLayout = ({ children }: Props) => {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    return (
        <div>
            <Header setIsShowSideBar={setIsShowSideBar} isShowSideBar={isShowSideBar} />
            <div className="flex">
                <Sicebar isShowSideBar={isShowSideBar} />
                <div className="h-[calc(100vh_-60px)] p-6 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
