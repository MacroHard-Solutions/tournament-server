import '../styles/App.css';
import Homepage from '../pages/Homepage';
import Leaderboards from '../pages/Leaderboards';
import Profile from '../pages/Profile';
import Header from '../components/Header';
import Notfound from '../pages/Notfound';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PlayerVerification from '../pages/PlayerVerification';
import Play from '../pages/Play';
import Watch from '../pages/Watch';
import AMC from '../pages/AMC';
import Gamepage from '../pages/Gamepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import React from 'react';

/*
  App Structure:
          
        Homepage(showing collection of games) -> ChallengePage -> {AMC if needed}
                                              |-> GamesPage -> WatchPage

        
  App -
             |->Agent Management Console(AMC) -> New Agent tab
             |
             |-> About
             |        
        menu                              |->GamesPage(Filters -> props)
                    |->Profile ->agents-> ChallengePage(filters -> props)
                    |          |-> userInfo
                    |
             |Profile->Sigining -> SignIn OR SignUp
             |
             |
             | ->Leaderboards
*/


function App() {

  const [userObj, setuserObj] = useState(null);
  //TODO try and find a better workaround for the homepage => gamepage filter issue
  const [arbTourney, setArbtourney] = useState('');

  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta charSet='utf-8' />
          <title>Tournament Server</title>
          <meta name='description' content='Wits Tournament Server' />
        </Helmet>

        <Header />
      </div>
      <div className='main'>
        <Switch>
          <Route path='/' exact>
            <Homepage
              arbTourney={arbTourney}
              setArbtourney={setArbtourney}
            />
          </Route>{/*Homepage whereby users will be shown GameTiles representing all games*/}
          <Route path='/home' exact>
            <Homepage
              arbTourney={arbTourney}
              setArbtourney={setArbtourney}
            />
          </Route>{/**/}
          <Route path='/play' component={Play} />{/*Challenge page whereby users can see available opponent agents, and challenge them*/}
          <Route path='/watch' component={Watch} />{/*Watch page where the user can watch an historical game*/}
          <Route path='/leaderboards' component={Leaderboards} />{/*Community page wherteby users can see the leaderboards per game */}
          <Route path='/profile'>
            <Profile userObj={userObj} setuserObj={setuserObj} />{/*Profile page where a user can see their social details as well as their rvailable agents*/}
          </Route>
          <Route path='/playerverification' component={PlayerVerification} />{/*Page for user to decide between SignIN & SignUp*/}
          <Route path='/signin'>
            <SignIn userObj={userObj} setuserObj={setuserObj} />  {/*SignIn page*/}
          </Route>
          <Route path='/signup'>
            <SignUp userObj={userObj} setuserObj={setuserObj} />{/*SignUp page*/}
          </Route>
          <Route path='/amc' component={AMC} />{/*Agent management console for users to manage their available agents*/}
          <Route path='/gamepage'>
            <Gamepage tourney={arbTourney} />
          </Route>{/*Page to show historical games for users to watch*/}
          <Route component={Notfound} />{/*default route for a 404 page not found error*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
