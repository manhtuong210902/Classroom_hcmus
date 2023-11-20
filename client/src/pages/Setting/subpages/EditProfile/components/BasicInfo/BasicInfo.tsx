import { ChevronRight } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@src/components/ui/alert-dialog";
import { useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import FormAddFullName from "../FormUpdate/FormAddFullName";
import { useState } from "react";
import FormAddGender from "../FormUpdate/FormAddGender";

const BasicInfo = () => {
    const user = useAppSelector(selectUserInfo);
    const [showModalAddFullName, setShowModalAddFullName] = useState(false);
    const [showModalGender, setShowModalGender] = useState(false);

    return (
        <div className="flex flex-col mb-30">
            <AlertDialog open={showModalAddFullName} onOpenChange={setShowModalAddFullName}>
                <AlertDialogTrigger asChild>
                    <div className="flex flex-col">
                        <div className="flex row p-5 hover:bg-accent cursor-pointer">
                            <div className="flex-1 text-left">Full name</div>
                            <div className="flex-1 text-left">{user?.fullname}</div>
                            <div>
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="w-full border-b border-border"></div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <FormAddFullName
                        onClose={() => {
                            setShowModalAddFullName(false);
                        }}
                    />
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex flex-col">
                <div className="flex flex-row p-5 hover:bg-accent cursor-pointer">
                    <div className="flex-1">Date of birth</div>
                    <div className="flex-1">---</div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
                <div className="w-100 border-b"></div>
            </div>
            <div className="flex flex-col">
                <AlertDialog open={showModalGender} onOpenChange={setShowModalGender}>
                    <AlertDialogTrigger>
                        <div className="flex flex-row p-5 hover:bg-accent cursor-pointer text-left">
                            <div className="flex-1">Gender</div>
                            <div className="flex-1">{user?.gender || "---"}</div>
                            <div>
                                <ChevronRight />
                            </div>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <FormAddGender
                            onClose={() => {
                                setShowModalGender(false);
                            }}
                        />
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default BasicInfo;
