import React from 'react';
import Match from '../components/Match';
import '../styles/Matchlist.css';
import useAxios from '../hooks/useAxios';
import axios from '../apis/TourneyServerAPI';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

function Matchlist({ setMatchID, setLive, user, tourney, dt, dtcomp, req, setGame, setGameplay, setP1, setP2, setP1_agent, setP2_agent }) {

    const [matchArr, setMatcharr] = useState([]);
    const [display, setDisplay] = useState(false);

    //axios hook to ll matches
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/match',
        requestConfig: {
            data: {
                username: user,
                tournamentName: tourney,
                gameName: "",
                date: {
                    comparator: dtcomp,
                    val: dt
                }
            }
        }
    });

    //TODO tweak refetch to be used by a function
    // //useEffect to refectch when object is mounted
    // useEffect(() => {
    //     refetch(); 
    // }, []);

    //useEffect to detect a response from the server
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            console.log('Matches Retreived');
            if (response.status === "success") {
                setMatcharr(Array.from(response.resultData));
                setDisplay(true);
            }
        }
    }, [response]);

    //function to determine winner of a match
    const findWinner = (match) => {
        //eslint-disable-next-line
        if (match.R1_RANKING == 0) {
            return (match.U1_USERNAME);
        } else {
            return (match.U2_USERNAME);
        }
    }

    //detect filter changes
    useEffect(() => {
        console.log('refetch');
        setDisplay(false);
        refetch();
    }, [req])

    return (
        <>
            {loading && <Loading caption='Retreiving Game Data...' />}
            <div className='allMatchContainer'>
                <div className='matchList'>
                    <h3 className="heading">Game</h3>
                    <h3 className="heading">Player 1</h3>
                    <h3 className="heading">Player 2</h3>
                    <h3 className="heading">Date</h3>
                    <h3 className="heading">Winner</h3>
                    {error && <h3 style={{ color: "red" }}> Error: Unable to retreive Matches</h3>}
                </div>
                {display ?
                    matchArr.map((match) => {
                        return (
                            <Match
                                game={match.GAME_NAME}
                                p1={match.U1_USERNAME}
                                p1_agent={match.R1_AGENT_ID}
                                p2={match.U2_USERNAME}
                                p2_agent={match.R2_AGENT_ID}
                                winner={findWinner(match)}
                                dt={match.MATCH_LOG_TIMESTAMP}
                                key={match.MATCH_LOG_ID}
                                match_id={match.MATCH_LOG_ID}
                                data={match.MATCH_LOG_DATA}
                                setGameplay={setGameplay}
                                setP1={setP1}
                                setP2={setP2}
                                setP1_agent={setP1_agent}
                                setP2_agent={setP2_agent}
                                setGame={setGame}
                                live={match.MATCH_LOG_IN_PROGRESS}
                                setLive={setLive}
                                setMatchID={setMatchID}
                            />
                        )
                    })
                    : <h2>Acquiring Data Objects...</h2>}
            </div>
        </>
    );
}

export default Matchlist;