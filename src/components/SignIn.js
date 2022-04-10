import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/SignIn.css'
import {signIn} from '../components/Helper';

function SignIn({userid,setUserid}) {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    const makeRequest = async (e) => {
        e.preventDefault();

        //data
        const dataObj = {};
        Object.assign(dataObj, {userName_Email: username});
        Object.assign(dataObj, {userPass:password});
        Object.assign(dataObj, {userCheck:"login"});
        
        //make request
        const data = await signIn(dataObj);
        if(data.USER_ID){
            setUserid(data.USER_ID);
            history.push('/profile');
        }
        else{
            setUsername('');
            setPassword('');
        }
    }

    return(
       <div className='Signin'>
            <div className="Signinbox">
            <h2>Sign In</h2>
            <form>
                <div className="input-container">
                    <input 
                    type="text" 
                    required
                    value = {username}
                    onChange ={e => setUsername(e.target.value)}
                    autoFocus
                    />
                    <label>Email/Username:</label>
                </div>
                <div className="input-container">
                    <input 
                    type="password" 
                    required
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                    />
                    <label>Password:</label>
                </div>
                <button
                    onClick={makeRequest}
                >Submit</button>
            </form>
        </div>
       </div>
    );
}

export default SignIn;