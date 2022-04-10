import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Profile({userid,setUserid}) {

    const history = useHistory();

    useEffect(() => {
        if(!userid){
            history.push('/playerverification')
        }
    }, [history,userid]);

    return(
        <h1>Profile for: {userid}</h1>
    )
}

export default Profile;