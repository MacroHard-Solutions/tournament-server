import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://tournament-server.herokuapp.com/api/v2/';

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload,setReload] = useState(true);

    const fetch = () => setReload(!reload);

    const fetchData = async (params) => {
      try {
          setLoading(true);
       const result = await axios.request(params);
       //temporary to test loading screen
        await new Promise(r => setTimeout(r, 2000));
       setResponse(result.data);
       } catch( err ) {
         setError(err.message);
       } finally {
            setLoading(false);
       }
    };

    useEffect(() => {
        fetchData(axiosParams);
        
        //eslint-disable-next-line
    }, [reload]); // execute once only

    return { response, error, loading , fetch};
};