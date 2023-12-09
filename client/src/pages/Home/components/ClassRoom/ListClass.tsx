import ClassItem from "./ClassItem";

import { useAppSelector } from "@src/hooks/appHook";
import { selectClassList } from "@src/store/reducers/classSlice";
import { ClassInfo } from "@src/utils/types";

const ListClass = () => {
    const listClass = useAppSelector(selectClassList);

    return (
        <div className="flex items-center gap-6 flex-wrap p-6">
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
