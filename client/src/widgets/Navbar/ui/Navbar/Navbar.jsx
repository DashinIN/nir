import { NavLink } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import s from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

const toggleLink = ({ isActive }) => {
    return classNames(`${isActive ? s.activeNavLink : ''}`, {}, [s.NavLink]);
};

const items  = [
    {
        key: '1',
        label: (<NavLink to="/selectSampleFields">Выбор полей шаблона</NavLink>),
    },
    {
        key: '2',
        label: (<NavLink to="/changeSampleFieldsOrder">Выбор порядка полей шаблона</NavLink>),
    },
    {
        key: '3',
        label: (<NavLink to="/saveSample">Сохранение шаблона</NavLink>),
    },
];


export const Navbar = () => {
    return (
        <div className={s.Navbar}>
            <Dropdown   menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['1'],
            }} placement="bottomLeft">
                <Button type='primary'>Создание шаблона</Button>
            </Dropdown>
            <Button type='primary'>
                <NavLink to="/changeSample">Выбрать шаблон</NavLink>
            </Button>   
            <Button type='primary'>
                <NavLink to="/useSample">Использовать шаблон</NavLink>
            </Button>  
            <Button type='primary'>
                <NavLink to="/viewSample">Просмотр данных по шаблону</NavLink>
            </Button>
        </div>
    );
};
