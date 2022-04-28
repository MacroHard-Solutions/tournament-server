/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/SignIn.css";
import Loading from "../components/Loading";
import { useAxios } from "../hooks/useAxios";
import hash from "../components/hash";

/*
    TODO List:
    Enable sha256 for encypting password
*/

function SignIn({ userObj, setuserObj }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginattempt, setLoginattempt] = useState(false);
    const [errorPrompt, setErrorprompt] = useState(false);
    const [errorCaption, setErrorcaption] = useState("Loading...");

    const history = useHistory();

    //Axios hook to enable networking
    const { response, loading, error, fetch } = useAxios({
        method: "POST",
        url: "user/login",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "username_email": username,
            "passwd": password //injo6dwrpz
        }
    });

    //function to recieve data
    const getData = async () => {
        console.log("fetching...");
        await fetch();
        if (response) {
            if (response.status === "Not Found") {
                setErrorprompt(true);
                setErrorcaption("User Not Found; Username and/or Email invalid");
                console.log("not found");
                setErrorprompt(true);
            } else
                if (response.status === "success") {
                    console.log("fetched");
                    console.log(response);
                    //TODO clear comments and set user object
                    setuserObj(response.user);
                    setErrorprompt(false);
                    //user is correct hence move on to profile page
                    history.push("/profile");
                }
        }
        else if (error) {
            console.log(error);
            setErrorprompt(true);
            setErrorcaption('Server Error');
        }

        setLoginattempt(false);
    };

    //useEffect hook for when the user needs to be prompted for details
    useEffect(() => {
        if (errorPrompt) {
            setUsername("");
            setPassword("");
        }
    }, [errorPrompt]);

    //useeffect hook only called when user attempts to log in
    useEffect(() => {
        if (loginattempt) {
            if (username && password) {
                fetch();
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

    return (
        <div className='Signin'>
            <div className="Signinbox">
                <h2>Sign In</h2>
                {errorPrompt && <span className='loginprompt'>{errorCaption}</span>}
                {loading && <Loading caption='Loading...' />}
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