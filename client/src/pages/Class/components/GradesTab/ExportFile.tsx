import { Button } from "@src/components/ui/button";
import { FileDown } from "lucide-react";

const ExportFile = () => {
    return (
        <label htmlFor="file-export" className="flex flex-col gap-2">
            <Button className="flex items-center gap-2">
                <FileDown size={16} />
                <span className="font-medium">Export</span>
            </Button>
        </label>
    );
};

export default ExportFile;
