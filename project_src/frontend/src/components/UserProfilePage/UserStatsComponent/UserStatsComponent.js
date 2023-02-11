import './UserStatsComponent.css'
import {MdOutlineMusicVideo , MdAlbum} from 'react-icons/md'


const UserStatsComponent = ({user}) =>{


    return(
        <>
            <div className='user-stats-main-container'>
                <div className='user-stats-tracks'>
                    <div className='user-stats-label'>
                        Tracks
                    </div>
                    <div className='user-stats-numbers'>
                        <div  className='user-stats-icon'>
                            <MdOutlineMusicVideo />

                        </div>
                        {user.totalSongs}
                    </div>
                </div>
                <div className='user-stats-albums'>
                    <div className='user-stats-label'>
                        Albums
                    </div>
                    <div className='user-stats-numbers'>
                        <div className='user-stats-icon'>
                            <MdAlbum />

                        </div>
                        {user.totalAlbums}
                    </div>
                </div>


            </div>

        </>
    )

}

export default UserStatsComponent
