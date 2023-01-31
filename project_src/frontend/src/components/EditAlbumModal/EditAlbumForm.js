import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAlbum } from "../../store/albums";
import { csrfFetch } from "../../store/csrf";

const EditAlbumForm = ({album, showModal}) => {
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    //!replace with preview image after re-seeding db with demo images.
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    // const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAlbum = {
            title,
            description,
            imageUrl,
            id : album.id
        }

        return await dispatch(updateUserAlbum(updatedAlbum))
        .then(() =>{
            showModal(false);
        })
        .catch(async (res) =>{
            const data = await res.json();
            const errors = data.errors;
            // setHasSubmitted(true);
            if(data.errors && data){
                setValidationErrors(errors);
            }

        });

    }


    const updateImage = async e =>{
        const image = e.target.files[0]
        // console.log(image);
        const formData = new FormData()

        if(image){
            formData.append('image', image)
            const res = await csrfFetch('/api/upload/image',{
                method : 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
                body:formData
            })
            if(res.ok){
                const data = await res.json();
                const img_url = data.url
                // console.log(img_url);
                setImageUrl(img_url)
            }
            else{
                //! debug error handle
                window.alert('uh oh something happened')
            }
        }
    }

    return(

        <>
        <div className='edit-album-container'>
            {validationErrors.length > 0 &&(
                <>
                    <ul className='error-list'>
                        {validationErrors.map((error, i) =>{
                            return(
                                <li key={i}>
                                    {error}
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}

            <form className='edit-album-form' onSubmit={handleSubmit}>

                <div className='album-form-inputs'>
                 <h4>Edit Album:</h4>
                    <label htmlFor='title'>Title</label>
                    <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <label htmlFor='description'>Description</label>
                    <input id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>

                    {/* <label htmlFor='imageUrl'>Image-Url</label>
                    <input id='ImageUrl' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/> */}

                    <label>
                        edit album image
                    </label>
                    <input type='file' accept="image/*" onChange={updateImage}/>
                </div>

                <div className="edit-album-img-prev-container">
                    {imageUrl &&
                        <img src={imageUrl} style={{'height' : '50px', 'width' : '50px'}} alt={`${imageUrl}`}/>
                    }
                </div>
                <button  type='submit'className='album-submit-button' onClick={handleSubmit}>
                        Submit
                </button>

            </form>
        </div>
    </>

    )

}


export default EditAlbumForm;
