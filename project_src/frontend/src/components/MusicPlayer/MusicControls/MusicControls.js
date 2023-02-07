import{FaPlay, FaPause, FaStepBackward,FaStepForward } from 'react-icons/fa'
import './MusicControls.css'
import { prevTrack, nextTrack, pausePlayer, playPlayer } from '../../../store/musicPlayer';
import { useDispatch } from 'react-redux';
const MusicControls = ({isPlaying, onPlayPauseClick, onPrevClick, onNextClick}) =>{
    const dispatch = useDispatch()

    return(
        <>
            <div className='music-controls-main-container'>
                <div className='music-controls-prev-track' onClick={onPrevClick}>
                    <FaStepBackward />
                </div>
                <div className='music-controls-play-pause'>
                    {isPlaying ?
                        (
                            <div className='music-controls-pause' onClick={() => {
                                onPlayPauseClick(false)
                                dispatch(pausePlayer())

                                }}>

                                <FaPause />

                            </div>
                        )
                        :
                        (
                            <div className='music-controls-play' onClick={() => {
                                onPlayPauseClick(true)
                                dispatch(playPlayer())
                                }}>


                                <FaPlay />

                            </div>
                        )
                    }
                </div>
                <div className='music-controls-next-track' onClick={onNextClick}>
                    <FaStepForward />
                </div>
            </div>

        </>
    )

}

export default MusicControls
