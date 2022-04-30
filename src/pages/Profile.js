import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import '../styles/Profile.css';


//TODO: Team MT work on user Info Section (discuss specifics with katlego) 

function Profile({ userObj, setuserObj }) {

    const history = useHistory();

    useEffect(() => {
        if (!userObj) {
            history.push('/playerverification')
        }
    }, [history, userObj]);

    const logOut = () => {
        setuserObj(null);
        history.push('/home')
    }

    return (
        <div className='profile'>
            <div className='profileBox'>
                {/*TODO Team MT Only work in this div*/}
                <h1>User Info Section</h1>
                <h3>Profile for: {JSON.stringify(userObj)}</h3>
                <button onClick={logOut}>Log out</button>
            </div>
            <div className='profileAgentsBox'>
                <h1>User Agents</h1>
            </div>
        </div>
    )
}

export default Profile;