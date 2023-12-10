import Header from "@src/components/Header/Header";
import Sicebar from "@src/components/Sidebar/Sidebar";
import routes from "@src/configs/router";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { getClassDetail, getListClass } from "@src/services/class/apiRequest";
import { selectCurrClass, setCurrClass } from "@src/store/reducers/classSlice";
import { CLASS_URL_REGEX } from "@src/utils/regex";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
    children?: JSX.Element;
};

const HomeLayout = ({ children }: Props) => {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const location = useLocation();
    const params = useParams();
    const currClass = useAppSelector(selectCurrClass);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        getListClass(dispatch).then((data: any) => {
            if (data.statusCode !== 200) {
                toast.error(data.message);
                return;
            }
        });
    }, []);

    useEffect(() => {
        if (CLASS_URL_REGEX.test(location.pathname)) {
            if (params?.id !== currClass?.id) {
                getClassDetail(params.id).then((res) => {
                    if (res.statusCode != 200) {
                        navigate(routes.HOME);
                    }
                    dispatch(setCurrClass(res.data));
                });
            }
        } else {
            dispatch(setCurrClass(null));
        }
    }, [location]);

    return (
        <div>
            <Header setIsShowSideBar={setIsShowSideBar} isShowSideBar={isShowSideBar} />
            <div className="flex">
                <Sicebar isShowSideBar={isShowSideBar} />
                <div className="h-[calc(100vh_-60px)] overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
