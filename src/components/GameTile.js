import React from 'react';
import { useEffect } from "react";
import '../styles/GameTile.css';
import { useHistory } from 'react-router-dom';
import { FaRegEye, FaPlay } from 'react-icons/fa';

const GameTile = props => {

    const history = useHistory();

    const pushPlay = () => {
        history.push('/play');
    }

    const pushWatch = () => {
        history.push('/watch');
    }


    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    var image = 'url("/imgs/chess.jpg")';
    if (props.title === "Rock-Paper-Scissors") {
        image = 'url("/imgs/rps.jpg")';
    }
    if (props.title === "Tick-Tac-Toe") {
        image = 'url("/imgs/ttt.jpg")';
    }

    return (
        <div>
            <h3 className="Title">{props.title}</h3>
            <div className="imageholder">
                <div style={{ width: '20em', height: '10em', backgroundSize: 'cover', borderRadius: '1em', backgroundImage: image }}>
                    <div className="tilebuttons">
                        <div className="tileicon">
                            <FaPlay size="2em" />
                            <FaRegEye size="2em" />
                        </div>
                        <button className="buttonn" onClick={pushPlay}>Play</button>
                        <button className="buttonn" onClick={pushWatch}>Watch</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GameTile;