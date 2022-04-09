import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCog/>,
        cName: 'nav-text'
    },
    {
        title: 'Community',
        path: '/leaderboards',
        icon: <FaIcons.FaUniversity/>,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/home',
        icon: <AiIcons.AiFillQuestionCircle/>,
        cName: 'nav-text'
    },
]