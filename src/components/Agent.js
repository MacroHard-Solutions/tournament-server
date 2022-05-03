import React from 'react';
import { useEffect, useState } from "react";

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

function Agent({ AGENT_ID, AGENT_NAME, GAME_NAME, AGENT_ELO, AVERAGE_RANKING, AGENT_STATUS }) {

    const [status, setStatus] = useState('Unknown');

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
            <h3>Agent Name:   {AGENT_NAME}</h3>
            <h3>Game:   {GAME_NAME}</h3>
            <h3>ELO:    {AGENT_ELO}</h3>
            <h3>Average Ranking:    {AVERAGE_RANKING}</h3>
            <h3>Status:     {status}</h3>
            <button className='agenthistory'>History</button>
        </div>
    )
}