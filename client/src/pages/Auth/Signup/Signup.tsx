import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { toast } from "react-toastify";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { sigupSchema } from "@src/utils/schema";
import { registerUser } from "@src/services/auth/apiRequest";
import routes from "@src/configs/router";
import LoginSocial from "../components/LoginSoical/LoginSocial";

export default function Signup() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof sigupSchema>>({
        resolver: zodResolver(sigupSchema),
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof sigupSchema>) {
        const res = await registerUser(values);
        if (res?.error) {
            toast.error(res.message);
            return;
        }

        if (res.statusCode === 201) {
            toast.success(res.data.message);
            navigate(routes.LOGIN);
            return;
        } else {
            toast.error(res.data.message);
            return;
        }
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] pt-[40px] pb-[20px] px-3">
            <div className="flex flex-col">
                <div className="flex justify-between items-center flex-col md:flex-row gap-2">
                    <div className="text-2xl text-primary font-bold">Create Your Account</div>
                    <div className="text-base">
                        Or{" "}
                        <span className="text-[#031FEF] underline cursor-pointer">
                            <Link to={"/login"}>Log In</Link>
                        </span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
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
                        <Button type="submit" className="text-base">
                            Create Your Account
                        </Button>
                    </form>
                </Form>

                <LoginSocial />
            </div>
        </div>
    );
}
