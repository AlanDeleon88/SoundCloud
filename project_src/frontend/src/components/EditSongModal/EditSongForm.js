import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateSong } from '../../store/songs';
import'./EditSong.css'

const EditSongForm = ({showModal, song}) => {
    const songId = song.id
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [songUrl, setSongUrl] = useState(song.url);
    const [imageUrl, setImageUrl] = useState(song.previewImage);
    const [validationErrors, setValidationErrors] = useState([]);
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const song = {
            title,
            description,
            imageUrl,
            songUrl,
            id : songId
        }


        return await dispatch(updateSong(song))
        .then(() => {
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

    return(
        <>
            <div className='add-song-container'>
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

                <form className='add-song-form' onSubmit={handleSubmit}>

                    <div className='song-form-inputs'>
                     <h4>Edit Song:</h4>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <label htmlFor='description'>Description</label>
                        <input id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <label htmlFor='songUrl'>Song-Url</label>
                        <input id='songUrl' type='text' value={songUrl} onChange={(e) => setSongUrl(e.target.value)}/>

                        <label htmlFor='imageUrl'>Image-Url</label>
                        <input id='ImageUrl' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>


                    </div>

                    <button  type='submit'className='song-submit-button' onClick={handleSubmit}>
                            Submit
                    </button>

                </form>
            </div>
        </>
    )
}
export default EditSongForm;
