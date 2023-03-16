import './AddToPlaylistComponent.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUserPlaylists } from '../../store/userPlaylist'
import AddToPlaylistElement from './AddToPlaylistElement'
import CreateNewPlaylistModal from './CreateNewPlaylistModal'

const AddToPlaylistComponent = ({song, user}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const [songAdded, setSongAdded] = useState('')
    const [showCreate, setShowCreate] = useState(false)
    //TODO create state to set show modal for creating a new playlist.
    //? pass in song/user to modal to do then chain to create new play list then add the song to it, then close modal.
    const playlists = Object.values(useSelector(state=>state.userPlaylists))
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(loadUserPlaylists(user.id)).then(res =>{
            setIsLoaded(true)
        })
    }, [song])

    return(
        <>
            <div className='add-playlist-main-container'>
                <div className='add-playlist-header'>
                    Add Song to playlist
                </div>
                <div>
                    {songAdded &&
                        <>
                            {songAdded}
                        </>
                    }
                </div>
                <div className='add-playlist-el-list'>
                    { isLoaded &&
                        <>
                            {playlists.map(el =>{
                                return(
                                    <>
                                        <AddToPlaylistElement playlist={el} song={song} setSongAdded={setSongAdded} key={el.id}/>
                                    </>
                                )
                            })}
                        </>

                    }

                </div>
                <CreateNewPlaylistModal user={user} song={song} setSongAdded={setSongAdded}/>

            </div>

            {
            /*
                showCreate &&
                <Modal onClose= {() =>{setShowCreate(false)}}>
                </Modal>


            */
            }

        </>
    )

}

export default AddToPlaylistComponent
