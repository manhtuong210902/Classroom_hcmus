import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { Button } from "@src/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { useAppDispatch } from "@src/hooks/appHook";
import { createGradeComposition } from "@src/services/grade/apiRequest";
import { addGradeCompositionSchema } from "@src/utils/schema";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

type Props = {
    isOpen: boolean;
    close: () => void;
};

const ModalAddGradeComposition = (props: Props) => {
    const { isOpen, close } = props;
    const params = useParams();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof addGradeCompositionSchema>>({
        resolver: zodResolver(addGradeCompositionSchema),
        defaultValues: {
            name: "",
            scale: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof addGradeCompositionSchema>) {
        createGradeComposition(values, dispatch, params?.id || "").then((res) => {
            if (res.statusCode === 201) {
                toast.success("Grade Composition Added Successfully");
                close();
            } else {
                toast.error("Something went wrong !!");
            }
        });
    }

    return (
        <ModalWrapper isOpen={isOpen} width={400}>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-primary text-xl">Add a Grade Composition</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">
                                        Name <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="scale"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel className="text-primary">
                                        Scale (%) <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter Scale"
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
                            <Button type="submit">Add</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
};

export default ModalAddGradeComposition;
