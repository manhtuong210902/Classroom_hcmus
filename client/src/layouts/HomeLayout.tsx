import Header from "@src/components/Header/Header";
import Sidebar from "@src/components/Sidebar/Sidebar";
import routes from "@src/configs/router";
import socket from "@src/configs/socket";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { getClassDetail, getListClass } from "@src/services/class/apiRequest";
import { getGradeCompositions } from "@src/services/grade/apiRequest";
import { selectCurrClass, setCurrClass } from "@src/store/reducers/classSlice";
import { LocalStorage } from "@src/utils/LocalStorage";
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
        if (params?.id) {
            getGradeCompositions(dispatch, params?.id).then((data: any) => {
                if (data.statusCode !== 200) {
                    toast.error(data.message);
                    return;
                }
            });
        }
    }, [params?.id]);

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

    useEffect(() => {
        const handleEmit = (data: any) => {
            toast.info(data.content);
        };
        socket.on("TEACHER_EMIT", handleEmit);
        socket.on("STUDENT_EMIT", handleEmit);

        return () => {
            socket.off("TEACHER_EMIT", handleEmit);
            socket.off("STUDENT_EMIT", handleEmit);
        };
    }, []);

    return (
        <div>
            <Header setIsShowSideBar={setIsShowSideBar} isShowSideBar={isShowSideBar} />
            <div className="flex">
                <Sidebar isShowSideBar={isShowSideBar} />
                <div className="h-[calc(100vh_-60px)] overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
