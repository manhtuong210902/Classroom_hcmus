import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import ModalWrapper from "@src/components/Modal/ModalWrapper";
import { AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { useAppSelector } from "@src/hooks/appHook";
import { updateGradeBoard } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const EditValueColumn = ({
    defaultValue,
    name,
    studentId,
    gradeId,
    type = "text",
    className,
}: {
    defaultValue: string;
    name: string;
    studentId: string;
    gradeId: string;
    type?: string;
    className?: string;
}) => {
    const [value, setValue] = useState<string | number | null>(defaultValue);
    const [showEdit, setShowEdit] = useState(false);
    const currClass = useAppSelector(selectCurrClass);

    const schema = z.object({
        [name]: type === "number" ? z.coerce.number().min(0).max(10) : z.string().min(1),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            [name]: defaultValue,
        },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        if (values[name].toString().trim() !== defaultValue.toString().trim()) {
            await updateGradeBoard(String(currClass?.id), {
                studentId,
                gradeId,
                [name]: type === "number" ? Number(values[name]) : values[name],
            })
                .then(() => {
                    setValue(values[name]);
                })
                .catch(() => {
                    toast.error("Something went wrong !!");
                });
        }
    }

    return (
        <>
            <div className={`flex items-center gap-1 ${className}`}>
                <span>{value}</span>
                <Edit
                    size={12}
                    className="cursor-pointer"
                    onClick={() => {
                        setShowEdit(true);
                    }}
                />
            </div>
            {showEdit && (
                <ModalWrapper isOpen={showEdit} width={300}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary capitalize">{name}</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus:border-primary focus-visible:ring-transparent"
                                                placeholder={`Edit ${name}`}
                                                type={type}
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
                                        setShowEdit(false);
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

export default EditValueColumn;
