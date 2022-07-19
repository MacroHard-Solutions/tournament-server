import React from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../apis/TourneyServerAPI';
import {useEffect,useState} from 'react';
import LdbEntry from './LdbEntry';

function Leaderboard({tournamentID}) {

    const [show,setShow] = useState(false);
    const [data,setData] = useState([]);

    //useaxios hook to pull leaderboard data
    //eslint-disable-next-line
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: `/agent/${tournamentID}`,
    });

    useEffect(() => {
        const result = Array.isArray(response);
        if(response && !result){
            //set data
            setData(Array.from(response.resultData));
            setShow(true);
        }
    }, [response]);

    useEffect(() => {
        if(show && data){
            console.log(data);
        }
    }, [data])

    return (
        <>
            {show ? data.map((item) => {
                return(
                    <LdbEntry item={item}/>
                );
            }) : <h1>Leaderboard Unavailable</h1>}
        </>
    );
}

export default Leaderboard;