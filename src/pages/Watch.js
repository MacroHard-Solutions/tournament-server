import React from 'react';
import '../styles/Watch.css';
import axios from '../apis/TourneyServerAPI';
import { FiPause, FiPlay, FiSkipForward, FiSkipBack } from "react-icons/fi";
import useAxios from '../hooks/useAxios';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import useAxiosFunction from '../hooks/useAxiosFunction';
import gameAxios from '../apis/GamingAPI';

function Watch({ gameplay, p1, p2, p1_agent, p2_agent, game }) {

    //setup state to hold retrieved agent data
    const [user1ELO, setEuser1ELO] = useState('');
    const [user2ELO, setEuser2ELO] = useState('');
    const [moves, setMoves] = useState([]);

    //hook to use axios to make requests to backend
    const [responseFunction, errorFunction, loadingFunction, axiosFetch] = useAxiosFunction();

    //useaxios hook to pull pair of agents
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/agent/pair',
        requestConfig: {
            data: {
                agentA: p1_agent,
                agentB: p2_agent
            }
        }
    });

    //useEffect hook to detect when moves are formatted
    useEffect(() => {
        //check if moves are available
        if (moves.length > 0) {
            //request gameplay from gaming server
            axiosFetch({
                axiosInstance: gameAxios,
                method: 'POST',
                url: '',
                requestConfig: {
                    data: {
                        type: 'render',
                        "game": game,
                        "moves": moves
                    }
                }
            })
        }
    }, [moves])


    //function to setup gameplay for internet request
    const formatGameplay = () => {
        const Arr = gameplay.split("|");
        return (Arr.slice(1, Arr.length - 1));
    }


    //useEffect to detect response
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            console.log('Agent Pair Retreived');
            //set gameMoves
            setMoves(formatGameplay());
            if (response.status === "success") {
                //store pair of agent objects in array
                let agentsArr = Array.from(response.resultData);
                //assign retreived data
                setEuser1ELO(agentsArr[0].AGENT_ELO);
                setEuser2ELO(agentsArr[1].AGENT_ELO);
            }
        }
    }, [response]);

    //listen for gamingapi reponse
    useEffect(() => {
        const result = Array.isArray(responseFunction);
        if (responseFunction && !result) {
            console.log('Gameplay Retreived');
            if (responseFunction.status === "success") {
                //store pair of image objects in array
                let imgArr = Array.from(responseFunction.imageURIs);
                console.log(imgArr);
            }
        }
    }, [responseFunction])

    return (
        <div className="watch">
            {loading && <Loading caption='Retreiving Agent Data...' />}
            {loadingFunction && <Loading caption='Retreiving Gameplay Data...' />}
            <div className='gameBoard'>
                <div className='usersPlaying'>
                    <div className='userELO'>
                        <h2><u>{p1}</u></h2>
                        <h2>{user1ELO}</h2>
                    </div>
                    <h2 className='vs'>VS</h2>
                    <div className='userELO'>
                        <h2><u>{p2}</u></h2>
                        <h2>{user2ELO}</h2>
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