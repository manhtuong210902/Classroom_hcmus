import { AvatarFallback,Avatar,AvatarImage } from "@src/components/ui/avatar";

const EditAvatar = ()=>{


    return (
        <div className="cursor-pointer">
            <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src="https://github.com/shadcn.pn" />
                <AvatarFallback className="font-semibold">T</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default EditAvatar;