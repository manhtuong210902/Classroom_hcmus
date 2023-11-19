import { Popover, PopoverContent, PopoverTrigger } from "@src/components/ui/popover";
import { AvatarFallback,Avatar,AvatarImage } from "@src/components/ui/avatar";

const EditAvatar = ()=>{
    return (
        <div className="cursor-pointer">
            <Popover>
                <PopoverTrigger>
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage src="https://github.com/shadcn.pn" />
                        <AvatarFallback className="font-semibold">T</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>

                <PopoverContent>
                    <div>
                        <div className="flex flex-col justify-center items-center gap-2 py-4 border-b border-border">
                            <Avatar className="w-[50px] h-[50px]">
                                <AvatarImage src="https://github.com/shadcn.pn" />
                                <AvatarFallback className="font-semibold text-xl">T</AvatarFallback>
                            </Avatar>
                            <div className="capitalize font-medium">NGUYEN MANH TUONG</div>
                        </div>

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default EditAvatar;