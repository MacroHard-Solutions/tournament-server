import { useState } from 'react';
import '../styles/SignUp.css'
import {signUp} from '../components/Helper';
import {v4 as uuidv4} from 'uuid';
import {useFaker} from 'react-fakers';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SignUp({userid,setUserid}) {

    //state for data entries
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');

    //faker hook
    const {success,error} = useFaker();

    const history = useHistory();

    if (error){
        alert(error.message);
    }

    const makeRequest = async (e) => {
        e.preventDefault();
        //form data
        const id = uuidv4();
        if(password1 === password2){
            const dataObj = {};
            Object.assign(dataObj, {"insertType": "user"});
            Object.assign(dataObj, {"userID": id});
            Object.assign(dataObj, {"fName": success[0].firstname});
            Object.assign(dataObj, {"lName": success[0].lastname});
            Object.assign(dataObj, {"userName": username});
            Object.assign(dataObj, {"userEmail": email});
            Object.assign(dataObj, {"userPass": password1});
            Object.assign(dataObj, {"isAdmin": false});
            Object.assign(dataObj, {"wantsNotifications": false});
            
            //make request
            if(await signUp(dataObj)){
                setUserid(id);
                history.push('/profile');
            }
        }

    }

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
                <button onClick={makeRequest}>Submit</button>
            </form>
        </div>
       </div>
    );
}

export default SignUp;