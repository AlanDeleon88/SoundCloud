import './DeleteAlbumPlaylistConfirm.css'
import { useDispatch } from 'react-redux'
import { deleteUserAlbum } from '../../../store/albums'
import { removeUserPlaylist,loadUserPlaylists } from '../../../store/userPlaylist'
import { getArtist } from '../../../store/artist'
import { loadUserAlbums } from '../../../store/albums'

const DeleteAlbumPlaylistConfirm = ({album,playlist, setShowConfirm}) =>{
    const dispatch = useDispatch()

    const handleConfirm = () =>{
        if(album){
            dispatch(deleteUserAlbum(album.id)).then(res =>{
                dispatch(loadUserAlbums(album.userId))
                dispatch(getArtist(album.userId))
                setShowConfirm(false)
            })
            // .catch(async (res) =>{
            //     if(res){
            //         const data = await res.json()
            //         const errors = data.errors

            //         if(data.errors && data){
            //             setValidationErrors(errors)
            //         }

            //     }
            // })

        }
        else{
            dispatch(removeUserPlaylist(playlist)).then(res =>{
                dispatch(loadUserPlaylists(playlist.userId)).then(res =>{
                    setShowConfirm(false)
                })
            })
        }

    }

    const handleCancle = () =>{
        setShowConfirm(false)
    }


    return(
        <>
            <div className='delete-album-play-container mix-neb-modal'>
                <div className='delete-album-play-header'>
                    { album ?
                        (
                            <>
                                Are you sure you want to delete this album?
                            </>
                        )
                        :
                        (
                            <>
                                Are you sure you want to delete this playlist?
                            </>
                        )

                    }
                </div>
                <div className='delete-album-play-buttons-background mix-neb-button-background'>
                    <div className='delete-album-play-buttons-container mix-neb-button-container'>

                        <div className='delete-album-play-buttons-bundle mix-neb-button-container'>

                            <div className='delete-album-play-button mix-neb-button mix-neb-delete' onClick={handleConfirm}>
                                Delete
                            </div>
                            <div className='delete-album-play-button mix-neb-button mix-neb-cancel' onClick={handleCancle}>
                                Cancel
                            </div>

                        </div>


                    </div>


                </div>
            </div>

        </>
    )
}

export default DeleteAlbumPlaylistConfirm
