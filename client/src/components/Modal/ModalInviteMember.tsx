import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { emailSchema } from "@src/pages/Setting/subpages/EditProfile/components/FormUpdate/FormAddEmail";
import { AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@src/hooks/appHook";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { getInviteUrl, sendMailInvite } from "@src/services/class/apiRequest";
import { toast } from "react-toastify";
import { selectUserInfo } from "@src/store/reducers/authSlice";

type Props = {
    isOpen: boolean;
    role: string;
    close: () => void;
};

const ModalInviteMemmber = (props: Props) => {
    const { isOpen, close, role } = props;
    const [inviteLink, setInviteLink] = useState("");
    const currClass = useAppSelector(selectCurrClass);
    const user = useAppSelector(selectUserInfo);

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        if (role === "student" && currClass) {
            getInviteUrl(currClass.id).then((res: any) => {
                if (res?.statusCode !== 200) {
                    toast.error("Fetch invite url error");
                    return;
                }

                setInviteLink(res?.data);
            });
        }
    }, []);

    async function onSubmit(values: z.infer<typeof emailSchema>) {
        sendMailInvite({
            classId: currClass?.id,
            fromUser: user?.fullname,
            email: values.email,
            isTeacher: role === "teacher",
        }).then((res: any) => {
            if (res.statusCode !== 200) {
                toast.error("Sending invitation failed !");
            } else {
                toast.success("Invitation sent successfully");
                close();
            }
        });
    }

    const copy = async (inviteLink: string) => {
        if (!inviteLink) return;
        await navigator.clipboard.writeText(inviteLink);
        toast.success("Copied to clipboard");
    };

    return (
        <ModalWrapper isOpen={isOpen} width={400}>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-primary text-xl">
                    Invite {role === "teacher" ? "Teachers" : "Students"}
                </h2>

                {role === "student" && (
                    <div className="flex items-center">
                        <div className="flex flex-col flex-1 truncate">
                            <h2 className="font-bold text-base">Invite Link</h2>
                            <span className="text-xs max-w-[300px] truncate">{inviteLink}</span>
                        </div>
                        <CopyIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                                copy(inviteLink);
                            }}
                        />
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter className="mt-3">
                            <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
                            <Button type="submit">Invite</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
};

export default ModalInviteMemmber;
