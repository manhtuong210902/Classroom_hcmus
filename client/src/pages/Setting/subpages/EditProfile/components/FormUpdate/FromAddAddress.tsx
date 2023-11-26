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
    address: z.string().min(1, { message: "Address is required field" }),
});

const FormAddAddress = ({ onClose }: { onClose: any }) => {
    const user = useAppSelector(selectUserInfo);
    const addressDefault = user?.address || "";
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: addressDefault,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.address.trim() !== addressDefault.trim()) {
            updateProfileUser(dispatch, user, values);
        }

        onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary">Address</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus:border-primary focus-visible:ring-transparent"
                                    placeholder="Enter your address"
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

export default FormAddAddress;
