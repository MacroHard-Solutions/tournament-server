import '../styles/Header.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Header = () => {  

    const history = useHistory();

    const returnHome = () => {
        history.push('/home');
    }

    return(
        <div className="Header">
            <h2 onClick={returnHome}>MacroHard: Tournament-Server</h2>
            <ul className='Nav'>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
        </div>
    )
}

export default Header;