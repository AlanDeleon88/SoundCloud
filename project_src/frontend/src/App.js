import Navigation from "./components/Navigation";
import { Route, Switch, NavLink, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';
import UserAlbums from "./components/UserAlbums";
import SplashSongs from "./components/SplashSongs";
import SiteHeader from "./components/SiteHeader";
import UploadModal from "./components/UploadModal";
import AlbumSongsList from "./components/AlbumSongsList/AlbumSongsList";
import SongAlbumList from "./components/SongAlbumList";
import splash_header from './img_src/splash_3.png'

import './index.css'


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

      <div className ='site-header'>
        {/* need to render a different site header depending if theres a user or not. */}
        { user ?
          (
            <>

            </>
          )
          :
          (
            <>
              <SiteHeader isLoaded={isLoaded}/>
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

            </>
          )
          :
          (
            <>
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
          {/* Eventually get rid of this and add 2 links next to site header */}
          {/* <a className='about-link' href='https://github.com/AlanDeleon88'> About </a> */}

        </div>


            </>
          )
        }

        </Route>

        <Route path = '/albums/:albumId/songs/:songId'>
            <SongAlbumList />

        </Route>


        <Route path={`/me/albums`}>
          <div className='album-comp-container'>
            <UserAlbums id={userId}/>
          </div>
        </Route>


        <Route path={'/:userId/albums'}>
          <UserAlbums />
        </Route>

        <Route path={'/'}>
          <p>Page not found</p>
        </Route>


      </Switch>

    </div>


    </>
  );
}

export default App;
