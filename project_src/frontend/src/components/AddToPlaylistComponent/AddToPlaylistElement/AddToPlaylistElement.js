
import { useState, useEffect } from "react"
import './AddToPlaylistElement.css'
import PlaylistImage from "../../PlaylistImage"
import {AiOutlineCheck} from 'react-icons/ai'
import { useDispatch } from "react-redux"
import { addSongToPlaylist, removeSongFromPlaylist } from "../../../store/userPlaylist"

const AddToPlaylistElement = ({playlist, song, setSongAdded}) =>{
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        playlist.Songs.forEach(el =>{
            if(song.id === el.id){
                setIsChecked(true)
            }

        })
    },[playlist])

    const handleCheck = (e) =>{
        if(!isChecked){
            dispatch(addSongToPlaylist(playlist, song)).then(res =>{
                setIsChecked(true)
                // window.alert('added song to playlist')
                setSongAdded(`Added ${song.title} to ${playlist.name}`)
            })

        }
        else{
            dispatch(removeSongFromPlaylist(playlist, song)).then(res =>{
                setIsChecked(false)
                setSongAdded(`Removed ${song.title} to ${playlist.name}`)
            })
        }

        // setIsChecked(!isChecked)


         //! maybe after check is resolved, display a modal saying song was added/removed from to a playlist
         //! or maybe just have a div appear?
    }

    return(
        <>
            <div className="playlist-el-container">

                <div className="playlist-el-check-img-bundle">

                    <div className="playlist-el-check-background">
                        <div className={isChecked ? "playlist-el-checkbox pl-checked" : "playlist-el-checkbox pl-unchecked"} onClick={handleCheck}>
                            <div className={isChecked ? 'pl-show-checked' : 'pl-hide-check'}>
                                    <AiOutlineCheck style={{'display' : 'flex', 'justifyContent' : 'center', 'alignItems' : 'center'}}/>
                            </div>
                        </div>
                    </div>

                    <div className="playlist-el-img">
                        <PlaylistImage songs={playlist.Songs} forAddToPlaylist={true}/>
                    </div>

                </div>

                <div className="playlist-el-name">
                    {playlist.name}
                </div>

            </div>
        </>
    )
}

export default AddToPlaylistElement
