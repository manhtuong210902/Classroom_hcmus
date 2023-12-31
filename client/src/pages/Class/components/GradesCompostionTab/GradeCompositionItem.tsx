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
import { Edit, MoreVertical, Terminal, Trash } from "lucide-react";
import { useState } from "react";
import { SortableElement } from "react-sortable-hoc";
import ModalEditGradeComposition from "./ModalEditGradeComposition";
import ModalDeleteGradeComposition from "./ModalDeteteCompositon";

const GradeCompositionItem = SortableElement(({ item }: { item: GradeComposition }) => {
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleClickEdit = async () => {
        setShowModalEdit(true);
    };

    const handleClickDetete = async () => {
        setShowModalDelete(true);
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
                                <MenubarItem onClick={handleClickEdit}>
                                    Edit
                                    <MenubarShortcut>
                                        <Edit className="h-4 w-4" />
                                    </MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={handleClickDetete}>
                                    Delete
                                    <MenubarShortcut>
                                        <Trash className="h-4 w-4" />
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
