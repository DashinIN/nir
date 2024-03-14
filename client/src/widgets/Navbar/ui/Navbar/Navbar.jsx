import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, Button } from 'antd';
import s from './Navbar.module.scss';
import { userActions } from '@/entities/User/model/slice/userSlice';
import { AuthModal } from '@/entities/User/ui/AuthModal';
import {useLogin, useRegistration} from '@/entities/User/api/userApi';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/entities/User/hooks/useAuth';
import { HStack } from '@/shared/ui/Stack';
import {  useNavigate } from 'react-router-dom';


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

    const [register ] = useRegistration();
    const [login ] = useLogin();

    const dispatch = useDispatch();
    const {isAuth, user} = useAuth();

    const navigate = useNavigate();


    const handleRegistration = async (values) => {
        try {
            await register(values);
          
        } catch (err) {
            console.error('Error during registration:', err); 
        }
    };

    const [registrationModalVisible, setRegistrationModalVisible] = useState(false);

    const handleOpenRegistrationModal = () => {
        setRegistrationModalVisible(true);
    };
  
    const handleCloseRegistrationModal = () => {
        setRegistrationModalVisible(false);
    };

    const handleAuth = async (values) => {
        try {
            await login(values);
            navigate('/');
        } catch (err) {
            console.error('Error during login:', err); 
        }
    };

    const [authModalVisible, setAuthModalVisible] = useState(false);

    const handleOpenAuthModal = () => {
        setAuthModalVisible(true);
    };
  
    const handleCloseAuthModal = () => {
        setAuthModalVisible(false);
    };
  
    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/');
        dispatch(userActions.setUser());
    };

    const roles = {
        'ADMIN': 'администратор',
        'MANAGER': 'редактор',
        'USER': 'пользователь',
    };

    return (
        <div className={s.Navbar}>
            <HStack gap={16}>
                {user.role === 'ADMIN' && (
                    <Dropdown   menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['1'],
                    }} placement="bottomLeft">
                        <Button type='primary'>Создание шаблона</Button>
                    </Dropdown>
                )}
                {isAuth && (
                    <>
                        <Button type='primary'>
                            <NavLink to="/changeSample">Выбрать шаблон</NavLink>
                        </Button>   
                        <Button type='primary'>
                            <NavLink to="/useSample">Использовать шаблон</NavLink>
                        </Button>  
                        <Button type='primary'>
                            <NavLink to="/viewSample">Просмотр данных по шаблону</NavLink>
                        </Button>
                    </>
                )}
            </HStack>
            <HStack gap={16}>
                {user.role === 'ADMIN' && (
                    <>
                        <Button onClick={handleOpenRegistrationModal} type='primary'>Регистрация</Button>
                        <AuthModal 
                            isRegistration
                            modalVisible={registrationModalVisible}
                            handleCloseModal={handleCloseRegistrationModal}
                            handleAuth={handleRegistration}
                        />
                    </>
                )}
                {isAuth ?  (
                    <Button onClick={logOut} type='primary'>Выйти</Button>
                ): (
                    <>
                        <Button onClick={handleOpenAuthModal} type='primary'>Авторизация</Button>
                        <AuthModal 
                            modalVisible={authModalVisible}
                            handleCloseModal={handleCloseAuthModal}
                            handleAuth={handleAuth}
                        />
                    </>
                )}
                {user && (
                    <div style={{ color: '#f4f5fa' }}>
                        <h3>{user.email}</h3>
                        <h3>{roles[user.role]}</h3>
                    </div>
                )}
            </HStack>
        </div>
    );
};
