import { Alert, AlertDescription, AlertTitle } from "@src/components/ui/alert";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@src/components/ui/menubar";
import { GradeComposition } from "@src/utils/types";
import { Check, Download, Edit, MoreVertical, Terminal, Trash } from "lucide-react";
import { useState } from "react";
import { SortableElement } from "react-sortable-hoc";
import ModalEditGradeComposition from "./ModalEditGradeComposition";
import ModalDeleteGradeComposition from "./ModalDeteteCompositon";
import { exportFile, setFinalGrade } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { useAppSelector } from "@src/hooks/appHook";
import { ExportType } from "@src/utils/enum";
import { toast } from "react-toastify";

const GradeCompositionItem = SortableElement(({ item }: { item: GradeComposition }) => {
    const currClass = useAppSelector(selectCurrClass);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleClickEdit = async () => {
        setShowModalEdit(true);
    };

    const handleClickDetete = async () => {
        setShowModalDelete(true);
    };

    const handleDownloadTemplate = async () => {
        exportFile(String(currClass?.id), ExportType.GRADES, {
            grade_id: item?.id,
        }).then((res) => {
            if (res.statusCode === 200) {
                toast.success("Downdload successfully!");
            } else {
                toast.error("Download failed!");
            }
        });
    };

    const handleMarkAsDone = async () => {
        setFinalGrade(String(currClass?.id), item.id).then((res) => {
            if (res.statusCode === 200) {
                toast.success(res.message);
            } else {
                toast.error("Mark as done failed!");
            }
        });
    };

    return (
        <>
            <Alert className="hover:bg-accent">
                <Terminal className="h-4 w-4" />
                <div className="flex items-center justify-between">
                    <div>
                        <AlertTitle>Name: {item?.name}</AlertTitle>
                        <AlertDescription>Grade scale: {item?.scale}%</AlertDescription>
                    </div>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="border-none">
                                <MoreVertical className="h-5 w-5 cursor-pointer" />
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem className="cursor-pointer" onClick={handleClickEdit}>
                                    Edit
                                    <MenubarShortcut>
                                        <Edit className="h-4 w-4" />
                                    </MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem className="cursor-pointer" onClick={handleClickDetete}>
                                    Delete
                                    <MenubarShortcut>
                                        <Trash className="h-4 w-4" />
                                    </MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem className="cursor-pointer" onClick={handleDownloadTemplate}>
                                    Download Template
                                    <MenubarShortcut>
                                        <Download className="h-4 w-4" />
                                    </MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem className="cursor-pointer" onClick={handleMarkAsDone}>
                                    Mark as Done
                                    <MenubarShortcut>
                                        <Check className="h-4 w-4" />
                                    </MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </Alert>

            {showModalEdit && (
                <ModalEditGradeComposition
                    isOpen={showModalEdit}
                    close={() => {
                        setShowModalEdit(false);
                    }}
                    editedGradeComposition={item}
                />
            )}

            {showModalDelete && (
                <ModalDeleteGradeComposition
                    isOpen={showModalDelete}
                    close={() => {
                        setShowModalDelete(false);
                    }}
                    deletedGradeComposition={item}
                />
            )}
        </>
    );
});

export default GradeCompositionItem;
