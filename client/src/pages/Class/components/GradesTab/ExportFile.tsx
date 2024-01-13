import { Button } from "@src/components/ui/button";
import { useAppSelector } from "@src/hooks/appHook";
import { exportFile } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { ExportType } from "@src/utils/enum";
import { Download, FileDown } from "lucide-react";
import { toast } from "react-toastify";

const ExportFile = ({ title, type }: { title: string; type: ExportType }) => {
    const currClass = useAppSelector(selectCurrClass);
    const handleExport = async () => {
        exportFile(String(currClass?.id), type, {}).then((res) => {
            if (res.statusCode === 200) {
                toast.success("Export successfully!");
            } else {
                toast.error("Export failed!");
            }
        });
    };

    return (
        <label htmlFor="file-export" className="flex flex-col gap-2">
            <Button className="flex items-center gap-2" onClick={handleExport}>
                {type === ExportType.STUDENT_LIST ? <Download size={16} /> : <FileDown size={16} />}
                <span className="font-medium">{title}</span>
            </Button>
        </label>
    );
};

export default ExportFile;
