import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Profile({userObj,setuserObj}) {

    const history = useHistory();

    useEffect(() => {
        if(!userObj){
            history.push('/playerverification')
        }
    }, [history,userObj]);

    const logOut = () => {
        setuserObj(null);
        history.push('/home')
    }

    return(
        <>
            <h1>Profile for: {JSON.stringify(userObj)}</h1>
            <button onClick={logOut}>Log out</button>
        </>
    )
}

export default Profile;