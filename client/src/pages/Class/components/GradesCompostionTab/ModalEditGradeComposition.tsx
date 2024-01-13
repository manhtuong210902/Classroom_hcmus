import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { Button } from "@src/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { useAppDispatch } from "@src/hooks/appHook";
import { updateGradeComposition } from "@src/services/grade/apiRequest";
import { addGradeCompositionSchema } from "@src/utils/schema";
import { GradeComposition } from "@src/utils/types";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

type Props = {
    isOpen: boolean;
    close: () => void;
    editedGradeComposition: GradeComposition;
};

const ModalEditGradeComposition = (props: Props) => {
    const { isOpen, close, editedGradeComposition } = props;
    const params = useParams();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof addGradeCompositionSchema>>({
        resolver: zodResolver(addGradeCompositionSchema),
        defaultValues: {
            name: editedGradeComposition?.name || "",
            scale: editedGradeComposition?.scale || 0,
        },
    });

    async function onSubmit(values: z.infer<typeof addGradeCompositionSchema>) {
        updateGradeComposition(dispatch, params?.id || "", editedGradeComposition?.id || "", values).then((res) => {
            if (res.statusCode === 200) {
                toast.success("Grade Composition Updated Successfully");
                close();
            } else {
                toast.error("Something went wrong !!");
            }
        });
    }

    return (
        <ModalWrapper isOpen={isOpen} width={400}>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-primary text-xl">Update Grade Composition</h2>
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
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
};

export default ModalEditGradeComposition;
