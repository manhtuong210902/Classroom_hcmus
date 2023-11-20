import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@src/components/ui/alert-dialog";
import { useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import FormAddEmail from "../FormUpdate/FormAddEmail";
import FormAddAddress from "../FormUpdate/FromAddAddress";

const ContactInfo = () => {
    const user = useAppSelector(selectUserInfo);
    const [showModalAddEmail, setShowModalAddEmail] = useState(false);
    const [showModalAddAddress, setShowModalAddAddress] = useState(false);

    return (
        <div className="flex flex-col mb-30">
            <AlertDialog open={showModalAddEmail} onOpenChange={setShowModalAddEmail}>
                <AlertDialogTrigger asChild>
                    <div className="flex flex-col">
                        <div className="flex flex-row p-5 hover:bg-accent cursor-pointer">
                            <div className="flex-1">Email</div>
                            <div className="flex-1">{user?.email || "---"}</div>
                            <div>
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="w-full border-b border-border"></div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <FormAddEmail
                        onClose={() => {
                            setShowModalAddEmail(false);
                        }}
                    />
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={showModalAddAddress} onOpenChange={setShowModalAddAddress}>
                <AlertDialogTrigger>
                    <div className="flex flex-col">
                        <div className="flex flex-row p-5 hover:bg-accent cursor-pointer text-left">
                            <div className="flex-1">Address</div>
                            <div className="flex-1">{user?.address || "---"}</div>
                            <div>
                                <ChevronRight />
                            </div>
                        </div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <FormAddAddress
                        onClose={() => {
                            setShowModalAddAddress(false);
                        }}
                    />
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ContactInfo;
