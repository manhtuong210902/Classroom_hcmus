import { useEffect } from "react";
import ClassItem from "./ClassItem";
import { getListClass } from "@src/services/class/apiRequest";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { selectClassList } from "@src/store/reducers/classSlice";
import { ClassInfo } from "@src/utils/types";

const ListClass = () => {
    const listClass = useAppSelector(selectClassList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getListClass(dispatch).then((data: any) => {
            if (data.statusCode !== 200) {
                toast.error(data.message);
                return;
            }
        });
    }, []);

    return (
        <div className="flex items-center gap-6 flex-wrap">
            {listClass.length > 0 ? (
                <>
                    {listClass.map((item: ClassInfo, index) => {
                        return <ClassItem item={item} key={index} />;
                    })}
                </>
            ) : (
                <>
                    <div>NO DATA</div>
                </>
            )}
        </div>
    );
};

export default ListClass;
