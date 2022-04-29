import { useState, useEffect } from "react";

const useAxiosFunction = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); //different!
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            setError(null);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            //console.log(res);
            setResponse(res.data);
            //loading screen
            //await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
            // /console.log(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //console.log(controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunction