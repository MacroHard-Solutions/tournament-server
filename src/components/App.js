import '../styles/App.css';
import GameCollection from '../pages/GameCollection';
import Homepage from '../pages/Homepage';
import Leaderboards from '../pages/Leaderboards'
import Profile from '../pages/Profile'
import Signing from '../pages/Signing'
import Header from '../components/Header';
import Notfound from '../pages/Notfound'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useState } from 'react';

function App() {
  
  const [login,setLogin] = useState();

  return (
    <Router basename='home'>
      <div className="App">
        <Header/>
      </div>
      <div className='main'>
      <Switch>
        <Route path='/' component={Homepage} exact/>
        <Route path='/play' component={GameCollection}/>
        <Route path='/watch' component={GameCollection}/>
        <Route path='/leaderboards' component={Leaderboards}/>
        <Route path='/profile'>
          <Profile login={login}/>
        </Route>
        <Route path='/playerverification' component={Signing}/>
        <Route component={Notfound}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
