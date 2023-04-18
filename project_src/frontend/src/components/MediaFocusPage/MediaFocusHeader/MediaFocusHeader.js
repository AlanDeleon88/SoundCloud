import './MediaFocusHeader.css'
import { useSelector, useDispatch } from 'react-redux'
import { pausePlayer} from '../../../store/musicPlayer'
import CardPlayControls from '../../CardPlayControls'
import PlaylistImage from '../../PlaylistImage'
//TODO add another sizing option to playlist image to match the needed size for this header.
import HeaderSong from './HeaderSong'
import HeaderList from './HeaderList'


const MediaFocusHeader = ({song, album, playlist}) =>{
    const dispatch = useDispatch()
    console.log(album);


    return(
        <>
            { (album || playlist) ?
                    <>
                        <HeaderList album ={album} playlist={playlist}/>

                    </>


                :

                    <HeaderSong song={song}/>


            }

        </>
    )
}

export default MediaFocusHeader
