import {useState} from 'react';
import { useDispatch } from 'react-redux';
import uploadFile from '../../utils/uploadFile';
import './CreateSongInAlbum.css'
import { addAlbumSong } from '../../store/songs';
//create an edit song route to add a single to an album
//create a get singles song route to get a users songs that dont have an album id.


const CreateSongInAlbumForm = ({album}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newSong, setNewSong] = useState(true)
    const dispatch = useDispatch();


    const handleAddSong = e => {

    }

    const handleCancel = e=>{

    }

    return(
        <>
            <div className='create-song-album-main-container'>

                <div className='create-song-album-header'>
                    <div>
                        Add song :
                    </div>
                    <div className='create-song-album-title'>
                        {`${album.title}`}
                    </div>
                </div>

                <div className='create-song-album-choice-container'>
                    <div className='create-song-album-new-song create-song-album-tab'>
                        Add a new song
                    </div>

                    <div className='create-song-album-existing-song create-song-album-tab'>
                        Add existing single
                    </div>

                </div>

                <div className='create-song-album-content-container'>
                    { newSong ?
                        (
                            <>
                                <div className='create-song-album-form-container'>

                                    <div className='create-song-album-title-form-container create-song-album-form-bundle'>
                                        <label>
                                            Title
                                        </label>
                                        <input type='text' className='create-song-album-input'/>
                                    </div>

                                    <div className='create-song-album-description-form-container create-song-album-form-bundle'>
                                        <label>
                                            Description
                                        </label>
                                        <input type='text' className='create-song-album-input'/>
                                    </div>
                                    <div className='create-song-upload-container'>
                                        <div className='create-song-upload-filename'>

                                        </div>
                                        <div className='create-song-upload-button'>
                                            Upload Song
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                        :
                        (
                            <>

                            </>
                        )

                    }

                </div>

                <div className='create-song-album-buttons-container'>

                    <div className='create-song-album-button create-song-album-add-song'>
                        Add Song
                    </div>
                    <div className='create-song-album-button create-song-album-cancel'>
                        Cancel
                    </div>

                </div>




            </div>
        </>
    )


}

export default CreateSongInAlbumForm
