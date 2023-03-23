import { csrfFetch } from "../store/csrf";

const uploadMultiFiles = async (files, type) =>{

    let formData = new FormData();

    for(let i = 0; i < files.length; i++){
        if(type === 'songs'){

            formData.append('songs', files[i])
        }
        else{
            formData.append('images', files[i])
        }

    }
    if(type==='songs'){
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
    else{
        let res = await csrfFetch(`/api/upload/multi-image`,{
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


}

export default uploadMultiFiles
