import './SongListComponent.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import{FaPlay, FaPause} from 'react-icons/fa'
import SongListElement from './SongListElement'

const SongListComponent = ({album, playlist, username}) =>{
    const [currentSong, setCurrentSong] = useState(album.Songs[0]) // set initial song to first song in album
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const {Songs} = album ? album : playlist
    const dispatch = useDispatch();

    useEffect(() =>{
        Songs.forEach(song =>{

            // song['Album']['previewImage'] = album.previewImage
            song['Album'] = {previewImage: album.previewImage}
            song['User'] = {username: username}
            song['albumId'] = album.id

        })
    },[album])

    return(
        <>
            <div className='song-list-main-container'>
                <div className='song-list-img-container'>
                    <img src={album.previewImage} className='song-list-img'/>
                </div>



                <div className='song-list-play-list-container'>
                    <div className='song-list-control-title-container'>
                        <div className='song-list-control-container'>
                        { is_playing && (current_track.albumId === album.id) ?

                            (
                                <div className='song-list-pause'>
                                    <FaPause />
                                </div>
                            )
                            :
                            (
                                <div>
                                    <FaPlay />
                                </div>
                            )

                        }
                        </div>

                        <div className='song-list-title-artist-container'>
                            <div className='song-list-artist'>
                                {username}
                            </div>
                            <div className='song-list-title'>
                                {album.title}
                            </div>
                        </div>
                    </div>

                    <div className='song-list-song-element-container'>
                        { Songs.map((song, i) =>{
                                    return(
                                        <>
                                            <SongListElement song={song} setCurrentSong={setCurrentSong} key={song.id} num={i+1} img={album.previewImage} album={album} playlist={playlist}/>
                                        </>
                                    )
                                })

                                }


                            <div className='song-list-add-song-container'>

                            </div>

                    </div>


                </div>


            </div>

        </>
    )


}


export default SongListComponent
