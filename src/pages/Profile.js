import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import '../styles/Profile.css';
import React from 'react';
import AgentList from "../components/AgentList";

//TODO: Team MT work on user Info Section (discuss specifics with katlego) 
//TODO style scrollbars

function Profile({ userObj, setuserObj }) {

    const history = useHistory();

    const logOut = () => {
        setuserObj(null);
        history.push('/home')
    }

    //useEffect to check if userobject is valid first
    useEffect(() => {
        if (!userObj) {
            history.push('/playerverification');
        }
    });

    var img_url = JSON.stringify(userObj.USER_DP).replace(new RegExp('"', "g"), "");

    return (       
        <div className='profile'>
            {userObj ? <> <div className='profileBox'>
                <div className="usernameDP">
<<<<<<< HEAD
                    <img src={img_url} style={{ borderRadius: "20em", height: "15em", width: "15em" }} />
=======
                    <img src="https://i.imgur.com/CjnIMqJ.png" alt="user Display" style={{ borderRadius: "20em", height: "15em", width: "15em" }} />
>>>>>>> c51bfde69b278f93d26cdbcb5470b3572aca3b0f
                    <div className="usernameBox">
                        <h1>{JSON.stringify(userObj.USERNAME).replace(new RegExp('"', "g"), "")}</h1>
                        <h3>{JSON.stringify(userObj.USER_DESCRIPTION).replace(new RegExp('"', "g"), "")}</h3>
                    </div>
                </div>
                <div className="statBox">
                    <div className="statfieldBox">
                        <h1>Name:</h1>
                        <h1>Email:</h1>
                        <h1>Smartest Agent:</h1>
                        <h1>Num of agents:</h1>
                    </div>
                    <div className="statinfoBox">
                        <h1>{JSON.stringify(userObj.USER_FNAME).replace(new RegExp('"', "g"), "") + " " + JSON.stringify(userObj.USER_LNAME).replace(new RegExp('"', "g"), "")}</h1>
                        <h1>{JSON.stringify(userObj.USER_EMAIL).replace(new RegExp('"', "g"), "")}</h1>
                        <h1>Random</h1>
                        <h1>1</h1>
                    </div>
                </div>
                <button onClick={logOut}>Log out</button>
<<<<<<< HEAD
            </div> : <h3 style={{ color: 'red' }}>Internal Server Error: Unable to retreive User Object</h3>}
            <div className='profileAgentsBox'>
                <h1>User Agents</h1>
=======
>>>>>>> c51bfde69b278f93d26cdbcb5470b3572aca3b0f
            </div>
                <div className='profileAgentsBox'>
                    <AgentList userObj={userObj} />
                </div> </> : <h3 style={{ color: 'red' }}>Internal Server Error: Unable to retreive User Object</h3>
            }
        </div >
    )
}
export default Profile;