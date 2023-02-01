import './ArtistElement.css'
import tempProfile from '../../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import {MdOutlineMusicVideo , MdAlbum} from 'react-icons/md'
const ArtistListElement = ({artists}) =>{

    return(
        <>
            <div className='artist-list-el-main-container'>
                <div className='artist-list-el-img-container'>
                    <img src={tempProfile} className='artist-list-el-img'/>
                </div>
                <div className='artist-list-el-name-tracks-container'>
                    <div className='artist-list-el-name'>
                        {artists.username}
                    </div>
                    <div className='artist-list-el-tracks-container'>
                        <div className='artist-list-el-tracks artist-numbers'>
                            <MdOutlineMusicVideo />
                            {artists.songs}
                        </div>
                        <div className='artist-list-el-albums artist-numbers'>
                            <MdAlbum />
                            {artists.albums}
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
