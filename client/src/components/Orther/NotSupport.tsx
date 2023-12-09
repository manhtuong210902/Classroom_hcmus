import { XOctagon } from "lucide-react";

const NotSupport = () => {
    return (
        <div className="w-full flex flex-col gap-5 items-center justify-center h-80">
            <XOctagon className="w-[100px] h-[100px]" />
            <span className="text-base font-medium">This feature is not yet supported</span>
        </div>
    );
};

export default NotSupport;
