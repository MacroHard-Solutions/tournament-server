import { useEffect } from "react";
import '../styles/Homepage.css';
import {FaRegEye, FaPlay} from 'react-icons/fa';

function Homepage() {

    useEffect(() => {
        window.scroll(0,0)
    },[])

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
                                <button className="buttonn">Play</button>
                                <button className="buttonn">Watch</button>
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
                                <button className="buttonn">Play</button>
                                <button className="buttonn">Watch</button>
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
                                <button className="buttonn">Play</button>
                                <button className="buttonn">Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Homepage;