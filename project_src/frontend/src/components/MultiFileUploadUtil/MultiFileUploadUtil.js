import uploadMultiFiles from "../../utils/uploadMultiFiles";
import { useState } from "react";

const MultiUploadUtil= () =>{
    const[fileUrls, setFileUrls] = useState([])

    const handleFileChange = e =>{
        const files = Object.values(e.target.files);
        // console.log(files);
        // let urls;

        uploadMultiFiles(files).then(res =>{
            // urls = res;
            // console.log(urls);
            setFileUrls(res);

        })

    }


    return(
        <>
            <div>
                <input type='file' onChange={handleFileChange} multiple/>
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
