import { useAppSelector } from "@src/hooks/appHook";
import { selectUserInfo } from "@src/store/reducers/authSlice";
import { ChevronRight } from "lucide-react";

const ContactInfo = () => {
    const user = useAppSelector(selectUserInfo);

    return (
        <div className="flex flex-col mb-30">
            <div className="flex flex-col">
                <div className="flex flex-row p-5 hover:bg-accent cursor-pointer">
                    <div className="flex-1">Email</div>
                    <div className="flex-1">{user?.email || "---"}</div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
                <div className="w-full border-b border-border"></div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row p-5 hover:bg-accent cursor-pointer">
                    <div className="flex-1">Address</div>
                    <div className="flex-1">{user?.address || "---"}</div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
