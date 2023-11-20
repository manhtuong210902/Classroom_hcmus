import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@src/components/ui/form";
import { Github, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@src/utils/schema";
import { useAppDispatch } from "@src/hooks/appHook";
import { useState } from "react";
import { loginUser } from "@src/services/auth/apiRequest";
import routes from "@src/configs/router";

export default function Login() {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
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
            setError(res.message[0].message);
            return;
        }

        navigate(routes.HOME);
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] py-[40px] px-3">
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="text-2xl text-primary font-bold">Log in to Education</div>
                    <span className="text-[#031FEF] underline cursor-pointer">
                        <Link to={"/signup"}>Create new account</Link>
                    </span>
                </div>

                <div className="mt-6 text-primary flex flex-col gap-4">
                    <Button className="w-full text-base border-[2px]" variant="outline">
                        <Mail className="mr-2" size={16} />
                        Log in with Google
                    </Button>
                    <Button className="w-full text-base border-[2px]" variant="outline">
                        <Github className="mr-2" size={16} />
                        Log in with Github
                    </Button>
                </div>

                <div className="mt-4 flex justify-center text-[12px] text-[#BFBFBF]">Or log in with email</div>

                {error && <div className="text-destructive text-sm text-center font-medium mt-3">{error}</div>}

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
                        <Button type="submit" className="text-base">
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
