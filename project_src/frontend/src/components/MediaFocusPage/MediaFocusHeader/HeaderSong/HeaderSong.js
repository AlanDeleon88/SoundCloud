import './HeaderSong.css'
import MediaFocusHeaderControls from '../MediaFocusHeaderControls'

const HeaderSong = ({song}) =>{

    return(
        <>
            <div className='header-song-main-container'>
                <div className='header-song-bundle'>
                    <div className='header-song-controls-container'>
                        <MediaFocusHeaderControls song={song}/>
                    </div>
                    <div className='header-song-wave-container'>

                    </div>
                </div>
                <div className='header-song-img-container'>
                    {   song.Album.previewImage ?
                        <>
                            <img src={song.Album.previewImage} className='header-song-img'/>
                        </>
                        :
                        <>
                            <img src={song.previewImage} className='header-song-img'/>
                        </>

                    }
                </div>

            </div>

        </>
    )
}

export default HeaderSong
