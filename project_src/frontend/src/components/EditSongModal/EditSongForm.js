import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../../store/songs';
import { getArtist } from '../../store/artist'
import { loadUserAlbums } from '../../store/albums';
import { Modal } from '../../context/Modal';
import DeleteSong from '../DeleteSongModal/DeleteSong';
import'./EditSong.css'

const EditSongForm = ({setShowEditModal, song}) => {
    const songId = song.id
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title);
    const [inputtedTitle, setInputtedTitle] = useState(false)
    const [inputtedDesc, setInputtedDesc] = useState(false)
    const [description, setDescription] = useState(song.description);
    const [showDelete, setShowDelete] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateTitle = e =>{
        setTitle(e.target.value)
        setInputtedTitle(true)
    }

    const updateDesc = e =>{
        setDescription(e.target.value)
        setInputtedDesc(true)
    }

    const handleDelete = e =>{
        setShowDelete(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const song = {
            title,
            description,
            id : songId
        }


        return await dispatch(updateSong(song))
        .then(() => {
            dispatch(getArtist(user.id))
            dispatch(loadUserAlbums(user.id))
            setShowEditModal(false);


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
                        <ul className='error-list error'>
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
                <div className='edit-song-header'>
                    Edit Song
                </div>

                <div className='edit-song-form-container'>

                    <div className='edit-song-input-bundle'>
                        <label className='edit-song-label'>
                            Title
                        </label>
                        <input type='text' className='edit-song-input' value={inputtedTitle ? title : song.title} onChange={updateTitle}/>
                    </div>

                    <div className='edit-song-input-bundle'>
                        <label className='edit-song-label'>
                            Description
                        </label>
                        <input type='text' className='edit-song-input' value={inputtedDesc ? description : song.description} onChange={updateDesc}/>
                    </div>

                </div>
                <div className='edit-song-buttons-background'>

                    <div className='edit-song-buttons-container'>
                        <div className='edit-song-button edit-song-delete' onClick={handleDelete}>
                            Delete
                        </div>
                        <div className='edit-song-button-bundle'>
                            <div className='edit-song-button edit-song-save' onClick={handleSubmit}>
                                Save
                            </div>
                            <div className='edit-song-button edit-song-cancel' onClick={() => setShowEditModal(false)}>
                                Cancel
                            </div>
                        </div>

                </div>

                </div>
                {
                    showDelete &&
                    <Modal onClose={() => setShowDelete(false)}>
                        <DeleteSong setShowDelete={setShowDelete} song={song} setShowEditModal={setShowEditModal}/>
                    </Modal>
                }


            </div>
        </>
    )
}
export default EditSongForm;
