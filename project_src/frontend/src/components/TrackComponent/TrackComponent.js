import './TrackComponent.css'
import{FaPlay, FaPause} from 'react-icons/fa'
import track_img from './temp_data/temp_track_img.png'
import { useState, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { useSelector, useDispatch } from 'react-redux'
import { setTracks, pausePlayer } from '../../store/musicPlayer'

const TrackComponent = ({song}) =>{
    const [play, setPlay] = useState(false)
    const dispatch = useDispatch();
    const [showButtons, setShowButtons] = useState(false)
    const currentUser = useSelector(state=>state.session.user)
    const musicPlayer = useSelector(state=>state.musicPlayer)
    const {current_track, is_playing} = musicPlayer
    const albumCover = song.Album.previewImage
    //use select currentplay store to compare to title / id to see if pause or play is rendered.
    //useEffect to dispatch to musicPlayer Store.
    // console.log(current_track);
    const handlePlay= e =>{
        dispatch(pausePlayer()).then(res =>{
            dispatch(setTracks([song]))
        })
    }

    const onEnter = e =>{
        setShowButtons(true)
    }

    const onLeave = e =>{
        setShowButtons(false)
    }

    return(
        <>
            <div className="track-main-container" onMouseEnter={onEnter} onMouseLeave={onLeave}>

                <div className="track-img-container">
                    <img className="track-album-img" src={albumCover}/>
                </div>

                <div className="track-button-title-container">
                    <div className="track-button" id={play ? 'track-pause' : 'track-play'} onClick={handlePlay}>
                    {current_track && (current_track.title === song.title) && is_playing ?
                        (
                            <>
                                <div className='track-pause-button'>

                                    <FaPause />

                                </div>

                            </>
                        )
                        :
                        (
                            <>
                                <div className='track-play-button'>
                                    <FaPlay />
                                </div>

                            </>
                        )

                    }

                </div>
                        <div className="track-title-container">
                            {/* {song.title} */}
                            <div className='track-artist'>
                                <div style={{'marginRight' : '10px'}}>
                                    Album: {song.Album.title}
                                </div>
                                <div>
                                    By: {song.User.username}
                                </div>
                            </div>
                            <div className='track-title'>
                                {song.title}
                            </div>

                        </div>
                    </div>
                        <div className='edit-delete-container'>
                            {currentUser &&
                                <>

                                    {currentUser.id === song.User.id && showButtons &&
                                        <>
                                            <div className='track-ud track-u'>
                                                Edit
                                            </div>
                                            <div className='track-ud track-d'>
                                                Delete
                                            </div>
                                        </>

                                    }

                                </>
                                    }



                    </div>

            </div>


        </>
    )

}

export default TrackComponent
