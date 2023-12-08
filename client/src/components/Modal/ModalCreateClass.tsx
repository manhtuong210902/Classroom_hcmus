import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createClassSchema } from "@src/utils/schema";
import { Textarea } from "../ui/textarea";
import { createClass } from "@src/services/class/apiRequest";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { toast } from "react-toastify";
import { MessageInfo } from "@src/utils/types";

type Props = {
    isOpen: boolean;
    close: () => void;
};

const ModalCreateClass = (props: Props) => {
    const { isOpen, close } = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUserInfo);

    const form = useForm<z.infer<typeof createClassSchema>>({
        resolver: zodResolver(createClassSchema),
        defaultValues: {
            name: "",
            title: "",
            description: "",
            subject: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createClassSchema>) {
        createClass(values, dispatch, user).then((res: MessageInfo) => {
            if (res.statusCode != 201) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            close();
        });
    }
    return (
        <ModalWrapper isOpen={isOpen} width={400}>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-primary text-xl">Create Class</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">
                                        Class Name <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter class name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter Subject"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-3 flex items-center justify-end gap-3">
                            <Button type="button" variant="outline" onClick={close}>
                                Cancel
                            </Button>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
};

export default ModalCreateClass;
