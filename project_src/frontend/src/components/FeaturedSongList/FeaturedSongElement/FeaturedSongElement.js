import { FaPlay } from "react-icons/fa"
// import { pausePlayer, playPlayer, setListTrack } from '../../../store/musicPlayer'
import { useSelector,useDispatch } from "react-redux"
import './FeaturedSongElement.css'
import { handleElementListClick } from "../../../utils/handleSongList"


const FeaturedSongElement = ({song, num, setCurrentSongIndex, album, playlist}) =>{
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const dispatch = useDispatch()

    const handleElementClick = (e) =>{
        handleElementListClick(setCurrentSongIndex, num, dispatch, album, playlist)

    }

    return(
        <div className={(current_track.id === song.id) ? 'featured-song-song-active' : 'featured-song-containter'} onClick={handleElementClick}>
            <div className='featured-song-text-bundle'>
                <div className='featured-song-album-number'>
                    {num}
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
