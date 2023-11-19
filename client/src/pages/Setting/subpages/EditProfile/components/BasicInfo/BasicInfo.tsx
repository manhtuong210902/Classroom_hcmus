import {ChevronRight  } from "lucide-react";


const BasicInfo = ()=>{
    return (
        <div className="flex flex-col mb-30">
            <div className="flex flex-col">
                <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                    <div className="flex-1">Full name</div>
                    <div className="flex-1">Nguyễn Thanh Tùng</div>
                    <div>
                        <ChevronRight/>
                    </div>
                </div>
                <div className="w-100 h-[1px] border"></div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                    <div className="flex-1">Date of birth</div>
                    <div className="flex-1">24/08/2002</div>
                    <div>
                        <ChevronRight/>
                    </div>
                </div>
                <div className="w-100 h-[1px] border"></div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                    <div className="flex-1">Gender</div>
                    <div className="flex-1">Male</div>
                    <div>
                        <ChevronRight/>
                    </div>
                </div>
                <div className="w-100 h-[1px] border"></div>
            </div>
            
        </div>
    )
}

export default BasicInfo