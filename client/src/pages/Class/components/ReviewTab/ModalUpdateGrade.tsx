import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { updateFinalGrade } from "@src/services/review/apiRequest";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ModalUpdateGrade = ({
    isOpen,
    close,
    studentId,
    gradeId,
    classId,
}: {
    isOpen: boolean;
    close: () => void;
    studentId: string;
    gradeId: string;
    classId: string;
}) => {
    const schema = z.object({
        finalGrade: z.coerce.number().min(0).max(10),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            finalGrade: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        updateFinalGrade(classId, {
            gradeId,
            studentId,
            finalGrade: Number(values.finalGrade),
        }).then((res) => {
            if (res?.statusCode === 200) {
                toast.success("Update grade successfully !!");
                close();
            }
        });
    }

    return (
        <ModalWrapper isOpen={isOpen} width={300}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="finalGrade"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel className="text-primary capitalize">Update Grade</FormLabel>
                                <FormControl>
                                    <Input
                                        className="focus:border-primary focus-visible:ring-transparent"
                                        placeholder={`Enter final grade`}
                                        type="number"
                                        {...field}
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

export default ModalUpdateGrade;
