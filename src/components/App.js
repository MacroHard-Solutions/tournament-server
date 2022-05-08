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
import { Helmet } from 'react-helmet';
import React from 'react';
import useStore from '../hooks/useStore';

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

  //pull necessary info from state
  const { userObj, setUserobj, arbTourney, setArbtourney, gameplay, setGameplay, p1, setP1, p2, setP2, p1_agent, setP1_agent, p2_agent, setP2_agent, game, setGame } = useStore(state => ({
    userObj: state.userObj,
    setUserobj: state.setUserobj,
    arbTourney: state.arbTourney,
    setArbtourney: state.setArbtourney,
    gameplay: state.gameplay,
    setGameplay: state.setGameplay,
    p1: state.p1,
    setP1: state.setP1,
    p2: state.p2,
    setP2: state.setP2,
    p1_agent: state.p1_agent,
    setP1_agent: state.setP1_agent,
    p2_agent: state.p2_agent,
    setP2_agent: state.setP2_agent,
    game: state.game,
    setGame: state.setGame,
  }));

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
          <Route path='/watch'>
            <Watch
              gameplay={gameplay}
              p1={p1}
              p1_agent={p1_agent}
              p2={p2}
              p2_agent={p2_agent}
              game={game}
            />
          </Route>{/*Watch page where the user can watch an historical game*/}
          <Route path='/leaderboards' component={Leaderboards} />{/*Community page wherteby users can see the leaderboards per game */}
          <Route path='/profile'>
            <Profile
              userObj={userObj}
              setuserObj={setUserobj}
              setArbtourney={setArbtourney}
            />{/*Profile page where a user can see their social details as well as their rvailable agents*/}
          </Route>
          <Route path='/playerverification' component={PlayerVerification} />{/*Page for user to decide between SignIN & SignUp*/}
          <Route path='/signin'>
            <SignIn userObj={userObj} setuserObj={setUserobj} />  {/*SignIn page*/}
          </Route>
          <Route path='/signup'>
            <SignUp userObj={userObj} setuserObj={setUserobj} />{/*SignUp page*/}
          </Route>
          <Route path='/amc' component={AMC} />{/*Agent management console for users to manage their available agents*/}
          <Route path='/gamepage'>
            <Gamepage
              arbUser={userObj ? userObj.USERNAME : ''}
              tourney={arbTourney}
              setGameplay={setGameplay}
              setP1={setP1}
              setP2={setP2}
              setP1_agent={setP1_agent}
              setP2_agent={setP2_agent}
              setGame={setGame}
            />
          </Route>{/*Page to show historical games for users to watch*/}
          <Route component={Notfound} />{/*default route for a 404 page not found error*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
