import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addAlbumSong } from '../../store/songs';


const AddSongForm = ({showModal, album}) => {
    const albumId = album.id;
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const song = {
            title,
            description,
            imageUrl,
            songUrl,
            albumId
        }
        // console.log(album);

        return await dispatch(addAlbumSong(song))
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
                     <h4>Add Song:</h4>
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
export default AddSongForm;
