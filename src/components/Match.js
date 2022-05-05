import React from 'react';
import '../styles/Match.css'

function Match({ game, p1, p2, winner, dt, data }) {
    return (
        <div className="matchHolder">
            <h5 className="title">{game}</h5>
            <h5 className="title">{p1}</h5>
            <h5 className="title">{p2}</h5>
            <h5 className="title">{dt}</h5>
            <h4 className="title">{winner}</h4>
        </div>
    )
}

export default Match;