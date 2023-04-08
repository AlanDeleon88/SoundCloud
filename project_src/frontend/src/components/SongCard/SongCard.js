import './SongCard.css'
import { useState } from 'react';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import{FaPlay, FaPause} from 'react-icons/fa'
import { pausePlayer, playPlayer, setTracks } from '../../store/musicPlayer';


const SongCard = ({song}) => {
    const {title} = song;
    const musicPlayer = useSelector(state=>state.musicPlayer)
    const history = useHistory()
    const [showControls, setShowControls] = useState(false)
    const dispatch= useDispatch()

    const handleClick = () => {
        // dispatch(getAlbum(song.albumId))
    }

    const handleArtistClick = e =>{
        history.push(`/${song.User.username}/${song.userId}`)

    }

    const handlePlayClick = e =>{
        dispatch(pausePlayer()).then(res =>{
            dispatch(setTracks([song]))
        })
    }

    const handlePauseClick = e =>{
        dispatch(pausePlayer())
    }
    // console.log(match.url);
    return (
        <>


                <div className="song-card" onMouseEnter={() =>{setShowControls(true)}} onMouseLeave={() =>{setShowControls(false)}}>
                    <div className="image-container">
                        { song.Album ?
                            <img className='song-img'src={song.Album.previewImage}/>

                            :
                            <img className='song-img'src={song.previewImage}/>
                        }

                    </div>
                    <div className='song-card-pause-play'>
                        { showControls &&
                            <>

                                { (musicPlayer.current_track.id === song.id) && musicPlayer.is_playing ?
                                    (
                                        <>
                                            <div className='song-card-pause-background song-card-control' onClick={handlePauseClick}>
                                                <div className='song-card-pause'>
                                                    <FaPause />
                                                </div>
                                            </div>

                                        </>
                                    )
                                    :
                                    (
                                        <>
                                        <div className='song-card-play-background song-card-control' onClick={handlePlayClick}>
                                            <div className='song-card-play'>
                                                <FaPlay />
                                            </div>
                                        </div>

                                        </>
                                    )

                                }
                            </>

                        }

                    </div>
                    <div className='song-title-card'>
                        {title}
                    </div>
                    <div className='song-card-artist-bundle'>
                        <div>
                            by:
                        </div>
                        <div className='song-card-artist-username' onClick={handleArtistClick}>
                            {song.User.username}
                        </div>
                    </div>

                </div>



        </>
    )

}

export default SongCard;
