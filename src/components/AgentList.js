import React from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../apis/TourneyServerAPI';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import Agent from '../components/Agent';
import '../styles/AgentList.css';

function AgentList({ userObj, setArbtourney }) {

    const [agentsArr, setAgentsarr] = useState([]);
    const [display, setDisplay] = useState(false);

    //TODO implement refetch

    //useAxios hook to pull agent data
    //eslint-disable-next-line
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/agent',
        requestConfig: {
            data: {
                userID: userObj.USER_ID
            }
        }
    });

    //useEffect to refectch when object is mounted
    useEffect(() => {
        refetch();
    }, [])

    //useEffect to detect a response from the server
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            console.log('Agents Retreived');
            if (response.status === "success") {
                setAgentsarr(Array.from(response.resultData));
                setDisplay(true);
            }
        }
    }, [response])

    return (
        <div className='agentList'>
            {loading && <Loading caption='Retreiving User Agents' />}
            <h2>Agent List</h2>
            {error && <h3 style={{ color: "red" }}>Error: Unable to retreive User Agents</h3>}
            {display && agentsArr.map((agent) => {
                return (
                    <Agent
                        AGENT_ID={agent.AGENT_ID}
                        AGENT_NAME={agent.AGENT_NAME ? agent.AGENT_NAME : 'Unknown'}
                        GAME_NAME={agent.GAME_NAME}
                        AGENT_ELO={agent.AGENT_ELO}
                        AVERAGE_RANKING={agent.AVERAGE_RANKING}
                        AGENT_STATUS={agent.AGENT_STATUS}
                        key={agent.AGENT_ID}
                        TOURNAMENT_NAME={agent.TOURNAMENT_NAME}
                        setArbtourney={setArbtourney}
                    />
                );
            })}
        </div>
    );
}

export default AgentList;