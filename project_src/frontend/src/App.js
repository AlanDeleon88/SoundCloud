import Navigation from "./components/Navigation";
import { Route, Switch, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';
import UserAlbums from "./components/UserAlbums";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));

  }, [dispatch])
  const user = useSelector(state=>state.session.user);

  return isLoaded && (
    <>


      <Navigation isLoaded={isLoaded}/>

      <Switch>

        <Route exact path='/'>
          <h1>SoundCloud!</h1>
        </Route>
        <Route path={`/me/albums`}>
          <UserAlbums id={user.id}/>
        </Route>

      </Switch>

    </>
  );
}

export default App;
