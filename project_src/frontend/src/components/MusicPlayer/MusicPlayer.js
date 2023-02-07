import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MusicPlayer.css'
import MusicControls from './MusicControls';
import { prevTrack, nextTrack, pausePlayer, playPlayer } from '../../store/musicPlayer';


const MusicPlayer = () =>{
    const dispatch = useDispatch();
    const {tracks, current_track, is_playing} = useSelector(state => state.musicPlayer)
    const [trackProgress, setTrackProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const {url} = current_track
    let audioRef = useRef()
    const intervalRef = useRef()
    const isReady = useRef(false)
    // console.log(isPlaying);
    // console.log(duration);

    //! need to write some dispatch or something that effects the pause or play from other components
    //! IE if I hit the play button on a track componenent it will play automatically on the main player.

    const startTimer = () =>{
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() =>{
            if(audioRef.current.ended){
                toNextTrack()
            }
            else
            {
                setTrackProgress(audioRef.current.currentTime)
            }
        },[1000]);
    }

    const onScrub = (value) =>{
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value
        setTrackProgress(audioRef.currentTime)
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
    }

    useEffect(() =>{
        setIsPlaying(is_playing)
    },[is_playing])

    useEffect(() =>{
        if(url){
            audioRef.current = new Audio(url)
            // console.log(audioRef.current.ondurationchange);
            audioRef.current.ondurationchange = onDurationChangeHandler
            // duration = audioRef.current.duration
        }
    },[tracks, url])

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
    },[url])

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

    useEffect(() =>{
        return() =>{
            if(url){
                audioRef.current.pause();

                clearInterval(intervalRef.current)
                // setIsPlaying(false)
            }
        }
    },[url])

    const toPrevTrack = () =>{
        dispatch(prevTrack())

    }

    const toNextTrack = () =>{
        //! dispatch to store to go to next track
        dispatch(nextTrack())
    }

    return(
    <>
        <div className='music-player-main-container'>
            <div className='music-player-controls-container'>
                <MusicControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick ={setIsPlaying}
                />
            </div>
            <div className='music-player-seeker-container'>
                <div className='current-prog'>
                    {Math.floor(trackProgress)}
                </div>
                <input
                    type='range'
                    value={trackProgress}
                    step='1'
                    min='0'
                    max ={duration? duration : `${duration}`}
                    className='progress'
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
                <div className='max-prog'>
                    { duration ?
                        (
                            <>
                                {Math.floor(duration)}
                            </>
                        )
                        :
                        (
                            <>
                                --:--
                            </>
                        )

                    }
                </div>
            </div>

            <div className='music-player-song-info-container'>
                 <div className='music-player-song-art-container'>
                    <img className='music-player-art'/>
                </div>
                <div className='music-player-text-container'>
                    <div className='music-player-artist-album'>
                        <div className='music-player-artist'>
                            {current_track.User &&
                            <>
                                {current_track.User.username}

                            </>
                            }

                        </div>
                        <div className='music-player-album'>
                            {current_track.Album &&
                                <>
                                    {current_track.Album.title}
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

    </>
    )

}

export default MusicPlayer
