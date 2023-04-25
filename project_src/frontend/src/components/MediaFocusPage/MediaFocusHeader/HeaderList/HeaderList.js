import './HeaderList.css'
import MediaFocusHeaderControls from '../MediaFocusHeaderControls'

const HeaderList = ({album, playlist}) =>{
    // console.log(playlist);
    let media = album ? album : playlist


    return (
        <>
            <div className='header-list-main-container'>
                <div className='header-list-control-bundle'>
                        <MediaFocusHeaderControls album = {album} playlist={playlist}/>
                    <div className='header-list-track-num-container'>
                        <div className='header-list-track-num'>

                            <div className='list-track-num'>
                                {media.Songs.length}
                            </div>
                            <div style={{fontSize:'.65vw'}}>
                                Tracks
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='header-list-img-container'>
                    <img  src={album? album.previewImage : playlist.Songs[0].Album.previewImage} className='header-list-img'/>

                </div>

            </div>

        </>
    )
}

export default HeaderList
