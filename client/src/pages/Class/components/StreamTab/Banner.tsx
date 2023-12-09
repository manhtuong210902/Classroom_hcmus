import { useAppSelector } from "@src/hooks/appHook";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { InfoIcon } from "lucide-react";

const Banner = () => {
    const currClass = useAppSelector(selectCurrClass);

    return (
        <div className="rounded-xl bg-primary w-full relative h-[250px]">
            <div className="px-6 py-4 absolute left-0 bottom-0">
                <h1 className="text-white text-3xl font-bold">{currClass?.name}</h1>
                <p className="text-white text-lg font-medium mt-3">{currClass?.subject}</p>
            </div>

            <div className="absolute right-0 bottom-0 px-6 py-4">
                <InfoIcon className="text-white" />
            </div>
        </div>
    );
};

export default Banner;
