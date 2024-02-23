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
                to="/createSample"
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
                to="/useSample"
                className={toggleLink}
            >
                Использовать шаблон
            </NavLink>
            <NavLink
                to="/viewSample"
                className={toggleLink}
            >
                Просмотр данных по шаблону
            </NavLink>
        </div>
    );
};
