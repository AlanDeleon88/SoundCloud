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

import './index.css'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const songUrl = useSelector(state => state.songUrl);
  const currentAlbum = useSelector(state=>state.currentAlbum);
  const img_url = 'https://i.imgur.com/DUdZ9nr.png';
  //!work on splash page next, make a query to songs to get a handful of songs and display them in the splash page
  //! work on making an actual navbar.
  //!create a splash header
  //!create a user's album header
  //!created an album header
  //? maybe grab artist state here for routes and stuff.
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
        <SiteHeader isLoaded={isLoaded}/>
      </div>

      <Switch>

        <Route exact path='/'>
        <div className='splash-pic'>
            <img src={img_url} className='img-el'/>
            {/* make component. if session user go to /meAlbums to add album, else open signup module*/}
            <div className="upload-song-button"> <UploadModal /> </div>
        </div>

        <div className="splash">

          <SplashSongs />

        </div>

          <NavLink to='/albums'>new album</NavLink>

        </Route>

        <Route exact path = '/albums/:albumId/songs/:songId'>
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
