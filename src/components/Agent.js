import React from 'react';
import { useEffect, useState } from "react";
import '../styles/Agent.css';
import { useHistory } from 'react-router-dom';

/**format of agent object
 *  "AGENT_ID": "f64da681-86c9-4b68-a266-7ae4b8668449",
      "AGENT_NAME": "string",
      "GAME_NAME": "Tic-Tac-Toe",
      "USERNAME": "MikeyMike",
      "AGENT_ELO": 610,
      "AVERAGE_RANKING": 0.4,
      "AGENT_STATUS": -1
 * 
 */

function Agent({ setArbtourney, TOURNAMENT_NAME, AGENT_ID, AGENT_NAME, GAME_NAME, AGENT_ELO, AVERAGE_RANKING, AGENT_STATUS }) {

    const [status, setStatus] = useState('Unknown');

    //state to help user navigate
    const history = useHistory();

    //handle history button click
    const handleClick = () => {
        setArbtourney(TOURNAMENT_NAME);
        history.push('gamepage');
    }

    useEffect(() => {
        switch (AGENT_STATUS) {
            case -1:
                setStatus('Offline');
                break;
            case 0:
                setStatus('Inactive');
                break;
            case 1:
                setStatus('Active');
                break;
            default:
                setStatus('Unknown');
                break;
        }
    }, [AGENT_STATUS])

    return (
        <div className='Agent'>
            <h3><u>Agent Name:</u>   {AGENT_NAME}</h3>
            <h3><u>Game:</u>   {GAME_NAME}</h3>
            <h3><u>ELO:</u>    {AGENT_ELO}</h3>
            <h3><u>Average Ranking:</u>    {AVERAGE_RANKING}</h3>
            <h3><u>Status:</u>     {status}</h3>
            <button className='agenthistory' onClick={handleClick}>History</button>
        </div>
    )
}

export default Agent;