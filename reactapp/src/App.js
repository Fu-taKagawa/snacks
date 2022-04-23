
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {AuthProvider} from './AuthService';
import LoggedInRoute from "./LoggedInRoute";

import Home from './pages/Home';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <AuthProvider>
            <Router>
                <Switch>
                  <LoggedInRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/signup' component={SignUp} />
                </Switch>
            </Router>
        </AuthProvider>
  );
}

export default App;
