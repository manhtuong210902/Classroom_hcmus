import { useEffect, useState } from "react";
import ClassItem, { ClassInfo } from "./ClassItem";
import { getListClass } from "@src/services/class/classRequest";

const ListClass = () => {

    const [listClass, setListClass] = useState([])

    useEffect(()=>{
        getListClass().then(data=>{
            console.log(data)
            setListClass(data);
        })
    },[])

    return (
        <div className="flex items-center gap-6 flex-wrap">
            {listClass.map((item: ClassInfo, index) => {
                return <ClassItem item={item} key={index} />;
            }, [])}
        </div>
    );
};

export default ListClass;
