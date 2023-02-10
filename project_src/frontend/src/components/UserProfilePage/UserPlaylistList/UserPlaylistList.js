import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUserPlaylists } from "../../../store/userPlaylist"
import SongListComponent from "../../SongListComponent/SongListComponent"

const UserPlaylistList = ({userId, username}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const playlists = Object.values(useSelector(state => state.userPlaylists))

    useEffect(() =>{
        dispatch(loadUserPlaylists(userId)).then((res) =>{
            setIsLoaded(true)
        })
    },[dispatch])



    return(
        <>
            <div className="playlist-list-main-container">

                    { isLoaded &&
                        <>
                           {
                                playlists.map((playlist) =>{
                                    return(
                                    <>
                                        <SongListComponent playlist={playlist} username={username}/>
                                    </>
                                    )
                    })
                           }
                        </>

                    }


            </div>
        </>
    )
}

export default UserPlaylistList
