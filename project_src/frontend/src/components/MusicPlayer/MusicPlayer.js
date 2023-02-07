import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MusicPlayer.css'
import MusicControls from './MusicControls';


const MusicPlayer = () =>{
    const tracks = useSelector(state => state.musicPlayer.tracks)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const currentTrack = useSelector(state => state.musicPlayer.current_track)
    const {url} = currentTrack
    const audioRef = useRef()
    let duration;
    const intervalRef = useRef()
    const isReady = useRef(false)

    useEffect(() =>{
        if(currentTrack.url){
            audioRef.current = new Audio(url)
            duration = audioRef.current.duration
        }
    },[tracks, currentTrack, isPlaying])

    const toPrevTrack = () =>{
        //! dispatch to store to go to prev track
    }

    const toNextTrack = () =>{
        //! dispatch to store to go to next track
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
                    
            </div>

            <div className='music-player-song-info-container'>
                 <div className='music-player-song-art-container'>
                    <img className='music-player-art'/>
                </div>
                <div className='music-player-text-container'>
                    <div className='music-player-artist-album'>
                        <div className='music-player-artist'>
                            TEST ARTIST
                        </div>
                        <div className='music-player-album'>
                            TEST ALBUM
                        </div>
                    </div>
                    <div className='music-player-song-title'>
                        TEST TILE
                    </div>
                </div>

            </div>
        </div>

    </>
    )

}

export default MusicPlayer
