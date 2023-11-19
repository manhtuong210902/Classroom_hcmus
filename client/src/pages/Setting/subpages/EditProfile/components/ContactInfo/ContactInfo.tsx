import {ChevronRight  } from "lucide-react";


const ContactInfo = ()=>{
    return (
        <div className="flex flex-col mb-30">
            <div className="flex flex-col">
                <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                    <div className="flex-1">Email</div>
                    <div className="flex-1">Tunghcltt@gmail.com</div>
                    <div>
                        <ChevronRight/>
                    </div>
                </div>
                <div className="w-100 h-[1px] border"></div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                    <div className="flex-1">Address</div>
                    <div className="flex-1">...</div>
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

export default ContactInfo