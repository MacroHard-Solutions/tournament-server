import { useEffect } from "react";
import '../styles/Homepage.css';
import {useHistory} from 'react-router-dom';
import {FaRegEye, FaPlay} from 'react-icons/fa';

function Homepage() {

    const history = useHistory();

    useEffect(() => {
        window.scroll(0,0)
    },[])

    const pushPlay = () => {
        history.push('/play');
    }

    const pushWatch = () => {
        history.push('/watch');
    }

    return(
        <div className="Home">
            <h1>Popular Games</h1>
            <div className="Popgames">
                <div className="game">
                    <h3 className="Title">Chess</h3>
                    <div className="imageholder">
                        <div className="chess">
                            <div className="tilebuttons">
                                <div className="tileicon">
                                    <FaPlay size="2em"/>
                                    <FaRegEye size="2em"/>
                                </div>
                                <button className="buttonn" onClick={pushPlay}>Play</button>
                                <button className="buttonn" onClick={pushWatch}>Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game">
                    <h3 className="Title">Rock-Paper-Scissors</h3>
                    <div className="imageholder">
                        <div className="rps">
                            <div className="tilebuttons">
                                <div className="tileicon">
                                    <FaPlay size="2em"/>
                                    <FaRegEye size="2em"/>
                                </div>
                                <button className="buttonn" onClick={pushPlay}>Play</button>
                                <button className="buttonn" onClick={pushWatch}>Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game">
                    <h3 className="Title">Tick-Tac-Toe</h3>
                    <div className="imageholder">
                        <div className="ttt">
                            <div className="tilebuttons">
                                <div className="tileicon">
                                    <FaPlay size="2em"/>
                                    <FaRegEye size="2em"/>
                                </div>
                                <button className="buttonn" onClick={pushPlay}>Play</button>
                                <button className="buttonn" onClick={pushWatch}>Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Homepage;