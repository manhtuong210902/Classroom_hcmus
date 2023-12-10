import NotFoundSVG from "@image/svg_not_found.svg";
const NotFound = () => {
    return (
        <div className="w-full flex flex-col gap-5 items-center justify-center h-80 mt-5">
            <img src={NotFoundSVG} alt="not-found" className="w-[300px] object-cover" />
            <span className="text-lg font-semibold">Page Not Found</span>
        </div>
    );
};

export default NotFound;
