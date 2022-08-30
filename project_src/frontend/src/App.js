import LogInFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
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

        <Route path='/login'>
          <LogInFormPage />
        </Route>

        <Route path='/signup'>
          <SignupFormPage />
        </Route>




      </Switch>

    </>
  );
}

export default App;
