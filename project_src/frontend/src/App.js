import Navigation from "./components/Navigation";
import { Route, Switch, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';
import UserAlbums from "./components/UserAlbums";
import AlbumSongsList from "./components/AlbumSongsList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


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


      <Navigation isLoaded={isLoaded}/>

      <Switch>

        <Route exact path='/'>
          <h1>SoundCloud!</h1>

          <NavLink to='/albums'>new album</NavLink>


        </Route>
        <Route path='/albums'>
          <p>Test link to look at another album from another user. If I use songs
            I could link it up to the album song detail page instead. rather than the album list.
            Aslo make multiple slices of state for whatever i need IE usersAlbum and albums can be different slices of state.
            also to update songs, we can update a song when we have a song list in our redux store, just do a thunk action with
            the song id and do an update dispatch with the returned song from the back end to update our store.
            </p>
          <UserAlbums id={2}/>
        </Route>
        <Route path={`/me/albums`}>
          <UserAlbums id={userId}/>
        </Route>

        <Route path={'/'}>

        </Route>

      </Switch>

    </>
  );
}

export default App;
