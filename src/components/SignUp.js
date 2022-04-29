/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "../styles/SignUp.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAxios } from "../hooks/useAxios";
import Loading from "../components/Loading";
import axios from "axios";

/*
    TODO List:
        Enable sha256 for password encryption
        validate data fields
        fix requests
*/

function SignUp({ userObj, setuserObj }) {
    //state for data entries
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [signupattempt, setSignupattempt] = useState(false); //state of submission button being clicked
    const [errorPrompt, setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption, setErrorcaption] = useState("Loading...");
    const [checkLoading, setCheckloading] = useState(false);

    const history = useHistory();

    //checkUser
    const checkUser = async () => {
        const options = {
            method: 'POST',
            url: 'https://tournament-server.herokuapp.com/api/v2/user/signupCheck',
            headers: { 'Content-Type': 'application/json' },
            data: { 'username': username }
        };

        axios.request(options).then(function (response) {
            if (response.status === 202) {
                //send request to create user
                console.log('trying to create user');
                createUser();
            }
        }).catch(function (error) {
            if (error.response.status === 409) {
                //show username is taken
                setUsername("");
                setErrorcaption("Username Already Exists");
                setErrorprompt(true);
            }
        });

        setCheckloading(false);
        setSignupattempt(false);
    };

    //createUser
    const createUser = async () => {

    };


    //functions to vaidate data fields
    const emailValidation = () => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            setErrorcaption('Invalid Email Address');
            setErrorprompt(true);
            setEmail("");
            return (false);
        } else {
            return (true);
        }
    }

    const namesValidation = () => {
        if (!fname) {
            setErrorcaption('Invalid First Name');
            setErrorprompt(true);
            return (false);
        }
        if (!lname) {
            setErrorcaption('Invalid Last Name');
            setErrorprompt(true);
            return (false);
        }
        if (!username) {
            setErrorcaption('Invalid Username');
            setErrorprompt(true);
            return (false);
        }
        return (true);
    }

    const passwordValidation = () => {
        if (!password1 || !password2) {
            setErrorcaption('Invalid Password');
            setErrorprompt(true);
            return (false);
        }
        if (password1 !== password2) {
            setErrorcaption('Passwords Do Not Match');
            setPassword1("");
            setPassword2("");
            setErrorprompt(true);
            return (false);
        }
        return (true);
    }

    //HOOK TO DETECT WHEN THE USER TRIES TO LOGIN
    useEffect(() => {
        if (signupattempt) {
            //TODO Validate fields
            const valid = passwordValidation() && emailValidation() && namesValidation();
            if (valid) {
                setCheckloading(true);
                checkUser();
            }
        }
        //eslint-disable-next-line
    }, [signupattempt]);

    //body
    return (
        <div className="Signup">
            <div className="Signupbox">
                {/*loading && <Loading caption="Initializing User Creation..." >*/}
                {checkLoading && <Loading caption="Checking User Validity..." />}
                <h2>Sign Up</h2>
                <span>Please Fill All Fields Below:</span>
                {errorPrompt && <span className="loginprompt">{errorCaption}</span>}
                <form>
                    <div className="input-container">
                        <input
                            type="text"
                            required
                            autoFocus
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        <label>First Name:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            required
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                        <label>Last Name:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Username:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            required
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                        <label>Enter Password:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            required
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <label>Confirm Password:</label>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSignupattempt(true);
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
