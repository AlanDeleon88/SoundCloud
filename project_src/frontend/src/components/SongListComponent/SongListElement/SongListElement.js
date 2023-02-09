import './SongListElement.css'
import { useDispatch, useSelector } from "react-redux"
import { setListTrack, pausePlayer } from '../../../store/musicPlayer'

const SongListElement = ({song, num, setCurrentSong, img, album, playlist}) =>{
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const dispatch = useDispatch()

    const handleSongClick = e =>{
        let trackObj = {
            trackIndex : num - 1,
            tracks : album.Songs
        }
        dispatch(pausePlayer()).then(res =>{

            dispatch(setListTrack(trackObj))
        })
    }

    return(
        <>
            <div className= {(current_track.title === song.title) ?'song-list-el-main-container song-active' : 'song-list-el-main-container'} onClick={handleSongClick}>

                <div className='song-list-el-img-container'>
                    <img src={img} className='song-list-el-img'/>
                </div>
                <div className='song-list-el-num'>
                    {num}
                </div>
                <div className='song-list-el-title'>
                    {song.title}
                </div>


            </div>

        </>
    )

}

export default SongListElement
