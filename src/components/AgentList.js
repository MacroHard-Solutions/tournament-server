import React from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../apis/TourneyServerAPI'

function AgentList({ userObj }) {

    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/agents',
        requestConfig: {
            data: {

            }
        }
    });

    return (
        <h3>AgentList</h3>
    );
}

export default AgentList;