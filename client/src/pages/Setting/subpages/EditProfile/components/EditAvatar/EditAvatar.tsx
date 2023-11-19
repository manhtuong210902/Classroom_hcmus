import { useState } from "react";
import { profileService } from "@src/services/setting/profile.service";


const EditAvatar = ()=>{
    const [imgUrl,setImgUrl] = useState("https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg")
    const [hover,setHover] = useState("hidden")

    const handleUpdateAvatar = async (e : any)=>{
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const response = await profileService.updateAvatar(formData);
        if(response.data.statusCode !== 200){

        }
        else {
            setImgUrl(response.data.data.imgUrl);
        }
    }

    return (
        <div className="cursor-pointer">
            
            <div className="flex flex-col w-[100px] relative">
                <label
                    htmlFor="fileInput"
                    className={`text-black absolute ${hover} rounded-full w-[100px] h-[100px] bg-red-50 bg-opacity-50 flex cursor-pointer justify-center items-center z-10`}
                    onMouseOut={() => setHover("hidden")}
                >
                    Update
                </label>
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleUpdateAvatar}
                /> 

                <img
                    className="w-[100px] rounded-full"
                    src ={imgUrl}
                    onMouseOver={()=>setHover("")}
                >
                </img> 
            </div>
        </div>
    )
}

export default EditAvatar;