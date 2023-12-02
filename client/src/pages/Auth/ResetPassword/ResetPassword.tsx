import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@src/services/auth/apiRequest";
import routes from "@src/configs/router";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "@src/utils/schema";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const email = searchParams.get("email");

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        if (!token || !email) {
            toast.error("Missing data !!");
            return;
        }

        const res = await resetPassword({
            token,
            email,
            newPassword: values.password,
        });

        if (res?.error) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        navigate(routes.LOGIN);
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] py-[40px] px-3">
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="text-2xl text-primary font-bold">Reset Password</div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mb-2 flex flex-col gap-2 text-sm list-disc">
                            <span>At least 8 characters</span>
                            <span>Contain 1 uppercase letter (A-Z)</span>
                            <span>Contain 1 lowercase letter (a-z)</span>
                            <span>Contain 1 special number (0-9)</span>
                            <span>Contain 1 special symbol (@#$!%*?&)</span>
                        </div>

                        <Button type="submit" className="text-base">
                            Confirm
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
