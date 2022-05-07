import React from 'react';
import '../styles/Match.css';
import { useHistory } from 'react-router-dom';

function Match({ game, p1, p2, winner, dt, setGame, data, p1_agent, p2_agent, setGameplay, setP1, setP2, setP1_agent, setP2_agent }) {

    //hook for routing app
    const history = useHistory();

    const handleClick = () => {
        //lift up data to App state
        setGameplay(data);
        setP1(p1);
        setP2(p2);
        setP1_agent(p1_agent);
        setP2_agent(p2_agent);
        setGame(game);
        //take user to watch page
        history.push('/watch');
    }

    return (
        <div className="matchHolder" onClick={handleClick}>
            <h5 className="title">{game}</h5>
            <h5 className="title">{p1}</h5>
            <h5 className="title">{p2}</h5>
            <h5 className="title">{dt}</h5>
            <h4 className="title">{winner}</h4>
        </div>
    )
}

export default Match;