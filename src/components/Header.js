import '../styles/Header.css'
import {Link} from 'react-router-dom'

const Header = () => {

    return(
        <div className="Header">
            <h2>MacroHard: Tournament-Server</h2>
            <ul className='Nav'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/leaderboards">Community</Link>
            </li>
            <li>
                <Link to="/play">Play</Link>
            </li>
            <li>
                <Link to="/watch">Watch</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
        </div>
    )
}

export default Header;