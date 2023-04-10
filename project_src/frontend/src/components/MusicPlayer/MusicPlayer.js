import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MusicPlayer.css'
import MusicControls from './MusicControls';
import { prevTrack, nextTrack, pausePlayer, playPlayer } from '../../store/musicPlayer';
import timeConvert from './timeConverter';
import{BsVolumeDownFill} from 'react-icons/bs'


const MusicPlayer = () =>{
    const dispatch = useDispatch();
    const {tracks, current_track, is_playing} = useSelector(state => state.musicPlayer)
    const [trackProgress, setTrackProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(.5)
    const [showVolume, setShowVolume] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const {url, id} = current_track
    let audioRef = useRef()
    const intervalRef = useRef()
    const isReady = useRef(false)
    const currentPercentage = duration ? `${((trackProgress + .5) / duration) * 100}%` : '0%';
    const currentVolumePercentage = `${(volume / 1) * 100}%`
    const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #1a035a), color-stop(${currentPercentage}, #777))`;
    const volumeStyle = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentVolumePercentage}, #1a035a), color-stop(${currentVolumePercentage}, #777))`;
    const history = useHistory();
    // console.log(isPlaying);
    // console.log(duration);
    // console.log(volume);

    //! need to write some dispatch or something that effects the pause or play from other components
    //! IE if I hit the play button on a track componenent it will play automatically on the main player.

    const startTimer = () =>{
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() =>{
            if(audioRef.current.ended){
                if(tracks.length > 1){

                    toNextTrack()
                }
                else{
                    setIsPlaying(false)
                    dispatch(pausePlayer())
                }
            }
            else
            {
                setTrackProgress(audioRef.current.currentTime)
                //!could dispatch this to a current time redux if i want to try the audio wave on the componenents.
                //! maybe use a second value to send back from the remote components to manipulate the track slider here?
            }
        },[1000]);
    }

    const onScrub = (value) =>{
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value
        setTrackProgress(audioRef.currentTime)
    }

    const handleVolume = (e) =>{
        setVolume(e.target.value)
        if(audioRef.current){
            audioRef.current.volume = e.target.value
        }
    }

    const onScrubEnd = () =>{
        if(!isPlaying){
            setIsPlaying(true)
        }
        startTimer();
    }
    const onDurationChangeHandler = e =>{
        const seconds = Math.floor(e.target.duration)
        setDuration(seconds)
        audioRef.current.volume = volume;
    }

    useEffect(() =>{
        setIsPlaying(is_playing)
    },[is_playing])

    useEffect(() =>{
        if(url){

            audioRef.current = new Audio(url)
            // console.log(audioRef);
            // console.log(audioRef.current.ondurationchange);
            audioRef.current.ondurationchange = onDurationChangeHandler

            // duration = audioRef.current.duration
        }
    },[url, id])

    useEffect(() =>{
        if(audioRef.current){
            audioRef.current.pause()
            audioRef.current = new Audio(url)
            setTrackProgress(audioRef.current.currentTime);
        }
        if(isReady.current){
            audioRef.current.play()

            setIsPlaying(true)
            startTimer();
        }
        return() =>{
            if(url){
                audioRef.current.pause();

                clearInterval(intervalRef.current)
                // setIsPlaying(false)
            }
        }
    },[url, id])

    useEffect(() => {
        if(audioRef.current){

            if(isPlaying){
                audioRef.current.play();

                startTimer();
            }
            else{
                clearInterval(intervalRef.current);
                audioRef.current.pause();

            }

        }
    },[isPlaying])

    // useEffect(() =>{
    //     return() =>{
    //         if(url){
    //             audioRef.current.pause();

    //             clearInterval(intervalRef.current)
    //             // setIsPlaying(false)
    //         }
    //     }
    // },[url])

    const toPrevTrack = () =>{
        dispatch(pausePlayer()).then((res)=>{
            dispatch(prevTrack()).then((res)=>{
                dispatch(playPlayer())
            })

        })

    }

    const toNextTrack = () =>{
        //! dispatch to store to go to next track
        // dispatch(nextTrack())
        dispatch(pausePlayer()).then((res)=>{
            dispatch(nextTrack()).then((res) =>{
                dispatch(playPlayer())
            })
        })
    }

    const handleArtist = (e) =>{
        if(current_track.User){
            history.push((`/${current_track.User.username}/${current_track.User.id}`))

        }

    }

    return(
    <>
        <div className='music-player-main-container' onMouseLeave={() =>{setShowVolume(false)}}>
            <div className='music-player-main-controls-container'>
                <div className='music-player-controls-container'>
                    <MusicControls
                        isPlaying={isPlaying}
                        onPrevClick={toPrevTrack}
                        onNextClick={toNextTrack}
                        onPlayPauseClick ={setIsPlaying}
                    />
                    <div className='volume-slide-container'>
                        {showVolume ?
                            (
                                <input type='range' className='volume-slider'
                                    value={volume}
                                    step='.05'
                                    min='0'
                                    max='1'
                                    onChange={handleVolume}
                                    onMouseLeave={() =>{setShowVolume(false)}}
                                    style={{background: volumeStyle, 'borderRadius' : '10px'}}
                                />

                            )
                            :
                            (
                                <input type='range' className='volume-place-holder'
                                    disabled={true}
                                    value={volume}
                                    step='.01'
                                    min='0'
                                    max='1'
                                    onChange={handleVolume}
                                    onMouseLeave={() =>{setShowVolume(false)}}
                                    style={{background: volumeStyle, 'borderRadius' : '10px'}}
                                />
                            )

                        }

                        <div className='volume-button' onMouseEnter={() =>{setShowVolume(true)}}>
                            <BsVolumeDownFill style={{fontSize:'1.7vw'}}/>
                        </div>
                    </div>
                </div>
                <div className='music-player-seeker-container'>
                    <div className='current-prog' style={{'marginRight' : '10px'}}>
                        { trackProgress ?
                            (
                                <>
                                    {timeConvert(trackProgress)}
                                </>
                            )
                            :
                            (
                                <>
                                    -:-
                                </>
                            )

                        }

                    </div>
                    <input
                        type='range'
                        value={trackProgress}
                        step='1'
                        min='0'
                        max ={duration ? duration  : `${duration}`}
                        className='progress'
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                        style={{ background: trackStyling, 'borderRadius' : '10px' }}
                    />
                    <div className='max-prog' style={{'margin-left' : '10px'}}>
                        { duration ?
                            (
                                <>
                                    {timeConvert(duration)}
                                </>
                            )
                            :
                            (
                                <>
                                    -:-
                                </>
                            )

                        }
                    </div>
                </div>

                <div className='music-player-song-info-container'>
                    <div className='music-player-song-art-container'>

                        <img className='music-player-art' src={current_track.Album ? current_track.Album.previewImage : current_track.previewImage}/>
                    </div>
                    <div className='music-player-text-container'>
                        <div className='music-player-artist-album'>
                            <div className='music-player-artist' onClick={handleArtist}>
                                {current_track.User &&
                                <>
                                    {current_track.User.username}

                                </>
                                }

                            </div>
                            <div className='music-player-album'>
                                {current_track.Album &&
                                    <>
                                        {/* {current_track.Album.title} */}
                                    </>

                                }
                            </div>
                        </div>
                        <div className='music-player-song-title'>

                            {current_track.title}

                        </div>
                    </div>

                </div>

            </div>

        </div>

    </>
    )

}

export default MusicPlayer
