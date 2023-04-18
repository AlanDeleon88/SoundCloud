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
                            {/* { album   ?
                                <>
                                    <div>
                                        {media.Songs.length}
                                    </div>

                                </>

                                :
                                <>
                                    {playlist.Songs.length}
                                </>
                            } */}
                            {media.Songs.length}
                        </div>
                    </div>
                </div>
                <div className='header-list-img-container'>
                    <img  className='header-list-img'/>

                </div>

            </div>

        </>
    )
}

export default HeaderList
