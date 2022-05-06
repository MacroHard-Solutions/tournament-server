import React from 'react';
import '../styles/Watch.css';
import axios from '../apis/GamingAPI';
import { FiPause, FiPlay, FiSkipForward, FiSkipBack } from "react-icons/fi";

function Watch({ gameplay, p1, p2 }) {
    return (
        <div className="watch">
            <div className='gameBoard'>
                <div className='usersPlaying'>
                    <div className='userELO'>
                        <h2><u>KatTheGod</u></h2>
                        <h2>ELO: 1800</h2>
                    </div>
                    <h2 className='vs'>VS</h2>
                    <div className='userELO'>
                        <h2><u>LordGregorious</u></h2>
                        <h2>ELO: 1700</h2>
                    </div>
                </div>
                <div className='board'>
                    <img width="100%" height="100%" src="/imgs/chess_board.jpg" />
                </div>
            </div>

            <div className='playbackControls'>
                <h2 style={{ height: "fit-content" }}>Playback Controls</h2>
                <div className="plbckbtns">
                    <button><FiPlay>Play</FiPlay></button>
                    <button><FiPause>Pause</FiPause></button>
                </div>
                <div className="plbckbtns">
                    <button><FiSkipBack>Back</FiSkipBack></button>
                    <button><FiSkipForward>Forward</FiSkipForward></button>
                </div>
            </div>
            <div className='leaderboardandButtons'>
                <div className='Leaderboard'>
                    <h2>Leaderboard</h2>
                </div>
                <div className='pgc'>
                    <button className='watchbtns'>Play</button>
                    <button className='watchbtns'>Games</button>
                    <button className='watchbtns'>Challenge</button>
                </div>
            </div>
        </div>
    )
}

export default Watch;