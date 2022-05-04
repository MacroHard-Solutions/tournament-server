import React from 'react';
import { useEffect, useState } from "react";
import '../styles/Homepage.css';
import GameTile from '../components/GameTile';
import ParticlesBg from 'particles-bg';
import axios from '../apis/TourneyServerAPI';
import Loading from '../components/Loading';
import useAxios from '../hooks/useAxios';

//TODO refactor gametiles to display games from server

function Homepage() {
    //state to control display
    const [display, setDisplay] = useState(false);
    const [gameArr, setGamearr] = useState([]);

    //scroll to top of gamelist
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    //useAxios hook to pull games
    //eslint-disable-next-line
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/tournament'
    });

    //useEffect to detect a response from the server
    useEffect(() => {
        const result = Array.isArray(response);
        if (response && !result) {
            console.log('Games Retreived');
            if (response.status === "success") {
                //save data to state
                setGamearr(Array.from(response.resultData));
                setDisplay(true);
            }
        }
    }, [response])


    return (
        <div className="Home">
            <h1>Available Games:</h1>
            <ParticlesBg type="cobweb" color="#0e4588" bg={{ position: "fixed", zIndex: -1, width: "150%", height: "120%" }} />
            {loading && <Loading caption='Retreiving Available Games' />}
            {error && <h3 style={{ color: "red" }}>Unable to retreive Games</h3>}
            <div className="Popgames">
                {/*fetch and display tournaments/games*/}
                {display && gameArr.map((game) => {
                    return (
                        <GameTile
                            title={game.TOURNAMENT_NAME}
                            key={game.TOURNAMENT_ID}
                            imageurl={game.TOURNAMENT_DP}
                            game_id={game.GAME_ID}
                            tournament_id={game.TOURNAMENT_ID}
                        />
                    );
                })}
            </div>
        </div>
    )
}
export default Homepage;