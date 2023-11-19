import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@src/components/ui/form";

import { Github, Mail } from "lucide-react";

import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    username: z.string().min(6, {
        message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number"
    })
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // 
        console.log(values)
    }
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] py-[120px] min-w-[460px]">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="text-2xl text-[#262626] font-semibold">
                        Log in to Classroom
                    </div>
                    <div className="text-sm">
                        Or <span className="text-[#031FEF] underline cursor-pointer"><Link to={"/signup"}>Create Your Account</Link></span>
                    </div>
                </div>

                <div className="mt-6 text-[#000000A6] flex flex-col gap-4">
                    <Button className="w-full text-base border-[2px]" variant="outline"><Mail className="mr-2" size={16} />Log in with Google</Button>
                    <Button className="w-full text-base border-[2px]" variant="outline"><Github className="mr-2" size={16} />Log in with Github</Button>
                </div>

                <div className="mt-4 flex justify-center text-[12px] text-[#BFBFBF]">Or log in with email</div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" placeholder="Enter your username" {...field} />
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="focus:border-[#2b4afc] focus-visible:ring-transparent" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-[#031FEF] text-base">Create Your Account</Button>
                    </form>
                </Form>
                {/* <div className="mt-4 flex flex-col gap-6">
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="email" id="email" placeholder="your-email@gmail.com" />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="password" id="password" placeholder="Enter your password" />
                    </div>

                    <Button className="bg-[#031FEF] text-base">Log In</Button>
                </div> */}
            </div>
        </div>
    )
}