import TrackComponent from "../../TrackComponent"
import './TrackList.css'
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getUserSongs } from "../../../store/songs"

const TrackList = ({userId}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const songs = Object.values(useSelector(state=>state.songs));

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
                        {songs.map(song => {
                            return(
                                <>
                                    <TrackComponent song={song} />
                                </>
                            )
                        })}

                    </>

                }

            </div>
        </>
    )
}

export default TrackList
