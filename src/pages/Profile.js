import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Profile({login,setLogin}) {

    const history = useHistory();

    useEffect(() => {
        if(!login){
            history.push('/playerverification')
        }
    }, [history,login]);

    return(
        <h1>Profile</h1>
    )
}

export default Profile;