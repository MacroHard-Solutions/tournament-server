import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/SignIn.css'

function SignIn({login,setLogin}) {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    const verifyUser = () => {
        //switch login
        setLogin(true);
        
        if(login){
            //if user is verified and logged in 
            console.log(login);
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
                    onClick={verifyUser}
                >Submit</button>
            </form>
        </div>
       </div>
    );
}

export default SignIn;