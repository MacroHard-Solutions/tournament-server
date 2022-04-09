import { Link } from "react-router-dom";
import '../styles/PlayerVerification.css';

function PlayerVerification() {

    return(
        <div className="Verification">
            <div className="Box">
                <div className="Interaction">
                <div>
                    <h2>MacroHard Solutions</h2>
                    <h3>Tournament Server</h3>
                </div>
                <div className="Buttons">
                    <button><Link to='/signin'>Sign In</Link></button>
                    <button><Link to='/signup'>Sign Up</Link></button>
                </div>
            </div>
            <div className="Animation">
                <iframe title="AI vs human" src="https://giphy.com/embed/WxJLwDBAXDsW1fqZ3v" width="240" height="135" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
             </div>
        </div>
    )
}

export default PlayerVerification;