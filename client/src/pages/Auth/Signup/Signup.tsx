import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Github, Mail } from "lucide-react";

import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="max-w-2xl xl:px-[80px] lg:px-[40px] pt-[120px] pb-[20px]">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="text-2xl text-[#262626] font-semibold">
                        Create Your Account
                    </div>
                    <div className="text-sm">
                        Or <span className="text-[#031FEF] underline cursor-pointer"><Link to={'/login'}>Log In</Link></span>
                    </div>
                </div>

                <div className="mt-6 text-[#000000A6] flex flex-col gap-4">
                    <Button className="w-full text-base border-[2px]" variant="outline"><Mail className="mr-2" size={16} />Log in with Google</Button>
                    <Button className="w-full text-base border-[2px]" variant="outline"><Github className="mr-2" size={16} />Log in with Github</Button>
                </div>

                <div className="mt-4 flex justify-center text-[12px] text-[#BFBFBF]">Or create an account with email</div>

                <div className="mt-4 flex flex-col gap-6">
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="name" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="email" id="email" placeholder="your-email@gmail.com" />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <Input className="focus:border-[#2b4afc] focus-visible:ring-transparent" type="confirm-password" id="confirm-password" placeholder="Enter your password" />
                    </div>
                    <Button className="bg-[#031FEF] text-base">Create Your Account</Button>
                </div>
            </div>
        </div>
    )
}