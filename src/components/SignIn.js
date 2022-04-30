/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/SignIn.css";
import Loading from "../components/Loading";
import hash from "../components/hash";
import axios from '../apis/TourneyServerAPI';
import useAxiosFunction from "../hooks/useAxiosFunction";

/*
    Task List:
    TODO Enable sha256 for encypting password
*/

function SignIn({ userObj, setuserObj }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginattempt, setLoginattempt] = useState(false);
    const [errorPrompt, setErrorprompt] = useState(false);
    const [errorCaption, setErrorcaption] = useState("Loading...");

    //history hook
    const history = useHistory();

    const [response, error, loading, axiosFetch] = useAxiosFunction();

    //function to recieve data
    const getData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/user/login',
            requestConfig: {
                data: {
                    "username_email": username,
                    "passwd": password
                }
            }
        });

        setLoginattempt(false);
    };

    //useeffect for when error changes
    useEffect(() => {
        if (error) {
            setErrorprompt(true);
            setErrorcaption('User Not Found');
            console.log('User Not Found');
            console.log(error);
        }
    }, [error])

    //useeffect for when response changes
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            console.log('User Found');
            if (response.status === "success") {
                setuserObj(response.resultData[0]);
                history.push('profile');
                //TODO clear comment
                console.log(response.resultData[0]);
            }
        }
        //eslint-disable-next-line
    }, [response]);

    //useeffect hook only called when user attempts to log in
    useEffect(() => {
        if (loginattempt) {
            if (username && password) {
                getData();
                //test encyption
                //hash("foo").then((hex) => console.log(hex));
            } else {
                setLoginattempt(false);
                setUsername("");
                setPassword("");
                setErrorprompt(true);
                setErrorcaption('Invalid Inputs')
            }
        }
        //eslint-disable-next-line
    }, [loginattempt])

    //useEffect hook for when the user needs to be prompted for details
    useEffect(() => {
        if (errorPrompt) {
            setUsername("");
            setPassword("");
        }
    }, [errorPrompt]);


    return (
        <div className='Signin'>
            <div className="Signinbox">
                <h2>Sign In</h2>
                {errorPrompt && <span className='loginprompt'>{errorCaption}</span>}
                {loading && <Loading caption='Loading User Credentials...' />}
                <form>
                    <div className="input-container">
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoFocus
                        />
                        <label>Email/Username:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label>Password:</label>
                    </div>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            setLoginattempt(true);
                        }}
                    >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;