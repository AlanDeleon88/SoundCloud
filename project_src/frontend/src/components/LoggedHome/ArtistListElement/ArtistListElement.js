import './ArtistElement.css'
import tempProfile from '../../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import {MdOutlineMusicVideo , MdAlbum} from 'react-icons/md'
import { useHistory } from 'react-router-dom'
const ArtistListElement = ({artists}) =>{
    const history = useHistory()
    //TODO add hover tips over songs and album
    //TODO change icons into links to the artists page for albums or tracks

    const handleArtistClick = e =>{
        history.push(`/${artists.username}/${artists.id}`)
    }

    return(
        <>
            <div className='artist-list-el-main-container' onClick={handleArtistClick}>
                <div className='artist-list-el-img-container'>
                    <img src={artists.profile_picture} className='artist-list-el-img'/>
                </div>
                <div className='artist-list-el-name-tracks-container'>
                    <div className='artist-list-el-name'>
                        {artists.username}
                    </div>
                    <div className='artist-list-el-tracks-container'>
                        <div className='artist-list-el-tracks artist-numbers'>

                            <MdOutlineMusicVideo />
                            <div className='artist-list-el-song-album'>
                                {artists.songs}
                            </div>

                        </div>
                        <div className='artist-list-el-albums artist-numbers'>
                            <MdAlbum />
                            <div className='artist-list-el-song-album'>
                                {artists.albums}

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='artist-list-el-follow-button-container'>
                    IN PROGRESS
                </div> */}
            </div>

        </>
    )
}

export default ArtistListElement
