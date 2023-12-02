import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { requestResetPassword } from "@src/services/auth/apiRequest";
import { emailSchema } from "@src/pages/Setting/subpages/EditProfile/components/FormUpdate/FormAddEmail";
import { toast } from "react-toastify";

export default function RequestResetPassword() {
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof emailSchema>) {
        const res = await requestResetPassword(values);

        if (res?.error) {
            toast.error(res.message);
        }

        toast.info(res.message);
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] py-[40px] px-3">
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="text-2xl text-primary font-bold">Request Reset Password</div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
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

                        <Button type="submit" className="text-base">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
