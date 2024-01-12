import { useEffect, useState } from "react";
import MemberItem from "./MemberItem";
import { getListUsersInClass } from "@src/services/class/apiRequest";
import { useAppSelector } from "@src/hooks/appHook";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { toast } from "react-toastify";
import { UserInfo } from "@src/utils/types";
import { Skeleton } from "@src/components/ui/skeleton";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import ModalInviteMemmber from "@src/components/Modal/ModalInviteMember";
import AddUserSVG from "@image/svg_add_user.svg";
import { Button } from "@src/components/ui/button";
import { UserType } from "@src/utils/enum";

const ListMember = () => {
    const currClass = useAppSelector(selectCurrClass);
    const [teachers, setTeachers] = useState<UserInfo[]>([]);
    const [classmates, setClassmates] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [invite, setInvite] = useState({
        isOpen: false,
        role: "",
    });

    useEffect(() => {
        if (currClass) {
            setLoading(true);
            getListUsersInClass(currClass?.id)
                .then((res: any) => {
                    if (res.statusCode !== 200) {
                        toast.error(res.message);
                        return;
                    }

                    setTeachers(res.data.listTeachers);
                    setClassmates(res.data.listStudents);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [currClass]);

    const handleCloseInviteModal = () => {
        setInvite({
            isOpen: false,
            role: "",
        });
    };

    return (
        <>
            <div className="w-full mt-4">
                <div>
                    <div className="flex items-center py-4 justify-between border-b border-primary">
                        <h1 className="text-3xl font-semibold">Teachers</h1>
                        {currClass?.isCreator && (
                            <span
                                className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-muted cursor-pointer translate-y-1"
                                onClick={() => {
                                    setInvite({
                                        isOpen: true,
                                        role: "teacher",
                                    });
                                }}
                            >
                                <UserPlusIcon className="w-5 h-5" />
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        {loading && (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        )}
                        {teachers.map((item) => {
                            return <MemberItem type={UserType.TEACHER} item={item} key={item.id} />;
                        })}
                    </div>
                </div>

                <div className="mt-3">
                    <div className="flex items-center py-4 justify-between border-b border-primary">
                        <h1 className="text-3xl font-semibold">Classmates</h1>
                        {currClass?.isCreator ? (
                            <span
                                className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-muted cursor-pointer translate-y-1"
                                onClick={() => {
                                    setInvite({
                                        isOpen: true,
                                        role: "student",
                                    });
                                }}
                            >
                                <UserPlusIcon className="w-5 h-5" />
                            </span>
                        ) : (
                            <span>{classmates?.length} Students</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        {loading && (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        )}
                        {classmates.length > 0 ? (
                            <>
                                {classmates.map((item) => {
                                    return <MemberItem type={UserType.STUDENT} item={item} key={item.id} />;
                                })}
                            </>
                        ) : (
                            <>
                                <div className="w-full flex flex-col gap-3 items-center justify-center h-80 mt-3">
                                    <img src={AddUserSVG} alt="not-found" className="w-[200px] object-cover" />
                                    <p className="text-xs">Add students to this class</p>
                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            setInvite({
                                                isOpen: true,
                                                role: "student",
                                            });
                                        }}
                                    >
                                        <PlusIcon /> Invite Student
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {invite.isOpen && (
                <ModalInviteMemmber isOpen={invite.isOpen} close={handleCloseInviteModal} role={invite.role} />
            )}
        </>
    );
};

export default ListMember;
