import { Button } from "@src/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import ModalAddGradeComposition from "./ModalAddGradeComposition";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { selectGradeCompositionList, setGradeCompositionList } from "@src/store/reducers/gradeSlice";
import GradeCompositionItem from "./GradeCompositionItem";
import { SortableContainer } from "react-sortable-hoc";
import { GradeComposition } from "@src/utils/types";
import { arrayMoveImmutable } from "array-move";

const GradeCompositionTab = () => {
    const [isShowModalAddGradeComposition, setIsShowModalAddGradeComposition] = useState(false);
    const gradeCompositions = useAppSelector(selectGradeCompositionList);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setIsShowModalAddGradeComposition(false);
    };

    const sortTableProps = useMemo(() => {
        return {
            items: gradeCompositions,
            onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
                dispatch(setGradeCompositionList(arrayMoveImmutable(gradeCompositions, oldIndex, newIndex)));
            },
        };
    }, [gradeCompositions]);
    return (
        <>
            <div className="w-full px-4 md:max-w-[800px] md:mx-auto mt-8">
                <Button
                    className="flex items-center gap-2"
                    onClick={() => {
                        setIsShowModalAddGradeComposition(true);
                    }}
                >
                    <Plus />
                    Add a Grade Composition
                </Button>

                <SortableList {...sortTableProps} />
            </div>
            <ModalAddGradeComposition isOpen={isShowModalAddGradeComposition} close={handleClose} />
        </>
    );
};

const SortableList = SortableContainer(({ items }: { items: GradeComposition[] }) => {
    return (
        <div className="flex flex-col gap-2 mt-4">
            {items.map((value: GradeComposition, index: number) => {
                const gradeCompositionProps = {
                    key: value.id,
                    index,
                    item: value,
                };
                return <GradeCompositionItem {...gradeCompositionProps} />;
            })}
        </div>
    );
});

export default GradeCompositionTab;
