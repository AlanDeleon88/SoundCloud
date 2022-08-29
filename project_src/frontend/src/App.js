import LogInFormPage from "./components/LoginFormPage";
import { Route, Switch, NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import {useState, useEffect} from 'react';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));

  }, [dispatch])
  return isLoaded && (
    <>

      <h1>Hello from App</h1>
      <NavLink to='/login'>Login</NavLink>
      <Switch>
        <Route path='/login'>
          <LogInFormPage />

        </Route>


      </Switch>

    </>
  );
}

export default App;
