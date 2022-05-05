import React from 'react';
import { useEffect, useState } from "react";
import '../styles/GameTile.css';
import { useHistory } from 'react-router-dom';
import { MdOutlinePlayArrow, MdVideoLabel } from 'react-icons/md'

//TODO smooth out hover animation using css

function GameTile({ title, key, imageurl, game_id }) {

    const [hovering, setHovering] = useState(false);


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

    return (
        <div className='gameTile'>
            <h3 className="Title">{title}</h3>
            <div
                className="imageholder"
                onMouseEnter={() => {
                    setHovering(true);
                }}
                onMouseLeave={() => {
                    setHovering(false);
                }}
                style={{ width: '20em', height: '15em', backgroundSize: 'cover', borderRadius: '1em', backgroundImage: `url(${imageurl})` }}>
                <div className={hovering ? 'showButtons' : 'hideButtons'}>
                    <div className='buttonHolder'>
                        <MdOutlinePlayArrow onClick={pushPlay} />
                        <span>Play</span>
                    </div>
                    <div className='buttonHolder'>
                        <MdVideoLabel onClick={pushWatch} />
                        <span>watch</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default GameTile;