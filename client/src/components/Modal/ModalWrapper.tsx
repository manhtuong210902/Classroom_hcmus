import React from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";

type Props = {
    children: React.ReactElement;
    isOpen: boolean;
    width?: number;
};

const ModalWrapper = (props: Props) => {
    const { isOpen, children, width } = props;

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className={`max-w-[${width}px]`}>{children}</AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalWrapper;
