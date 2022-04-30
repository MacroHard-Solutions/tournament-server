import React from 'react';
import { useEffect } from "react";
import '../styles/Homepage.css';
import GameTile from '../components/GameTile';

function Homepage() {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])


    return (
        <div className="Home">
            <h1>Popular Games</h1>
            <div className="Popgames">
                <div className="game">
                    <GameTile title="Chess" />
                </div>
                <div className="game">
                    <GameTile title="Rock-Paper-Scissors" />
                </div>
                <div className="game">
                    <GameTile title="Tick-Tac-Toe" />
                </div>
            </div>
        </div>
    )
}
export default Homepage;