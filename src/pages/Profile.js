import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Profile({userid,setUserid}) {

    const history = useHistory();

    useEffect(() => {
        if(!userid){
            history.push('/playerverification')
        }
    }, [history,userid]);

    const logOut = () => {
        setUserid(null);
        history.push('/home')
    }

    return(
        <>
            <h1>Profile for: {userid}</h1>
            <button onClick={logOut}>Log out</button>
        </>
    )
}

export default Profile;