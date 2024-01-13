import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { Button } from "@src/components/ui/button";
import { useAppDispatch } from "@src/hooks/appHook";
import { deleteGradeComposition } from "@src/services/grade/apiRequest";
import { GradeComposition } from "@src/utils/types";
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    close: () => void;
    deletedGradeComposition: GradeComposition;
};

const ModalDeleteGradeComposition = (props: Props) => {
    const { isOpen, close, deletedGradeComposition } = props;
    const dispatch = useAppDispatch();

    const handleClickDelete = async () => {
        deleteGradeComposition(
            dispatch,
            deletedGradeComposition?.classId || "",
            deletedGradeComposition?.id || ""
        ).then((res) => {
            if (res.statusCode === 200) {
                toast.success("Grade Composition Deleted Successfully");
            } else {
                toast.error("Something went wrong !!");
            }
        });
        close();
    };

    return (
        <ModalWrapper isOpen={isOpen} width={300}>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-primary text-xl">Delete Grade Composition</h2>

                <div>
                    <p className="text-sm">
                        Are you sure you want to delete{" "}
                        <span className="font-bold">{deletedGradeComposition?.name}</span>?
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                        <Button type="button" className="flex-1" variant="outline" onClick={close}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive" className="flex-1" onClick={handleClickDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ModalDeleteGradeComposition;
