import React from 'react';
import '../styles/Watch.css';

function Watch() {
    return (
    <div className="watch">
        <div className='gameBoard'>
            <div className='usersPlaying'>
                <div className='userELO'>
                    <h2>KatTheGod</h2>
                    <h2>ELO: 1800</h2>
                </div>
                <h2>VS</h2>
                <div className='userELO'>
                    <h2>LordGregorious</h2>
                    <h2>ELO: 1700</h2>
                </div>
            </div>
            <div className='board'>
                <img width="100%" height="100%" src="/imgs/chess_board.jpg"/>
            </div>
        </div>

        <div className='playbackControls'>
            <h2>Playback Controls</h2>
        </div>
        <div className='leaderboardandButtons'>
            <div className='Leaderboard'>
                <h2>Leaderboard</h2>
            </div>
            <div className='pgc'>
                <button>Play</button>
                <button>Games</button>
                <button>Challenge</button>
            </div>
        </div>
    </div>
    )
}

export default Watch;