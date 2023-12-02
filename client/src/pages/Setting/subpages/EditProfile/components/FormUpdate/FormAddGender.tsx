import { AlertDialogCancel, AlertDialogFooter } from "@src/components/ui/alert-dialog";
import { Button } from "@src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@src/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { updateProfileUser } from "@src/services/profile/apiRequest";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { useForm } from "react-hook-form";

const FormAddGender = ({ onClose }: { onClose: any }) => {
    const user = useAppSelector(selectUserInfo);
    const genderDefault = user?.gender || "Male";
    const dispatch = useAppDispatch();
    const form = useForm({
        defaultValues: {
            gender: genderDefault,
        },
    });

    async function onSubmit(values: any) {
        if (values.gender.trim() !== genderDefault.trim()) {
            updateProfileUser(dispatch, user, values);
        }
        onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary text-bold mb-3">Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Female</FormLabel>
                                    </FormItem>
                                </RadioGroup>
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

export default FormAddGender;
