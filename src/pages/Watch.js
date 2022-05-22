import React from 'react';
import '../styles/Watch.css';
import axios from '../apis/TourneyServerAPI';
import { FiPause, FiPlay, FiSkipForward, FiSkipBack } from "react-icons/fi";
import useAxios from '../hooks/useAxios';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import useAxiosFunction from '../hooks/useAxiosFunction';
import gameAxios from '../apis/GamingAPI';
import useStore from '../hooks/useStore';
import useForceUpdate from 'use-force-update';
import Leaderboard from '../components/Leaderboard';

function Watch() {

    //pull from store
    const { matchID, liveGame, tournamentID, gameplay, p1, p2, p1_agent, p2_agent, game } = useStore(state => ({
        gameplay: state.gameplay,
        p1: state.p1,
        p2: state.p2,
        p1_agent: state.p1_agent,
        p2_agent: state.p2_agent,
        game: state.game,
        liveGame: state.liveGame,
        tournamentID: state.TournamentID,
        matchID: state.matchID,
    }));

    //setup state to hold retrieved agent data
    const [user1ELO, setEuser1ELO] = useState('');
    const [user2ELO, setEuser2ELO] = useState('');
    const [moves, setMoves] = useState([]);
    const [imgArr, setImgarr] = useState([]);
    const [currImage, setCurrimage] = useState(0);
    const [img, setImg] = useState('https://wpamelia.com/wp-content/uploads/2019/06/loading1.jpg');
    const [playing, setPlaying] = useState(true);
    const [streaming, setStreaming] = useState(false);
    const [info, setInfo] = useState('Live Stream...');
    const forceUpdate = useForceUpdate();

    let currplayImage = 0;
    const setCurrplayimage = (c) => {
        currplayImage = c;
    }
    let playInterval = 0;
    const setPlayinterval = (interval) => {
        playInterval = interval;
        if (interval === 0) {
            currplayImage = 0;
            setCurrimage(0);
        }
    }

    let pollInterval = 0;
    const setPollInterval = (interval) => {
        pollInterval = interval;
        if (interval === 0) {
            currplayImage = 0;
            setCurrimage(0);
        }
    }

    let liveArr = [];
    const setLiveArr = (arr) => {
        //save images as they come in
        liveArr = arr;
    }

    //handle live game playack
    if (liveGame && !streaming) {
        console.log("starting Poll");
        setStreaming(true);
        //if we're streaming a game
        setPollInterval(
            setInterval(() => {
                //poll requests to retreive latest move
                const options = {
                    method: 'POST',
                    url: 'http://54.197.128.13:8001/game-server',
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        data: {
                            type: 'poll',
                            matchLogID: matchID,
                        },
                        signal: {}
                    }
                };

                axios.request(options).then(function (response) {
                    let n = response.data.numberOfStates;
                    if ((currplayImage + 1) != n) {
                        setCurrplayimage(n - 1);
                        let tempArr = Array.from(response.data.imageURIs).map((img) => {
                            return (`http://54.197.128.13:8001/game-server/${img}`);
                        });
                        setImg(tempArr[currplayImage]);
                        console.log('New Move');
                        forceUpdate();
                    }
                    if (response.data == "Match Log ID is not recognised. Unable to process Poll request") {
                        clearInterval(pollInterval);
                        console.log("Match Over");
                    }
                }).catch(function (error) {
                    console.error(error);
                    clearInterval(pollInterval);
                    setInfo('Game Concluded');
                    console.log("Close Poll");
                });
            }, 1500)
        );
    }

    //hook to use axios to make requests to backend
    //eslint-disable-next-line
    const [responseFunction, errorFunction, loadingFunction, axiosFetch] = useAxiosFunction();

    //useaxios hook to pull pair of agents
    //eslint-disable-next-line
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/agent/pair',
        requestConfig: {
            data: {
                agentA: p1_agent,
                agentB: p2_agent,
                'tournamentID': tournamentID,
            }
        }
    });

    //useEffect hook to detect when moves are formatted
    useEffect(() => {
        //check if moves are available
        if (!liveGame) {
            if (moves.length > 0) {
                //request gameplay from gaming server
                axiosFetch({
                    axiosInstance: gameAxios,
                    method: 'POST',
                    url: '',
                    requestConfig: {
                        data: {
                            type: "render",
                            "game": game,
                            "moves": moves
                        }
                    }
                })
            }
        }
    }, [moves])


    //function to setup gameplay for internet request
    const formatGameplay = () => {
        if (gameplay) {
            const Arr = gameplay.split("|");
            return (Arr.slice(1, Arr.length - 1));
        }
    }

    //useEffect to detect response
    useEffect(() => {
        //set gameMoves
        setMoves(formatGameplay());
        const result = Array.isArray(response);

        //TODO make use of agent_elo

        if (response && !result && !liveGame) {
            console.log('Agent Pair Retreived');
            if (response.status === "success") {
                //store pair of agent objects in array
                let agentsArr = Array.from(response.resultData);
                //assign retreived data
                if (agentsArr.length > 0) {
                    setEuser1ELO(agentsArr[0].AGENT_ELO);
                    setEuser2ELO(agentsArr[1].AGENT_ELO);
                }
            }
        }
    }, [response]);

    //listen for gamingapi reponse
    useEffect(() => {
        const result = Array.isArray(responseFunction);
        if (responseFunction && !result) {
            console.log('Gameplay Retreived');
            //store pair of image objects in array
            let tempArr = Array.from(responseFunction.imageURIs).map((img) => {
                return (`http://54.197.128.13:8001/game-server/${img}`);
            })
            setImgarr(tempArr);
        }
    }, [responseFunction]);

    //functions to handle playback of gameplay
    const goBack = () => {
        setPlaying(false);
        clearInterval(playInterval);
        setPlayinterval(0);
        if (currImage !== 0) {
            setCurrimage(currImage - 1);
        }
    }

    const goForward = () => {
        if (playing) {
            setCurrimage(currplayImage);
        }
        setPlaying(false);
        if (currImage < (imgArr.length - 1)) {
            setCurrimage(currImage + 1);
        } else {
            clearInterval(playInterval);
            setPlayinterval(0);
            setPlaying(false);
        }
    }


    const play = () => {
        //TODO fix final image showing 
        setPlaying(true);
        currplayImage = currImage;
        setPlayinterval(setInterval(() => {
            if (currplayImage < (imgArr.length - 1)) {
                setCurrplayimage(currplayImage + 1);
                setImg(`${imgArr[currplayImage]}`);
            } else {
                clearInterval(playInterval);
                setPlayinterval(0);
                setCurrimage(0)
                setPlaying(false);
                setCurrplayimage(0);
            }
        }, 1500));
    }

    const pause = () => {
        clearInterval(playInterval);
        setPlayinterval(0);
        setPlaying(false);
    }

    useEffect(() => {
        if (playing) {
            setCurrimage(currplayImage);
        }
    }, [playing])

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
                    <h2 className={liveGame ? 'liveGame' : 'vs'}>{liveGame ? info : 'VS'}</h2>
                    <div className='userELO'>
                        <h2><u>{p2}</u></h2>
                        <h2>{user2ELO}</h2>
                    </div>
                </div>
                <div className='board'>
                    <img width="100%" height="100%" alt='gameplay data' src={playing ? img : `${imgArr[currImage]}`} />
                </div>
            </div>

            <div className={liveGame ? 'hidePlayback' : 'playbackControls'}>
                <h2 style={{ height: "fit-content" }}>Playback Controls</h2>
                <h4>Move Count: {playing ? currplayImage : currImage}</h4>
                <div className="plbckbtns">
                    <button onClick={(e) => {
                        e.preventDefault();
                        play();
                    }}><FiPlay>Play</FiPlay></button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        pause();
                    }}><FiPause>Pause</FiPause></button>
                </div>
                <div className="plbckbtns">
                    <button onClick={(e) => {
                        e.preventDefault();
                        goBack();
                    }}><FiSkipBack>Back</FiSkipBack></button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        goForward();
                    }}><FiSkipForward>Forward</FiSkipForward></button>
                </div>
            </div>
            <div className='leaderboardandButtons'>
                <div className='Leaderboard'>
                    <h2>Leaderboard</h2>
                    <Leaderboard />
                </div>
                <div className='pgc'>
                    <button className='watchbtns' onClick={forceUpdate}>Play</button>
                    <button className='watchbtns'>Games</button>
                    <button className='watchbtns'>Challenge</button>
                </div>
            </div>
        </div>
    )
}

export default Watch;