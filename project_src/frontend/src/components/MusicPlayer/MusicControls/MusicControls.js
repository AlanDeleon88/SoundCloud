import{FaPlay, FaPause, FaStepBackward,FaStepForward } from 'react-icons/fa'
import './MusicControls.css'
const MusicControls = ({isPlaying, onPlayPauseClick, onPrevClick, onNextClick}) =>{


    return(
        <>
            <div className='music-controls-main-container'>
                <div className='music-controls-prev-track' onClick={onPrevClick}>
                    <FaStepBackward />
                </div>
                <div className='music-controls-play-pause'>
                    {isPlaying ?
                        (
                            <div className='music-controls-pause' onClick={() => onPlayPauseClick(false)}>

                                <FaPause />

                            </div>
                        )
                        :
                        (
                            <div className='music-controls-play' onClick={() => onPlayPauseClick(true)}>


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
