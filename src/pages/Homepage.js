import React from 'react';
import { useEffect } from "react";
import '../styles/Homepage.css';
import GameTile from '../components/GameTile';

import ParticlesBg from 'particles-bg';

function Homepage() {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])


    return (
        <div className="Home">
            <ParticlesBg type="cobweb" color= "#0e4588" bg={{position: "fixed", zIndex: -1, width: "150%", height: "120%"}}/>
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