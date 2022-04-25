import { useState, useEffect } from 'react';
import '../styles/SignUp.css'
import {v4 as uuidv4} from 'uuid';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAxios } from '../hooks/useAxios';
import Loading from '../components/Loading';
import axios from 'axios';

/*
    TODO List:
        Enable sha256 for password encryption
        validate data fields
        fix requests
*/

function SignUp({userid,setUserid}) {

    //state for data entries
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [signupattempt,setSignupattempt] = useState(false);//state of submission button being clicked
    const [errorPrompt,setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption,setErrorcaption] = useState('Loading...');
    const [checkLoading,setCheckloading] = useState(false);

    //Axios hook to handle requesting to create the user
    const {response,loading,error,fetch} = useAxios({
        method: 'GET',
        url: '/user/signupCheck',
        headers: {
            'Content-Tyoe': 'application/json'
        },
        data: {
            "fName": fname,
            "lName": lname,
            "user_id" : uuidv4(),
            "username": username,
            "userEmail": email,
            "userPass": password1,
            "isAdmin": false,
            "wantsNotifications": false
        }
    });

    const history = useHistory();

    //createUser
    const createUser = () => {
        fetch();

        setSignupattempt(false);
        setErrorprompt(false);
    }

    //checkUser 
    const checkUser = async () => {
        //TODO
        setSignupattempt(false);
    }

    //HOOK TO DETECT WHEN THE USER TRIES TO LOGIN
    useEffect(() => {
        if(signupattempt){
            //validate fields
            checkUser();
        }
    },[signupattempt])

    //useEffect hook for when the user needs to be prompted for details
    useEffect(() => {
        if(errorPrompt){
            setUsername('');
            setFname('');
            setLname('');
            setEmail('');
            setPassword1('');
            setPassword2('');
        }
    },[errorPrompt])
    return(
        <div className='Signup'>
            <div className="Signupbox">
            {loading && <Loading caption='Processing...'/>}
            {checkLoading && <Loading caption='Checking User Validity...'/>}
            <h2>Sign Up</h2>
            <span>Please Fill All Fields Below:</span>
            {errorPrompt && <span className='loginprompt'>{errorCaption}</span>}
            <form>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    autoFocus
                    value = {fname}
                    onChange = {e => setFname(e.target.value)}
                    />
                    <label>First Name:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    value = {lname}
                    onChange = {e => setLname(e.target.value)}
                    />
                    <label>Last Name:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    />
                    <label>Email:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    value = {username}
                    onChange = {e => setUsername(e.target.value)}
                    />
                    <label>Username:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="password" 
                    required
                    value = {password1}
                    onChange = {e => setPassword1(e.target.value)}
                    />
                    <label>Enter Password:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="password" 
                    required
                    value = {password2}
                    onChange = {e => setPassword2(e.target.value)}
                    />
                    <label>Confirm Password:</label>
                </div>
                <button 
                    onClick = {e => {
                        e.preventDefault();
                        setSignupattempt(true);
                    }}
                >Submit</button>
            </form>
        </div>
       </div>
    );
}

export default SignUp;