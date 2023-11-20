import {ChevronRight  } from "lucide-react";
import { 
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    
} 
from "@src/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@src/components/ui/alert-dialog";
import { UserProfile } from "@src/utils/types";

type Props = {
    userProfile:  UserProfile
}

const BasicInfo : React.FC<Props> = ({userProfile})=>{



    return (
        <div className="flex flex-col mb-30">
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <div className="flex flex-col">
                        <div className="flex flex row p-5 hover:bg-sky-700 cursor-pointer">
                            <div className="flex-1 text-left">Full name</div>
                            <div className="flex-1 text-left">{userProfile.fullname}</div>
                            <div>
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="w-100 h-[1px] border"></div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Fullname</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div></div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>

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
                    <div className="flex-1">{userProfile.gender}</div>
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