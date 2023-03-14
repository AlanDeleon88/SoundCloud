import './AddToPlaylistComponent.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUserPlaylists } from '../../store/userPlaylist'
import AddToPlaylistElement from './AddToPlaylistElement'
import {BiPlus} from 'react-icons/bi'

const AddToPlaylistComponent = ({song, user}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const [songAdded, setSongAdded] = useState('')
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

                <div className='add-play-list-new-playlist-bundle'>
                    <div>
                        <BiPlus className='add-playlist-font-plus-font'/>
                    </div>
                    <div className='add-playlist-new-playlist-button'>
                        Create new playlist
                    </div>
                </div>

            </div>

        </>
    )

}

export default AddToPlaylistComponent
