import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { useAppSelector } from "@src/hooks/appHook";
import { updateStudentId } from "@src/services/class/apiRequest";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { UserType } from "@src/utils/enum";
import { getFirstCharacter } from "@src/utils/lib";
import { UserInfo } from "@src/utils/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const MemberItem = ({ item, type }: { item: UserInfo; type: UserType }) => {
    const currClass = useAppSelector(selectCurrClass);
    const currUser = useAppSelector(selectUserInfo);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState<string | null>(item?.studentId || null);

    const schema = z.object({
        studentId: z.string().min(1),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            studentId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        updateStudentId(String(currClass?.id), values).then((res) => {
            if (res.statusCode === 200) {
                setValue(values.studentId);
                setShowModal(false);
                toast.success("Student ID updated successfully");
            } else {
                toast.error("Something went wrong !!");
            }
        });
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 py-4 px-6 border-b border-border">
                    <Avatar className="w-[35px] h-[35px]">
                        <AvatarImage src={item?.imgUrl} alt="" />
                        <AvatarFallback className="font-semibold text-sm">
                            {getFirstCharacter(item?.fullname || "")}
                        </AvatarFallback>
                    </Avatar>

                    <span className="text-sm">{item?.fullname}</span>
                </div>

                {value ? (
                    value
                ) : (
                    <>
                        {type === UserType.STUDENT &&
                            currClass &&
                            (currClass?.isTeacher || currClass?.isCreator || currUser?.id === item?.id) && (
                                <Button
                                    className="flex items-center gap-2"
                                    variant="outline"
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    <Plus size={14} />
                                    <span>Add Student ID</span>
                                </Button>
                            )}
                    </>
                )}
            </div>
            {showModal && (
                <ModalWrapper isOpen={showModal} width={300}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={"studentId"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary capitalize">Update Student ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus:border-primary focus-visible:ring-transparent"
                                                placeholder="Enter student ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <AlertDialogFooter className="mt-3 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Save</Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </ModalWrapper>
            )}
        </>
    );
};

export default MemberItem;
