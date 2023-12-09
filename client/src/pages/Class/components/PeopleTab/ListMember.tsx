import { useEffect, useState } from "react";
import MemberItem from "./MemberItem";
import { getListUsersInClass } from "@src/services/class/apiRequest";
import { useAppSelector } from "@src/hooks/appHook";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { toast } from "react-toastify";
import { UserInfo } from "@src/utils/types";
import { Skeleton } from "@src/components/ui/skeleton";

const ListMember = () => {
    const currClass = useAppSelector(selectCurrClass);
    const [teachers, setTeachers] = useState<UserInfo[]>([]);
    const [classmates, setClassmates] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (currClass) {
            setLoading(true);
            getListUsersInClass(currClass?.id)
                .then((res: any) => {
                    if (res.statusCode !== 200) {
                        toast.error(res.message);
                        return;
                    }

                    console.log("Log check resdata", res);

                    setTeachers(res.data.listTeachers);
                    setClassmates(res.data.listStudents);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [currClass]);

    return (
        <div className="w-full mt-4">
            <div>
                <h1 className="text-2xl font-semibold border-b border-primary py-4">Teachers</h1>
                <div className="flex flex-col gap-3">
                    {loading && (
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-[35px] h-[35px] rounded-full" />
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    )}
                    {teachers.map((item) => {
                        return <MemberItem item={item} key={item.id} />;
                    })}
                </div>
            </div>

            <div className="mt-3">
                <div className="flex items-center py-4 justify-between border-b border-primary">
                    <h1 className="text-2xl font-semibold">Classmates</h1>
                    <span>{classmates?.length} Students</span>
                </div>
                <div className="flex flex-col gap-3">
                    {loading && (
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-[35px] h-[35px] rounded-full" />
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    )}
                    {classmates.map((item) => {
                        return <MemberItem item={item} key={item.id} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListMember;
