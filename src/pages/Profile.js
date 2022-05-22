import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/Profile.css';
import React from 'react';
import AgentList from "../components/AgentList";
import useStore from "../hooks/useStore";
import useAxios from '../hooks/useAxios';
import axios from '../apis/TourneyServerAPI';

function Profile() {

    //state to hold profile data
    const [topAgent, setTopagent] = useState('');
    const [numAgent, setNumagent] = useState('');

    //pull data from state
    const { userObj, setuserObj, setArbtourney } = useStore(state => ({
        userObj: state.userObj,
        setuserObj: state.setUserobj,
        setArbtourney: state.setArbtourney
    }))

    //for routing
    const history = useHistory();

    //user log out option
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

    //pull topAgent and NumAgent data
    //eslint-disable-next-line
    const [response, errorprofile, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: '/profile',
        requestConfig: {
            data: {
                userID: userObj ? userObj.USER_ID : "?"
            }
        }
    });

    //listen for internet request
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            if (response.status === "success") {
                if (response.resultData) {
                    setTopagent(response.resultData.topAgentTournament);
                    setNumagent(response.resultData.numAgents)
                }
            }
        }
    }, [response])

    return (
        <div className='profile'>
            {userObj ? <> <div className='profileBox'>
                <div className="usernameDP">
                    <img src={JSON.stringify(userObj.USER_DP).replace(new RegExp('"', "g"), "")} alt="User display graphic could not be loaded." style={{ borderRadius: "20em", height: "15em", width: "15em" }} />
                    <div className="usernameBox">
                        <h1>{JSON.stringify(userObj.USERNAME).replace(new RegExp('"', "g"), "")}</h1>
                        <h3>{JSON.stringify(userObj.USER_DESCRIPTION).replace(new RegExp('"', "g"), "")}</h3>
                    </div>
                </div>
                <div className="statBox">
                    <div className="statfieldBox">
                        <h1>Name:</h1>
                        <h1>Email:</h1>
                        <h1>Top Agent:</h1>
                        <h1>Num of agents:</h1>
                    </div>
                    <div className="statinfoBox">
                        <h1>{JSON.stringify(userObj.USER_FNAME).replace(new RegExp('"', "g"), "") + " " + JSON.stringify(userObj.USER_LNAME).replace(new RegExp('"', "g"), "")}</h1>
                        <h1>{JSON.stringify(userObj.USER_EMAIL).replace(new RegExp('"', "g"), "")}</h1>
                        <h1>{topAgent}</h1>
                        <h1>{numAgent}</h1>
                    </div>
                </div>
                <button onClick={logOut}>Log out</button>
            </div>
                <div className='profileAgentsBox'>
                    <AgentList userObj={userObj} setArbtourney={setArbtourney} />
                </div> </> : <h3 style={{ color: 'red' }}>Internal Server Error: Unable to retreive User Object</h3>
            }
        </div >
    )
}
export default Profile;