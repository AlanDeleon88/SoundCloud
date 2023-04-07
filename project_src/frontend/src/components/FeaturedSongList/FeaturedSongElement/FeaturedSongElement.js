import { FaPlay } from "react-icons/fa"
import './FeaturedSongElement.css'


const FeaturedSongElement = ({song, i}) =>{


    return(
        <div className='featured-song-containter featured-song-song-active'>
            <div className='featured-song-text-bundle'>
                <div className='featured-song-album-number'>
                    {i}
                </div>
                <div className='featured-song-title'>
                    {song.title}
                </div>

            </div>
            <div className='featured-play-icon'>
                    <FaPlay />
            </div>
        </div>

    )
}

export default FeaturedSongElement
