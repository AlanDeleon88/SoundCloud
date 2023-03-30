import './LoggedHome.css'
import SplashSongs from '../SplashSongs'
import ExploreUserComponent from './ExploreUserComponent'
import FeaturedAlbums from '../FeaturedAlbums/FeaturedAlbums'


const LoggedHome = () =>{
    //TODO maybe add featured playlists or featured albums to fill out page more.

    return(
        <>
            <div className='logged-home-main-container'>
                <div className='logged-splash-featured-container'>
                    <SplashSongs />

                    <FeaturedAlbums />

                </div>

                {/* Eventually add another row of tracks by a random followed user
                    OR random tracks from followed users */}
                <ExploreUserComponent />
            </div>
        </>
    )

}


export default LoggedHome
