import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@src/utils/schema";
import { useAppDispatch } from "@src/hooks/appHook";
import { loginUser } from "@src/services/auth/apiRequest";
import routes from "@src/configs/router";
import LoginSocial from "../components/LoginSoical/LoginSocial";
import { toast } from "react-toastify";
import { LocalStorage } from "@src/utils/LocalStorage";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const redirectUrl = LocalStorage.getRedirectUrl();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const res = await loginUser(dispatch, values);
        if (res.error) {
            toast.error(res.message);
            return;
        }

        navigate(redirectUrl || routes.HOME);
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] py-[40px] px-3">
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="text-2xl text-primary font-bold">Log in to Education</div>
                    <span className="text-[#031FEF] underline cursor-pointer">
                        <Link to={routes.SIGNUP}>Create new account</Link>
                    </span>
                </div>

                <LoginSocial />

                <div className="mt-4 flex justify-center text-[12px] text-[#BFBFBF]">Or log in with username</div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus:border-primary focus-visible:ring-transparent"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                        <span className="text-[#031FEF] underline cursor-pointer text-right">
                            <Link to={routes.REQUEST_RESET_PASSWORD}>Forgot password?</Link>
                        </span>
                        <Button type="submit" className="text-base">
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
