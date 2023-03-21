import { csrfFetch } from "../store/csrf";

const uploadMultiFiles = async (files) =>{

    let formData = new FormData();

    for(let i = 0; i < files.length; i++){
        formData.append('songs', files[i])
    }

    let res = await csrfFetch(`/api/upload/multi-song`,{
        method : 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        body:formData
    })

    if(res.ok){
        const data = await res.json()
        const urls = data.urls;
        return urls
    }


}

export default uploadMultiFiles
