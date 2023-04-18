import './MediaFocusHeaderControls.css'
import { handleBigPlayClick } from '../../../../utils/handleSongList'
import CardPlayControls from '../../../CardPlayControls'

const MediaFocusHeaderControls = ({song, album, playlist}) =>{
    // console.log(album.title);

    const handlePlayClick = () =>{

    }
    const handlePauseClick = () =>{

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

                    <div className='header-controls-artist'>
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
