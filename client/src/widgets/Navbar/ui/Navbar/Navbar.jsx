import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, Button } from 'antd';
import s from './Navbar.module.scss';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { classNames } from '@/shared/lib/classNames/classNames';
import { userReducer } from '@/entities/User/model/slice/userSlice';
import { AuthModal } from '@/entities/User/ui/AuthModal';

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

const initialReducers = {
    user: userReducer,
};

export const Navbar = () => {

    const handleRegistration = async (values) => {
        // try {
        //     await loginUser(values).unwrap();
        //     setErrorMessage(null);
        //     form.resetFields();
        //     onCancel(); // Закрываем модальное окно после успешной авторизации
        // } catch (error) {
        //     setErrorMessage(error.message || 'Ошибка авторизации');
        // }
    };

    const [registrationModalVisible, setRegistrationModalVisible] = useState(false);

    const handleOpenRegistrationModal = () => {
        setRegistrationModalVisible(true);
    };
  
    const handleCloseRegistrationModal = () => {
        setRegistrationModalVisible(false);
    };

    const handleAuth = async (values) => {
        // try {
        //     await loginUser(values).unwrap();
        //     setErrorMessage(null);
        //     form.resetFields();
        //     onCancel(); // Закрываем модальное окно после успешной авторизации
        // } catch (error) {
        //     setErrorMessage(error.message || 'Ошибка авторизации');
        // }
    };

    const [authModalVisible, setAuthModalVisible] = useState(false);

    const handleOpenAuthModal = () => {
        setAuthModalVisible(true);
    };
  
    const handleCloseAuthModal = () => {
        setAuthModalVisible(false);
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
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
                <Button onClick={handleOpenAuthModal} type='primary'>Авторизация</Button>
                <AuthModal 
                    modalVisible={authModalVisible}
                    handleCloseModal={handleCloseAuthModal}
                    handleAuth={handleAuth}
                />
                <Button onClick={handleOpenRegistrationModal} type='primary'>Регистрация</Button>
                <AuthModal 
                    isRegistration
                    modalVisible={registrationModalVisible}
                    handleCloseModal={handleCloseRegistrationModal}
                    handleAuth={handleRegistration}
                />
            </div>
        </DynamicModuleLoader>
    );
};
