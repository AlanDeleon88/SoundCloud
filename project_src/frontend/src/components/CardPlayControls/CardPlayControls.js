import { FaPause, FaPlay } from "react-icons/fa"
import './CardPlayControls.css'
import { useSelector } from "react-redux"


const CardPlayControls = ({album, playlist, handlePauseClick, handlePlayClick}) =>{
    const musicPlayer = useSelector(state=>state.musicPlayer)

    return(
        <>
            <div className='card-controls-pause-play'>

                { (album ? musicPlayer.current_track.albumId === album.id : musicPlayer.current_track.PlaylistSong ? musicPlayer.current_track.PlaylistSong.playlistId === playlist.id : false) && musicPlayer.is_playing ?
                    (
                        <>
                            <div className='card-controls-pause-background card-controls-control' onClick={handlePauseClick}>
                                <div className='card-controls-pause'>
                                    <FaPause />
                                </div>
                            </div>

                        </>
                    )
                    :
                    (
                        <>
                        <div className='card-controls-play-background card-controls-control' onClick={handlePlayClick}>
                            <div className='card-controls-play'>
                                <FaPlay />
                            </div>
                        </div>

                        </>
                    )

                }

            </div>
        </>
    )
}

export default CardPlayControls
