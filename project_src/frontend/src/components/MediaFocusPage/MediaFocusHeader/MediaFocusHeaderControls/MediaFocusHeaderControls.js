import './MediaFocusHeaderControls.css'
import { handleBigPlayClick } from '../../../../utils/handleSongList'
import CardPlayControls from '../../../CardPlayControls'
import { useHistory } from 'react-router-dom'

const MediaFocusHeaderControls = ({song, album, playlist}) =>{
    // console.log(album.title);
    const history = useHistory();

    const handlePlayClick = () =>{

    }
    const handlePauseClick = () =>{

    }

    const goToArtist = () =>{
        if(song){
            history.push(`/${song.User.username}/${song.userId}`)
        }
        else if(album){
            history.push(`/${album.Songs[0].User.username}/${album.userId}`)
        }
        else{
            history.push(`/${playlist.User.username}/${playlist.userId}`)
        }
    }

    return(
        <>
            <div className='header-controls-main-container'>
                <div className='header-controls-button-container'>
                    <CardPlayControls album = {album} playlist ={playlist} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} focus={true}/>
                </div>
                <div className='header-controls-title-bundle'>
                    <div className='header-controls-title'>
                        { song ?
                            <>
                                {song.title}
                            </>
                        :
                            <>
                                { album ?
                                    <>
                                        {album.title}

                                    </>
                                    :
                                    <>
                                        {playlist.name}
                                    </>
                                }
                            </>

                        }
                    </div>

                    <div className='header-controls-artist' onClick={goToArtist}>
                        { song ?
                            <>
                                {song.User.username}
                            </>
                        :
                        <>
                            {
                                album ?
                                <>
                                    {
                                        album.Songs[0].User.username
                                    }
                                </>
                                :
                                <>
                                    {playlist.User.username}
                                </>
                            }
                        </>

                        }

                    </div>
                </div>


            </div>
        </>
    )
}

export default MediaFocusHeaderControls
