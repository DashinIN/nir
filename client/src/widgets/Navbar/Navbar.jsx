import { NavLink } from 'react-router-dom';
import s from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

const toggleLink = ({ isActive }) => {
    return isActive ? 
        classNames(s.activeNavLink, {}, [s.NavLink]) : 
        classNames('', {}, [s.NavLink]);
};


export const Navbar = () => {
    return (
        <div className={s.Navbar}>
            <NavLink
                to="/CreateTemplate"
                className={toggleLink}
            >
                Создать шаблон
            </NavLink>
            <NavLink
                to="/UseTemplate"
                className={toggleLink}
            >
                Использовать шаблон
            </NavLink>
        </div>
    );
};
