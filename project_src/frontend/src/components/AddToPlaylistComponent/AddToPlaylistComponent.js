import './AddToPlaylistComponent.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUserPlaylists } from '../../store/userPlaylist'

const AddToPlaylistComponent = ({song, user}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
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
                <div className='add-playlist-el-container'>
                    { isLoaded &&
                        <>
                            {playlists.map(el =>{
                                return(
                                    <>
                                        <div>
                                            {el.name}
                                        </div>
                                    </>
                                )
                            })}
                        </>

                    }

                </div>

            </div>

        </>
    )

}

export default AddToPlaylistComponent
