import uploadMultiFiles from "../../utils/uploadMultiFiles";
import { useState } from "react";

const MultiUploadUtil= () =>{
    const[fileUrls, setFileUrls] = useState([])

    const handleFileChange = e =>{
        const files = Object.values(e.target.files);
        // console.log(files);
        // let urls;

        uploadMultiFiles(files, 'songs').then(res =>{
            // urls = res;
            // console.log(urls);
            setFileUrls(res);

        })

    }

    const handleMultiImage = e =>{
        const files = Object.values(e.target.files);
        // console.log(files);
        // let urls;

        uploadMultiFiles(files, 'images').then(res =>{
            // urls = res;
            // console.log(urls);
            setFileUrls(res);

        })

    }


    return(
        <>
            <div>
                <label>Upload multiple songs</label>
                <input type='file' onChange={handleFileChange} multiple/>
            </div>
            <div>
                <label>
                    Upload multiple images
                </label>
                <input type='file' onChange={handleMultiImage} multiple/>
            </div>
            {
                fileUrls.map((el,i) =>{
                    return(
                        <div key={i}>
                            {`"${el}"`}
                        </div>
                    )
                })
            }

        </>
    )

}

export default MultiUploadUtil
