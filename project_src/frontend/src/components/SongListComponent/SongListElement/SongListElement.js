import './SongListElement.css'
import { useDispatch, useSelector } from "react-redux"
import { setListTrack, pausePlayer } from '../../../store/musicPlayer'

const SongListElement = ({song, num, setCurrentSongIndex, img, album, playlist}) =>{
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const dispatch = useDispatch()

    const handleSongClick = e =>{
        let trackObj ={
            trackIndex : num -1
        }
        if(album){

            trackObj['tracks'] = album.Songs;

            dispatch(pausePlayer()).then(res =>{
                setCurrentSongIndex(trackObj.trackIndex)
                dispatch(setListTrack(trackObj))
            })

        }
        else{
            trackObj['tracks'] = playlist.Songs
            dispatch(pausePlayer()).then(res =>{
                setCurrentSongIndex(trackObj.trackIndex)
                dispatch(setListTrack(trackObj))
            })
        }

    }

    return(
        <>
            <div className= {(current_track.id === song.id) ?'song-list-el-main-container song-active' : 'song-list-el-main-container'} onClick={handleSongClick}>

                <div className='song-list-el-img-container'>
                    { album ?
                        (
                            <>
                                 <img src={img} className='song-list-el-img'/>
                            </>
                        )
                        :
                        (
                            <>
                                {/* render play list mix here. */}
                            </>
                        )

                    }


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
