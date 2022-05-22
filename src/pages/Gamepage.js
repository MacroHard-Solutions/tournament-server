import React from 'react';
import '../styles/Gamepage.css';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Matchlist from '../components/Matchlist';
import useStore from '../hooks/useStore';

//TODO fix UI error with DatePicker Component
//TODO fix elo with musa

function Watch() {

    //pull necessary info from state
    const { setMatchID, setLiveGame, arbUser, tourney, setGameplay, setP1, setP2, setP1_agent, setP2_agent, setGame } = useStore(state => ({
        arbUser: state.userObj ? state.userObj.USERNAME : '',
        tourney: state.arbTourney,
        setGameplay: state.setGameplay,
        setP1: state.setP1,
        setP2: state.setP2,
        setP1_agent: state.setP1_agent,
        setP2_agent: state.setP2_agent,
        setGame: state.setGame,
        setLiveGame: state.setLiveGame,
        setMatchID: state.setMatchID,
    }));


    const [date, setDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [dateComparator, setDatecomparator] = useState('=');
    const [dateFilter, setDatefilter] = useState(false);
    const [user, setUser] = useState(arbUser);
    const [tournament, setTournament] = useState(tourney);
    const [req, setReq] = useState(false);


    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setDatefilter(true);
        setDate(e);
    };


    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const filter = () => {
        setReq(!req);
    }

    return (
        <div className='watchPage'>
            <div className='filterBox'>
                <h1><u>Filter Options:</u></h1>
                <div className='filterTools'>
                    <input
                        type="text" className="form__input" id="username"
                        placeholder="Enter a Username" required=""
                        value={user} onChange={e => setUser(e.target.value)}
                    />
                    <label htmlFor="username" class="form__label">Username</label>
                    <input
                        type="text" className="form__input" id="tournament"
                        placeholder="Enter a Tournament" required=""
                        value={tournament} onChange={e => setTournament(e.target.value)}
                    />
                    <label htmlFor="tournament" className="form__label">Tournament</label>
                    <div className='dateFilter'>
                        <div class="box">
                            <select class="cmbx" onChange={e => setDatecomparator(e.target.value)}>
                                <option value="=">Exact Date:</option>
                                <option value='>='>Min Date: </option>
                                <option value='<='>Max Date: </option>
                            </select>
                        </div>
                        <>
                            <button className="example-custom-input dateButton" onClick={handleClick}>
                                {dateFilter ? date.toDateString() : 'Click to set Date Filter'}
                            </button>
                            {isOpen && (
                                <DatePicker style={{ position: "absolute !important" }} selected={date} onChange={handleChange} inline />
                            )}
                        </>
                    </div>
                    <button onClick={e => {
                        e.preventDefault();
                        filter();
                    }}>Filter</button>
                </div>
            </div>
            <div className='gamesBox'>
                <h1><u>Available Games to Watch:</u></h1>
                <span className='watchInfo'>Click on a match to Watch the Playback! (Live games are highlighted in Crimson)</span>
                <Matchlist
                    user={user}
                    tourney={tournament}
                    dt={dateFilter ? date.toISOString() : ""}
                    dtcomp={dateFilter ? dateComparator : ""}
                    req={req}
                    setGameplay={setGameplay}
                    setP1={setP1}
                    setP2={setP2}
                    setP1_agent={setP1_agent}
                    setP2_agent={setP2_agent}
                    setGame={setGame}
                    setLive={setLiveGame}
                    setMatchID={setMatchID}
                />
            </div>
        </div>
    );
}

export default Watch;