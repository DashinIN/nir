import { NavLink } from 'react-router-dom';
import s from './Navbar.module.scss';

const toggleLink = ({ isActive, isPending }) => {
    return isPending ? 
        `${s.pendingNavLink}` :
        isActive ? 
            `${s.activeNavLink}` : '';
};


export const Navbar = () => {
    return (
        <div>
            <NavLink
                to="/CreateTemplate"
                className={toggleLink}
            >
                CreateTemplate
            </NavLink>
            <NavLink
                to="/UseTemplate"
                className={toggleLink}
            >
                UseTemplate
            </NavLink>
        </div>
    );
};
