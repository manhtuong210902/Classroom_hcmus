import { Button } from "@src/components/ui/button";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { completeUpload, getGradeBoard, uploadChunk } from "@src/services/grade/apiRequest";
import { selectCurrClass } from "@src/store/reducers/classSlice";
import { FileType } from "@src/utils/enum";
import { generateRandomString } from "@src/utils/lib";
import { FileUp } from "lucide-react";
import { useState } from "react";

const ImportFile = ({ title, type }: { title: string; type: FileType }) => {
    const [percent, setPersent] = useState(0);
    const currClass = useAppSelector(selectCurrClass);
    const dispatch = useAppDispatch();
    const handleImportButtonClick = () => {
        document.getElementById(`file-upload-${type}`)?.click();
    };

    const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const randomString = generateRandomString();
        const file = e.target.files?.[0];
        const chunkSize = 200 * 1024; // Set the desired chunk size (100MB in this example)
        const totalChunks = Math.ceil(Number(file?.size) / chunkSize);

        let isMultiparts: Boolean = true;

        if (totalChunks === 1) {
            isMultiparts = false;
        }

        // Iterate over the chunks and upload them sequentially
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, Number(file?.size));
            const chunk = file?.slice(start, end);

            const formData = new FormData();
            formData.append("file", chunk as Blob);
            formData.append("chunkIndex", chunkIndex.toString());
            formData.append("isMultiparts", isMultiparts.toString());
            formData.append("random", randomString);

            // Make an API call to upload the chunk to the backend
            await uploadChunk(String(currClass?.id), formData);
            const uploaded = parseFloat(((100 * (chunkIndex + 1)) / totalChunks).toFixed(2));
            setPersent(uploaded);
        }
        await completeUpload(String(currClass?.id), randomString, type);
        await getGradeBoard(dispatch, String(currClass?.id));
    };

    return (
        <label htmlFor={`file-upload-${type}`} className="flex flex-col gap-2">
            <input id={`file-upload-${type}`} type="file" className="hidden" onChange={handleImportFileChange} />
            <Button className="flex items-center gap-2" variant="outline" onClick={handleImportButtonClick}>
                <FileUp size={16} />
                <span className="font-medium">{title}</span>
            </Button>
            {percent != 0 && percent != 100 && <div>Uploading {percent}%</div>}
        </label>
    );
};

export default ImportFile;
