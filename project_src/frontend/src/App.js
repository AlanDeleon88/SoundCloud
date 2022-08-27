import LogInFormPage from "./components/LoginFormPage";
import { Route, Switch} from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path='/login'>
          <LogInFormPage />

        </Route>


      </Switch>

    </>
  );
}

export default App;
