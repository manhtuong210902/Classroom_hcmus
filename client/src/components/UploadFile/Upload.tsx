import axiosClient from "@src/services/axiosClient";
import { useState } from "react";


const Upload = () =>{

    const [percent, setPersent] = useState(0)

    const generateRandomString = () => {
        const length = 10; 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
    
        return result;
    };

    async function uploadChunk(chunk : Blob, chunkIndex : string, isMultiparts : Boolean, randomString: string){
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkIndex", chunkIndex);
        formData.append("isMultiparts", isMultiparts.toString());
        formData.append("random", randomString)
        
        try {
            const response = await axiosClient.post("http://localhost:3001/api/v1/composition/e0ac9d95-a3db-42f7-b1c9-ae624e652761/management/list-students", 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    async function completeUpload(randomString: string){
        const response = await axiosClient.post("http://localhost:3001/api/v1/composition/e0ac9d95-a3db-42f7-b1c9-ae624e652761/management/list-students/completed",{
            random: randomString
        })
        console.log(response)
    }

    const handleUpload =  async(event :any) => {
            const randomString =  generateRandomString();

            const file = event.target.files[0];
            const chunkSize = 200 * 1024; // Set the desired chunk size (100MB in this example)
            const totalChunks = Math.ceil(file.size / chunkSize);
        
            let isMultiparts : Boolean = true;
            
            if(totalChunks ===1){
                isMultiparts  = false;
            }

            // Iterate over the chunks and upload them sequentially
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);
    
                // Make an API call to upload the chunk to the backend
                await uploadChunk(chunk, chunkIndex.toString(), isMultiparts, randomString);
                const uploaded = parseFloat((100*(chunkIndex+1)/totalChunks).toFixed(2));
                setPersent(uploaded);
            }
            completeUpload(randomString);
            
    }; 
    
    return (
        <>  
            <button id="btn-import">Upload</button>
            <input id="file-input" type="file" onChange={handleUpload}/>
            {
                percent!=0 && <div>uploaded {percent}%</div>
            }

        </>
    )
}

export default Upload;