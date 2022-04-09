import '../styles/App.css';
import Homepage from '../pages/Homepage';
import Leaderboards from '../pages/Leaderboards';
import Profile from '../pages/Profile';
import Header from '../components/Header';
import Notfound from '../pages/Notfound';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PlayerVerification from '../pages/PlayerVerification';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useState } from 'react';
import {Helmet} from 'react-helmet';

function App() {
  
  const [login,setLogin] = useState(false);
  
  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta charSet='utf-8'/>
          <title>Tournament Server</title>
          <meta name='description' content='Wits Tournament Server'/>
        </Helmet>

        <Header/>
      </div>
      <div className='main'>
      <Switch>
        <Route path='/' component={Homepage} exact/>
        <Route path='/home' component={Homepage} exact/>
        <Route path='/leaderboards' component={Leaderboards}/>
        <Route path='/profile'>
          <Profile login={login} setLogin={setLogin}/>
        </Route>
        <Route path='/playerverification' component={PlayerVerification}/>
        <Route path='/signin'>
          <SignIn login={login} setLogin={setLogin}/>  
        </Route>
        <Route path='/signup' component={SignUp}/>
        <Route component={Notfound}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
