import { profileService } from "@src/services/profile/profile.service";
import { Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { getFirstCharacter } from "@src/utils/lib";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo, updateUser } from "@src/store/reducers/authSlice";
import { useState } from "react";
import { Skeleton } from "@src/components/ui/skeleton";

const EditAvatar = () => {
    const user = useAppSelector(selectUserInfo);
    const dipatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const handleUpdateAvatar = async (e: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const response = await profileService.updateAvatar(formData);
        if (response.data.statusCode !== 200) {
        } else {
            const res = await profileService.updateProfile({ imgUrl: response.data.data.imgUrl });
            if (res.data.statusCode === 200) {
                dipatch(
                    updateUser({
                        ...user,
                        imgUrl: response.data.data.imgUrl,
                    })
                );
            }
        }

        setLoading(false);
    };

    return (
        <div className="cursor-pointer">
            <div className="flex flex-col w-[80px] relative group">
                <label
                    htmlFor="fileInput"
                    className={`text-black absolute hidden group-hover:flex left-0 top-0 w-full h-full rounded-full bg-red-50 bg-opacity-50 cursor-pointer justify-center items-center z-10`}
                >
                    <div className="flex items-center flex-col gap-1 text-sm">
                        <Edit /> <span className="font-bold">Edit</span>
                    </div>
                </label>
                <input id="fileInput" type="file" className="hidden" onChange={handleUpdateAvatar} />
                <>
                    {loading ? (
                        <Skeleton className="w-[80px] h-[80px] rounded-full" />
                    ) : (
                        <Avatar className="w-[80px] h-[80px]">
                            <AvatarImage src={user ? user.imgUrl : undefined} />
                            <AvatarFallback className="font-semibold">
                                {user && getFirstCharacter(user?.fullname || user?.username)}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </>
            </div>
        </div>
    );
};

export default EditAvatar;
