import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  const {
    axiosInstance,
    method,
    url,
    requestConfig = {}
  } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const refetch = () => setReload(!reload);

  useEffect(() => {
    //let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal
        });
        setResponse(res.data);
        //loading screen
        await new Promise(r => setTimeout(r, 2000));
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // call the function
    fetchData();

    // useEffect cleanup function
    return () => controller.abort();

    // eslint-disable-next-line
  }, [reload]);

  return [response, error, loading, refetch];
}

export default useAxios