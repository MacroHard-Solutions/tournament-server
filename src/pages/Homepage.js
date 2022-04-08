import { useEffect } from "react";
import '../styles/Homepage.css'

function Homepage() {

    useEffect(() => {
        window.scroll(0,0)
    },[])

    return(
        <div className="Home">
            <h1>Popular Games:</h1>
            <div className="Popgames">
                <div className="game">
                    <div className="chess">
                    </div>
                    <div className="gamesub">
                        <h3 className="Title">Chess</h3>
                        <div className="buttons">
                            <button>play</button>
                            <button>watch</button>
                        </div>
                    </div>
                </div>
                <div className="game">
                    <div className="rps">
                    </div>
                    <div className="gamesub">
                        <h3 className="Title">Rock-Paper-Scissors</h3>
                        <div className="buttons">
                            <button>play</button>
                            <button>watch</button>
                        </div>
                    </div>
                </div>
                <div className="game">
                    <div className="ttt">
                    </div>
                    <div className="gamesub">
                        <h3 className="Title">Tick-Tac-Toe</h3>
                        <div className="buttons">
                            <button>play</button>
                            <button>watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;