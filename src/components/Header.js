import '../styles/Header.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useState } from 'react';
import {SidebarData} from './SidebarData';
import logo from '../imgs/blacklogo.jpg'

const Header = () => {

    const [sidebar,setSidebar] = useState(false);

    const history = useHistory();

    const returnHome = () => {
        history.push('/home');
    }

    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    return(
        <div className="Header">
            <img src={logo} alt="MacroHard" />
            <h2 onClick={returnHome}>acroHard Tournament Server</h2>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to='#' className='menu-bars close'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarData.map((item,index) => {
                        return(
                            <li key={index} className={item.cname}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}
export default Header;