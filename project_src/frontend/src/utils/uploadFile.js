import { csrfFetch } from "../store/csrf";

const uploadFile = async (file, type) =>{

    let formData = new FormData();

    if(type === 'song'){
        formData.append('song', file)
    }
    else if(type === 'image'){
        formData.append('image', file)
    }
    else{
        throw(new Error('type was not suppported or not defined!'))
    }

    let res = await csrfFetch(`/api/upload/${type}`,{
        method : 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        body:formData
    })

    if(res.ok){
        const data = await res.json()
        const url = data.url;
        return url
    }


}

export default uploadFile
