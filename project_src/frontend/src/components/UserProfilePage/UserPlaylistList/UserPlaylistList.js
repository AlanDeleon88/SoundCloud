import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUserPlaylists } from "../../../store/userPlaylist"
import SongListComponent from "../../SongListComponent/SongListComponent"
import './UserPlaylistList.css'

const UserPlaylistList = ({userId, username}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const playlists = Object.values(useSelector(state => state.userPlaylists))
    const current_user = useSelector(state =>state.session.user)

    useEffect(() =>{
        dispatch(loadUserPlaylists(userId)).then((res) =>{
            setIsLoaded(true)
        })
    },[dispatch,userId])



    return(
        <>
            <div className="playlist-list-main-container">

                    { isLoaded &&
                        <>
                            { playlists.length > 0 ?
                                (
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
                                )
                                :
                                (
                                    <>
                                        <div className="playlist-list-list-placeholder">
                                            <div>
                                                Looks like there are no playlists to be found D=
                                            </div>
                                        { (current_user && current_user.id === userId) &&
                                            <div className="playlist-list-new-list-container">
                                                <div>
                                                    go find a song to add to a playlist!
                                                </div>
                                            </div>
                                        }
                                        </div>
                                    </>
                                )

                            }

                        </>

                    }


            </div>
        </>
    )
}

export default UserPlaylistList
