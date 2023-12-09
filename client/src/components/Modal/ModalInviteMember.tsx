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

type Props = {
    isOpen: boolean;
    role: string;
    close: () => void;
};

const ModalInviteMemmber = (props: Props) => {
    const { isOpen, close, role } = props;

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof emailSchema>) {
        console.log(values);
    }
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
                            <span className="text-xs max-w-[300px] truncate">
                                https://classroom.google.com/c/NjQyMzQ0NjMzOTc4?cjc=25jgp
                            </span>
                        </div>
                        <CopyIcon className="w-4 h-4 cursor-pointer" />
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
