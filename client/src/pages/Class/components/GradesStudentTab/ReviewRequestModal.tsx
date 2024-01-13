import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Textarea } from "@src/components/ui/textarea";
import { requestReview } from "@src/services/review/apiRequest";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ReviewRequestModal = ({
    isOpen,
    close,
    gradeId,
    classId,
}: {
    isOpen: boolean;
    close: () => void;
    gradeId: string;
    classId: string;
}) => {
    const schema = z.object({
        expectedGrade: z.coerce.number().min(0).max(10),
        explaination: z.string().min(1),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            expectedGrade: 0,
            explaination: "",
        },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        requestReview(classId, {
            gradeId,
            expectedGrade: Number(values.expectedGrade),
            explaination: values.explaination,
        }).then((res) => {
            if (res?.statusCode === 201) {
                toast.success("Request review successfully !!");
                close();
            }
        });
    }

    return (
        <ModalWrapper isOpen={isOpen} width={450}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="expectedGrade"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel className="text-primary capitalize">Expected grade</FormLabel>
                                <FormControl>
                                    <Input
                                        className="focus:border-primary focus-visible:ring-transparent"
                                        placeholder={`Enter expected grade`}
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="explaination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary capitalize">
                                    Explaination for requesting review
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="focus:border-primary focus-visible:ring-transparent"
                                        placeholder={`Enter explaination`}
                                        {...field}
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <AlertDialogFooter className="mt-3 flex gap-2">
                        <Button type="button" variant="outline" onClick={close}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </AlertDialogFooter>
                </form>
            </Form>
        </ModalWrapper>
    );
};

export default ReviewRequestModal;
