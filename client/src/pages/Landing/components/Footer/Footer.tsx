import { FacebookIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
    return (
        <div className="w-full bg-primary text-white">
            <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-5 py-10">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Products</h3>
                    <p className="text-sm cursor-pointer hover:underline">Classroom</p>
                    <p className="text-sm cursor-pointer hover:underline">Google meet</p>
                    <p className="text-sm cursor-pointer hover:underline">Assignments</p>
                    <p className="text-sm cursor-pointer hover:underline">Chromebooks</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Our Team</h3>
                    <p className="text-sm cursor-pointer hover:underline">Nguyen Lam Truong</p>
                    <p className="text-sm cursor-pointer hover:underline">Nguyen Thanh Tung</p>
                    <p className="text-sm cursor-pointer hover:underline">Nguyen Manh Tuong</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">About for Education</h3>
                    <p className="text-sm cursor-pointer hover:underline">Our commitment</p>
                    <p className="text-sm cursor-pointer hover:underline">Schools</p>
                    <p className="text-sm cursor-pointer hover:underline">For higher ed</p>
                    <p className="text-sm cursor-pointer hover:underline">Privacy & security</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Socials</h3>
                    <div className="flex gap-2 items-center">
                        <TwitterIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Twitter</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FacebookIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Facebook</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LinkedinIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">LinkedIn</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <GithubIcon className="w-5 h-5" />
                        <p className="text-sm cursor-pointer hover:underline">Github</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
