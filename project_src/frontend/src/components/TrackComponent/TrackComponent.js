import './TrackComponent.css'
import{FaPlay, FaPause} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'

const TrackComponent = ({song}) =>{
    const [play, setPlay] = useState(false)

    return(
        <>
            <div className="track-main-container">

                <div className="track-img-container">
                    <img className="track-img"/>
                </div>

                <div className="track-button-wave-title-container">

                    <div className="track-button-title-container">
                        <div className="track-button" id={play ? 'track-pause' : 'track-play'}>
                            {play ?
                                (
                                    <>
                                        <FaPause />
                                    </>
                                )
                                :
                                (
                                    <>
                                        <FaPlay />
                                    </>
                                )

                            }

                        </div>
                        <div className="track-title">
                            {/* {song.title} */}
                        </div>
                    </div>

                    <div className="track-wave-form-container">
                        
                    </div>


                </div>
            </div>


        </>
    )

}

export default TrackComponent
