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
    email: z.string().email(),
});

const FormAddEmail = ({ onClose }: { onClose: any }) => {
    const user = useAppSelector(selectUserInfo);
    const emailDefault = user?.email || "";
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: emailDefault,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.email.trim() !== emailDefault.trim()) {
            updateProfileUser(dispatch, user, values);
        }

        onClose();
    }

    return (
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit">Save</Button>
                </AlertDialogFooter>
            </form>
        </Form>
    );
};

export default FormAddEmail;
