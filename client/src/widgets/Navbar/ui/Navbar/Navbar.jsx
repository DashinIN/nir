import { NavLink } from 'react-router-dom';
import s from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

const toggleLink = ({ isActive }) => {
    return classNames(`${isActive ? s.activeNavLink : ''}`, {}, [s.NavLink]);
};


export const Navbar = () => {
    return (
        <div className={s.Navbar}>
            <NavLink
                to="/createTemplate"
                className={toggleLink}
            >
                Создать шаблон
            </NavLink>
            <NavLink
                to="/changeSample"
                className={toggleLink}
            >
                Выбрать шаблон
            </NavLink>
            <NavLink
                to="/useTemplate"
                className={toggleLink}
            >
                Использовать шаблон
            </NavLink>
           
        </div>
    );
};
