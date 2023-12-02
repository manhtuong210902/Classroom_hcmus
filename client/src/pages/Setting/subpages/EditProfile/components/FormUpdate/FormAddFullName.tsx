import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel, AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { updateProfileUser } from "@src/services/profile/apiRequest";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
    fullname: z.string().min(1, { message: "Fullname is required field" }).min(6, {
        message: "Full name must be at least 6 characters.",
    }),
});

const FormAddFullName = ({ onClose }: { onClose: any }) => {
    const user = useAppSelector(selectUserInfo);
    const fullNameDefault = user?.fullname || "";
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: fullNameDefault,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.fullname.trim() !== fullNameDefault.trim()) {
            updateProfileUser(dispatch, user, values);
        }

        onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary">Full name</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus:border-primary focus-visible:ring-transparent"
                                    placeholder="Enter your full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AlertDialogFooter className="mt-3">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit">Save</Button>
                </AlertDialogFooter>
            </form>
        </Form>
    );
};

export default FormAddFullName;
