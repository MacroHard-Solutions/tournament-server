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

    return (
        <div className='profile'>
            {userObj ? <> <div className='profileBox'>
                <div className="usernameDP">
                    <img src="https://i.imgur.com/CjnIMqJ.png" alt="user Display" style={{ borderRadius: "20em", height: "15em", width: "15em" }} />
                    <div className="usernameBox">
                        <h1>{JSON.stringify(userObj.USERNAME).replace(new RegExp('"', "g"), "")}</h1>
                        <h1>{JSON.stringify(userObj.USER_DESCRIPTION)}</h1>
                    </div>
                </div>
                <div className="statBox">
                    <div className="statfieldBox">
                        <h2>Name:</h2>
                        <h2>Smartest Agent:</h2>
                        <h2>Num of agents:</h2>
                    </div>
                    <div className="statinfoBox">
                        <h2>{JSON.stringify(userObj.USER_FNAME).replace(new RegExp('"', "g"), "") + " " + JSON.stringify(userObj.USER_LNAME).replace(new RegExp('"', "g"), "")}</h2>
                        <h2>Random</h2>
                        <h2>1</h2>
                    </div>
                </div>
                <button onClick={logOut}>Log out</button>
            </div>
                <div className='profileAgentsBox'>
                    <AgentList userObj={userObj} />
                </div> </> : <h3 style={{ color: 'red' }}>Internal Server Error: Unable to retreive User Object</h3>
            }
        </div >
    )
}
export default Profile;