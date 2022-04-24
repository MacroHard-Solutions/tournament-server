import { useState } from 'react';
import '../styles/SignUp.css'
import {v4 as uuidv4} from 'uuid';
import {useFaker} from 'react-fakers';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAxios } from '../hooks/useAxios';

function SignUp({userid,setUserid}) {

    //state for data entries
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');

    //Axios hook to handle making requests
    const {responseCheck,loadingCheck,errorCheck,fetchCheck} = useAxios({
        method: 'GET',
        url: '/user/signupCheck',
        headers: {
            'Content-Tyoe': 'application/json'
        },
        data: {
            "username": username
        }
    });

    const {response,loading,error,fetch} = useAxios({
        method: 'GET',
        url: '/user/signupCheck',
        headers: {
            'Content-Tyoe': 'application/json'
        },
        data: {
            "username": username,
            "email": email,
            "password": password1
        }
    });

    const history = useHistory();

    return(
        <div className='Signup'>
            <div className="Signupbox">
            <h2>Sign Up</h2>
            <form>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    autoFocus
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
                    <label>Re-enter Password:</label>
                </div>
                <button 
                
                >Submit</button>
            </form>
        </div>
       </div>
    );
}

export default SignUp;