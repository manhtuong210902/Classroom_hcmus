import LogoImg from "@image/img_book.png";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Button } from "@src/components/ui/button";
import { getFirstCharacter } from "@src/utils/lib";

const InvitePage = () => {
    return (
        <div className="flex items-center gap-3 w-full md:px-0 md:max-w-[800px] md:mx-auto mt-6">
            <div className="w-full rounded-lg border border-border">
                <div className="flex flex-col items-center gap-6 p-8 bg-accent">
                    <img src={LogoImg} alt="logo" className="w-[100px] object-cover" />
                    <h1 className="text-3xl font-bold">Education</h1>
                    <p className="text-sm text-center">
                        Education helps classes communicate, save time, and stay <br /> organized. Learn more
                    </p>
                </div>
                <div className="flex flex-col items-center gap-6 p-8">
                    <div className="flex items-center gap-3 py-2 px-4 border rounded-lg border-border">
                        <Avatar className="w-[35px] h-[35px]">
                            <AvatarImage src={undefined} alt="" />
                            <AvatarFallback className="font-semibold text-sm">
                                {getFirstCharacter("hello")}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-sm">Manh Tuong</span>
                    </div>
                    <span className="text-xs">You are joining the class as a student.</span>
                    <Button>Join class</Button>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
