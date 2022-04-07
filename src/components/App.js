import '../styles/App.css';
import GameCollection from '../pages/GameCollection';
import Homepage from '../pages/Homepage';
import Leaderboards from '../pages/Leaderboards'
import Profile from '../pages/Profile'
import Signing from '../pages/Signing'
import Header from '../components/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router basename='home'>
      <div className="App">
        <Header/>
      </div>
      <Switch>
        <Route path='/' component={Homepage} exact/>
        <Route path='/play' component={GameCollection}/>
        <Route path='/watch' component={GameCollection}/>
        <Route path='/leaderboards' component={Leaderboards}/>
        <Route path='/profile' component={Profile}/>
        <Route path='playerverification' component={Signing}/>
      </Switch>
    </Router>
  );
}

export default App;
