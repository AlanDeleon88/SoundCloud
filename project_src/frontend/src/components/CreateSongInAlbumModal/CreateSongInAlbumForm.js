import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadFile from '../../utils/uploadFile';
import { csrfFetch } from '../../store/csrf';
import './CreateSongInAlbum.css'
import { addAlbumSong } from '../../store/songs';
import { addSongToAlbum } from '../../store/songs';
import { loadUserAlbums } from '../../store/albums';
import { getArtist } from '../../store/artist';
import ExistingSongToAlbum from './ExistingSongToAlbum';
//create an edit song route to add a single to an album
//create a get singles song route to get a users songs that dont have an album id.


const CreateSongInAlbumForm = ({album, setShowModal}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [songUrl, setSongUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [newSong, setNewSong] = useState(true)
    const [songId, setSongId] = useState(0)
    const [filename, setFilename] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const updateSong = e =>{
        const song = e.target.files[0]

        if(song){
            setIsUploading(true)
            uploadFile(song, 'song').then(res =>{
                setFilename(song.name)
                setIsUploading(false)
                setSongUrl(res)
            }).catch(async (res) =>{
                const data = await res.json()
                console.log(data);
            })

        }

    }

    const handleUpload = e =>{
        document.getElementById('create-song-in-album-input').click()
    }

    const updateSongTitle = e =>{
        setTitle(e.target.value)
    }

    const updateSongDescription = e =>{
        setDescription(e.target.value)
    }

    const handleAddExisting = e =>{

        // all we need is the songId and albumId to make the fetch with to the put end point
        // at the put end point just edit the songs albumId to the inputted id or query for the album then addsong?
        let existingSongObj = {
            songId : songId,
            albumId : album.id
        }

        console.log(existingSongObj);
        dispatch(addSongToAlbum(existingSongObj)).then(res =>{
            dispatch(loadUserAlbums(user.id))
            dispatch(getArtist(user.id))
            setShowModal(false)

        })

    }

    const handleAddSong = e => {


        let songObj = {
            title: title,
            description: description,
            songUrl: songUrl,
            albumId : album ? album.id : null
        }
        if(!isUploading && songUrl){
            //! dispatch to create song here.
            console.log(songObj);
            dispatch(addAlbumSong(songObj)).then(res =>{
                dispatch(loadUserAlbums(user.id))
                dispatch(getArtist(user.id))
                setShowModal(false)
            })
            .catch(async (res) =>{
                if(res){
                    const data = await res.json()
                    const errors = data.errors

                    if(data.errors && data){
                        setValidationErrors(errors)
                    }

                }
            })
        }

    }

    const handleCancel = e=>{
        setShowModal(false)
    }

    const handleExistingTab = e =>{
        setNewSong(false)
        setTitle('')
        setDescription('')
        setSongUrl('')
    }
    const handleNewTab = e =>{
        setNewSong(true)
        setSongId(0)
    }

    return(
        <>
            <div className='create-song-album-main-container'>

                {album ?
                (
                    <>
                        <div className='create-song-album-header'>
                            <div>
                                Add song :
                            </div>
                            <div className='create-song-album-title'>
                                {`${album.title}`}
                            </div>
                        </div>

                    </>
                )
                :
                (
                    <>
                        <div className='create-song-album-header'>
                            <div>
                                Create a new song
                            </div>
                        </div>
                    </>
                )

                }

                    { validationErrors &&
                        <>
                            {validationErrors.map(error =>{
                                return(
                                    <div className='create-album-errors error'>
                                        {error}
                                    </div>
                                )
                            })}
                        </>

                    }
                { album &&
                    <div className='create-song-album-choice-container'>
                        <div className={newSong ? 'create-song-album-new-song create-song-album-tab' : 'create-song-album-tab'} onClick={handleNewTab}>
                            Add a new song
                        </div>

                        <div className={newSong ? 'create-song-album-tab' :'create-song-album-existing-song create-song-album-tab'} onClick={handleExistingTab}>
                            Add existing single
                        </div>

                    </div>
                }

                <div className='create-song-album-content-container'>
                    { newSong ?
                        (
                            <>
                                <div className='create-song-album-form-container'>

                                    <div className='create-song-album-title-form-container create-song-album-form-bundle'>
                                        <label>
                                            Title
                                        </label>
                                        <input type='text' className='create-song-album-input' value={title} onChange={updateSongTitle}/>
                                    </div>

                                    <div className='create-song-album-description-form-container create-song-album-form-bundle'>
                                        <label>
                                            Description
                                        </label>
                                        <input type='text' className='create-song-album-input' value={description} onChange={updateSongDescription}/>
                                    </div>
                                    <div className='create-song-upload-container'>
                                        <div className='create-song-upload-filename'>
                                            {isUploading ?
                                            (
                                                <>
                                                    <div>
                                                        Uploading...
                                                    </div>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <div>
                                                        {filename ?
                                                            (
                                                                <>
                                                                    {filename}
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    No file selected
                                                                </>
                                                            )
                                                        }

                                                    </div>
                                                </>
                                            )
                                            }

                                        </div>
                                        <input type='file' accept='audio/*' onChange={updateSong} onClick={(e) =>{e.target.value=null}} style={{display: 'none'}} id='create-song-in-album-input'/>
                                        <div className={'create-song-upload-button'} onClick={handleUpload}>
                                            Upload Song
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <ExistingSongToAlbum setSongId={setSongId}/>
                            </>
                        )

                    }

                </div>

                <div className='create-song-album-buttons-container'>

                    <div className={songUrl || songId ? 'create-song-album-button create-song-album-add-song' : 'create-song-album-button create-song-upload-not-ready' } onClick={newSong ? handleAddSong : handleAddExisting}>
                        Add Song
                    </div>
                    <div className='create-song-album-button create-song-album-cancel' onClick={handleCancel}>
                        Cancel
                    </div>

                </div>




            </div>
        </>
    )


}

export default CreateSongInAlbumForm
