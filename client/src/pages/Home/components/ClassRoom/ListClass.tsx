import { Button } from "@src/components/ui/button";
import ClassItem from "./ClassItem";

import { useAppSelector } from "@src/hooks/appHook";
import { selectClassList } from "@src/store/reducers/classSlice";
import { ClassInfo } from "@src/utils/types";
import { PlusIcon } from "lucide-react";
import CreatingSVG from "@image/svg_creating.svg";
import { useState } from "react";
import ModalCreateClass from "@src/components/Modal/ModalCreateClass";

const ListClass = () => {
    const listClass = useAppSelector(selectClassList);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex items-center gap-6 flex-wrap p-6">
                {listClass.length > 0 ? (
                    <>
                        {listClass.map((item: ClassInfo, index) => {
                            return <ClassItem item={item} key={index} />;
                        })}
                    </>
                ) : (
                    <>
                        <div className="w-full flex flex-col gap-3 items-center justify-center h-80 mt-3">
                            <img src={CreatingSVG} alt="not-found" className="w-[200px] object-cover" />
                            <p className="text-xs">Create a new class for you</p>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                <PlusIcon /> Create class
                            </Button>
                        </div>
                    </>
                )}
            </div>
            {showModal && (
                <ModalCreateClass
                    isOpen={showModal}
                    close={() => {
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default ListClass;
