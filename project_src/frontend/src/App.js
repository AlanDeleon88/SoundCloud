
import { Route, Switch, NavLink, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';
import UserAlbums from "./components/UserAlbums";
import SplashSongs from "./components/SplashSongs";
import SiteHeader from "./components/SiteHeader";
import UploadModal from "./components/UploadModal";
import SongAlbumList from "./components/SongAlbumList";
import splash_header from './img_src/splash_3.png'
import LoggedInSiteHeader from "./components/LoggedInSiteHeader";
import LoggedHome from "./components/LoggedHome";
import UserProfilePage from "./components/UserProfilePage";
import './index.css'
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import MultiUploadUtil from "./components/MultiFileUploadUtil";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const img_url = 'https://i.imgur.com/DUdZ9nr.png';

  //TODO double check width styling in lists
  //TODO fix profile button dropdown menu /////// DONE?
  //TODO fix warnings
  //TODO add edit songs functionality
  //TODO make a readme
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));

  }, [dispatch])
  const user = useSelector(state=>state.session.user);

  let userId;

  if(user){
    userId = user.id
  }

  return isLoaded && (
    <>
    <div className="site-body">
      {/* {console.log(window.location.pathname)} */}
      <div className ='site-header'>
        {/* need to render a different site header depending if theres a user or not. */}
        { user ?
          (
            <>
              <LoggedInSiteHeader />
            </>
          )
          :
          (
            <>



            </>
          )

        }


      </div>

      <Switch>

        {/* can dynamically render this homepage between the splash page and the login home */}
        <Route exact path='/'>
        { user ?
          (
            <>

              <div className="logged-home-container">

                <LoggedHome />

              </div>
            </>
          )
          :
          (
            <>
            <div className='home-header'>
              <SiteHeader isLoaded={isLoaded}/>

            </div>
              <div className='splash-pic'>
                <img src={splash_header} className='img-el'/>
              {/* make component. if session user go to /meAlbums to add album, else open signup module*/}

                <div className="upload-song-button">

                  <div className="splash-caption">
                    Discover your sound.
                  </div>

                  <UploadModal />

                </div>

            </div>

          <div className="splash">

            <SplashSongs />

          </div>


          </>
          )
        }

        </Route>


        <Route path={'/utils/upload'}>
          <MultiUploadUtil />
        </Route>

        <Route path = '/albums/:albumId/songs/:songId'>
           { !user &&
            <LoggedInSiteHeader />

          }

          <SongAlbumList />

        </Route>

        <Route path = '/:username/:userId'>
          {/* might have to make another edit to site nav whether user
            is logged in or not. will either show login or sign up options, or show profile drop down..
            might have to add this component to each route...
          */}
          { !user &&
            <LoggedInSiteHeader />

          }

            <UserProfilePage />


          {/* TEST ROUTE MOFO */}

        </Route>




        <Route path={`/me/albums`}>
          <div className='album-comp-container'>

            <div className="test">
                {/* HelloTestWtf */}
            </div>
            {/* <UserAlbums id={userId}/> */}
          </div>
        </Route>


        <Route path={'/:userId/albums'}>
          <UserAlbums />
        </Route>


        <Route path={'/'}>
          <p>Page not found</p>
        </Route>


      </Switch>
      <div className="music-player-placeholder">
         <MusicPlayer />
      </div>

    </div>


    </>
  );
}

export default App;
