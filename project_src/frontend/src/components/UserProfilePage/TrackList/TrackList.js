import TrackComponent from "../../TrackComponent"
import './TrackList.css'
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getUserSongs } from "../../../store/songs"

const TrackList = ({userId}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const songs = Object.values(useSelector(state=>state.songs));
    const current_user = useSelector(state=>state.session.user)

    useEffect(()=>{
        dispatch(getUserSongs(userId)).then(res =>{
            setIsLoaded(true)
        })
    },[dispatch, userId])

    return(
        <>
            <div className="track-list-container">
                {isLoaded &&
                    <>
                        { songs.length > 0 ?
                            (
                                <>
                                    {songs.map(song => {
                                        return(
                                            <>
                                                <TrackComponent song={song} key={song.id}/>
                                            </>
                                        )
                                    })}

                                </>
                            )
                            :
                            (
                                <>
                                    <div className="track-list-placeholder">
                                        <div>
                                            Looks like there are no tracks to be found D=
                                        </div>
                                        { (current_user && current_user.id === userId) &&
                                            <div className="track-list-upload-song-container">
                                                <div>
                                                    lets fix that
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

export default TrackList
