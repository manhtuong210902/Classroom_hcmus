import ClassRoomImg from "@image/svg_classroom.svg";
import BookImg from "@image/img_book.png";
import LoginImg from "@image/img_login.svg";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import routes from "@src/configs/router";

type Props = {
    children?: JSX.Element;
};

const DefaultAuth = () => {
    const location = useLocation();

    return (
        <div className="grid-cols-1 hidden md:flex flex-col py-5 px-4 lg:px-16 xl:px-24 bg-accent">
            <Link to={routes.LANDINGPAGE}>
                <div className="flex items-center gap-3 cursor-pointer">
                    <div>
                        <img src={BookImg} alt="" className="w-9 h-9 object-cover" />
                    </div>
                    <div className="font-bold text-3xl text-primary">Education</div>
                </div>
            </Link>
            <div className=" mt-10 text-[#262626] text-5xl font-bold">
                <span>Get started with</span>
                <br /> <span className="text-lime-600">Education</span>
            </div>
            <div className="text-muted-foreground text-lg mt-3 flex items-center gap-2 underline">
                Smart Classroom Management System <BookOpen />
            </div>
            <div className="mt-8 h-200px flex mx-auto">
                <div>
                    <img
                        className="w-[400px] h-auto"
                        src={location.pathname.includes("login") ? LoginImg : ClassRoomImg}
                    />
                </div>
            </div>
        </div>
    );
};

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="md:grid-cols-2 grid">
            <DefaultAuth />
            <div className="h-screen grid-cols-1 overflow-y-auto">{children}</div>
        </div>
    );
};

export default AuthLayout;
