import LogInFormPage from "./components/LoginFormPage_DEPRECIATED";
import SignupFormPage from "./components/SignupFormPage_DEPRECIATED";
import Navigation from "./components/Navigation";
import { Route, Switch, NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';

{/* <i class="fa-regular fa-user-astronaut"></i> */} //!astronaught icon
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));

  }, [dispatch])
  return isLoaded && (
    <>


      <Navigation isLoaded={isLoaded}/>

      <Switch>

        <Route exact path='/'>
          <h1>Hello from App Home</h1>
        </Route>

      </Switch>

    </>
  );
}

export default App;
