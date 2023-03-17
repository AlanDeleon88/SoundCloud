import './EditAlbumPlaylist.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsFillCameraFill} from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'
import uploadFile from '../../utils/uploadFile'
import { updateUserAlbum } from '../../store/albums'
import { loadUserAlbums } from '../../store/albums'
import { getArtist } from '../../store/artist'
import {MdInsertPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import { deleteUserAlbum } from '../../store/albums'
import { updateUserPlaylist, loadUserPlaylists, removeUserPlaylist } from '../../store/userPlaylist'
import { Modal } from '../../context/Modal'
import DeleteAlbumPlaylistConfirm from './DeleteAlbumPlaylistConfimModal'


const EditAlbumPlaylistForm = ({album, playlist, setShowModal}) =>{
    const [title, setTitle] = useState('')
    const [titleInputted, setTitleInputted] = useState('')
    const [description, setDescription] = useState('')
    const [descInputted, setInputtedDesc] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [showImgButtons, setShowImgButtons] = useState(false)
    const [imgInputted, setImgInputted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleImgInput = e =>{
        let input = document.getElementById('edit-album-img-input')
        input.click();
    }

    const handleUpdateArt = e =>{
        const image = e.target.files[0]

        if(image){
            setIsLoading(true)
            uploadFile(image, 'image').then(res =>{
                setImageUrl(res)
                setIsLoading(false)
                setImgInputted(true)
            }).catch(async (res) =>{
                const data = await res.json()
                console.log(data);
            })
        }

    }

    const deleteArt = e =>{
        setImageUrl('')
        setImgInputted(true)
    }

    const updateTitle = e =>{
        setTitle(e.target.value)
        setTitleInputted(true)
    }

    const updateDescription = e =>{
        setDescription(e.target.value)
        setInputtedDesc(true)
    }

    const handleSave = e =>{
        if(album){
            let albumObj = {
                title: title,
                description: description,
                imageUrl: imageUrl,
                id: album.id
            }
            if(!titleInputted){
                albumObj.title = album.title
            }
            if(!descInputted){
                albumObj.description = album.description
            }
            if(!imgInputted){
                albumObj.imageUrl = album.previewImage
            }
            if(!titleInputted && !imgInputted && !descInputted){
                setShowModal(false);
            }

            dispatch(updateUserAlbum(albumObj)).then(res =>{
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
        else{
            let playlistObj = {
                title: title,
                description: description,
                playlistId : playlist.id
            }
            if(!titleInputted){
                playlistObj.title = playlist.title
            }
            if(!descInputted){
                playlistObj.description = playlist.description
            }

            if(!titleInputted && !descInputted){
                setShowModal(false);
            }
            console.log(playlistObj);
            dispatch(updateUserPlaylist(playlistObj)).then(res =>{
                dispatch(loadUserPlaylists(user.id))
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

    const handleCancel = e =>{
        setShowModal(false)
    }

    const handleDelete = e =>{


            //TODO create thunk for deleting playlist
            // dispatch(removeUserPlaylist(playlist))
            setShowConfirm(true)



    }

    return(
        <>
            <div className={album ? 'edit-album-play-container' : 'edit-playlist-container'}>
                <div className='edit-album-play-header'>
                    { album ?
                        (
                            <>
                                Edit Album
                            </>
                        )
                        :
                        (
                            <>
                                Edit Playlist
                            </>
                        )

                    }
                </div>
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
                { album ?
                    (
                        <>
                            <div className='edit-album-play-img-container' onMouseEnter={() =>{setShowImgButtons(true)}} onMouseLeave={()=>{setShowImgButtons(false)}}>
                                { imgInputted && !imageUrl?
                                    (
                                        <>
                                            { isLoading ?
                                                (
                                                    <>
                                                        <div className='edit-album-play-loading'>
                                                            Loading Image..
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className='edit-album-play-img-placeholder'>
                                                            <MdOutlineAddPhotoAlternate />
                                                        </div>

                                                    </>
                                                )

                                            }

                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            { isLoading ?
                                                (
                                                    <>
                                                        <div className='edit-album-play-loading'>
                                                            Loading Image..
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <img src={imageUrl || imgInputted ? imageUrl : album.previewImage} className='edit-album-play-img'/>
                                                    </>

                                                )
                                            }
                                        </>
                                    )

                                }

                                {showImgButtons &&
                                    <div className='edit-album-play-img-buttons-container'>

                                        <button className='edit-album-play-img-button edit-play-img-update' onClick={handleImgInput}>
                                            <BsFillCameraFill />
                                            <div style={{'marginLeft': '5px'}}>
                                                Update album art
                                            </div>

                                        </button>
                                        <button className='edit-album-play-img-button edit-play-img-remove' onClick={deleteArt}>
                                            <IoClose className='edit-album-io'/>
                                            <div style={{'marginLeft': '5px'}}>
                                                Remove album art
                                            </div>
                                        </button>
                                        <input type='file' accept='image/*' onChange={handleUpdateArt} onClick={(e) =>{e.target.value = null}} style={{'display' : 'none'}} id='edit-album-img-input'/>
                                    </div>

                                }
                            </div>
                        </>
                    )
                    :
                    (
                        <>

                        </>
                    )

                }
                <div className='edit-album-play-input-container'>
                    <div className='edit-album-play-input-bundle'>
                        <label className='edit-album-play-label'>Title</label>
                        <input className='edit-album-play-input' type='text' onChange={updateTitle} value={titleInputted ? title : album ? album.title : playlist.name}/>
                    </div>
                    <div className='edit-album-play-input-bundle'>
                        <label className='edit-album-play-label'>Description</label>
                        <input className='edit-album-play-input' type='text' onChange={updateDescription} value={descInputted ? description : album ? album.description : playlist.description}/>

                    </div>
                </div>

                <div className='edit-album-play-button-background'>
                    <div className='edit-album-play-buttons'>
                        <div className='edit-album-play-delete edit-album-play-button' onClick={handleDelete}>
                            Delete
                        </div>

                        <div className='edit-album-play-button-bundle'>
                            <div className='edit-album-play-button edit-album-save' onClick={handleSave}>
                                Save
                            </div>
                            <div className='edit-album-play-button edit-album-cancel' onClick={handleCancel}>
                                Cancel
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            { showConfirm &&
                <Modal onClose={() =>{setShowConfirm(false)}}>
                    <DeleteAlbumPlaylistConfirm playlist={playlist} album={album} setShowConfirm={setShowConfirm}/>
                </Modal>

            }


        </>
    )

}

export default EditAlbumPlaylistForm
