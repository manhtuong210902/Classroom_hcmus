import LogoImg from "@image/img_book.png";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Button } from "@src/components/ui/button";
import routes from "@src/configs/router";
import { useAppSelector } from "@src/hooks/appHook";
import { JoinClass, checkHasClass } from "@src/services/class/apiRequest";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { getFirstCharacter } from "@src/utils/lib";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const InvitePage = () => {
    const user = useAppSelector(selectUserInfo);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const classId = searchParams.get("class_id");
    const email = searchParams.get("email");
    useEffect(() => {
        if (classId && user) {
            checkHasClass(classId, user.id).then((res) => {
                if (res.statusCode !== 200) {
                    navigate(routes.HOME);
                    return;
                }

                if (res.data.data) {
                    navigate(`/class/${classId}`);
                    return;
                }
            });
        }

        if (email && email !== user?.email) {
            navigate(routes.NOT_FOUND);
            return;
        }
    }, []);

    const handleJoinClass = () => {
        if (token && classId && user) {
            JoinClass({
                token,
                classId,
                userId: user.id,
                email,
            });
        }
    };
    return (
        <div className="flex items-center gap-3 w-full md:px-0 md:max-w-[800px] md:mx-auto mt-6 px-4">
            <div className="w-full rounded-lg border border-border">
                <div className="flex flex-col items-center gap-6 p-8 bg-accent">
                    <img src={LogoImg} alt="logo" className="w-[100px] object-cover" />
                    <h1 className="text-3xl font-bold">Education</h1>
                    <p className="text-sm text-center">
                        Education helps classes communicate, save time, and stay <br /> organized. Learn more
                    </p>
                </div>
                <div className="flex flex-col items-center gap-6 p-8">
                    <div className="flex items-center gap-3 py-2 px-4 border rounded-lg border-border">
                        <Avatar className="w-[35px] h-[35px]">
                            <AvatarImage src={user?.imgUrl} alt="" />
                            <AvatarFallback className="font-semibold text-sm">
                                {getFirstCharacter(user?.fullname || "")}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-sm">{user?.fullname}</span>
                    </div>
                    <span className="text-xs">You are joining the class as a student.</span>
                    <Button onClick={handleJoinClass}>Join class</Button>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
