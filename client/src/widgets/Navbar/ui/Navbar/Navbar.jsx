import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, Button, message } from 'antd';
import s from './Navbar.module.scss';
import { userActions } from '@/entities/User/model/slice/userSlice';
import { AuthModal } from '@/entities/User/ui/AuthModal';
import {useLogin, useRegistration} from '@/entities/User/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/entities/User/hooks/useAuth';
import { HStack, VStack } from '@/shared/ui/Stack';
import {  useNavigate } from 'react-router-dom';
import { getSelectedSample } from '@/entities/Sample';



export const Navbar = () => {

    const [register] = useRegistration();
    const [login ] = useLogin();
    const dispatch = useDispatch();
    const {isAuth, user} = useAuth();
    const navigate = useNavigate();
    const selectedSampleId = useSelector(getSelectedSample);


    const handleRegistration = async (values) => {
        try {
            const response = await register(values);
            if(response.error) {
                message.error(response.error.data.message);
            } 
            return response;
          
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
       
        const response = await login(values);
        if(response.error) {
            message.error(response.error.data.message);
        } else {
            navigate('/');
        }
        return response;
        
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
            <VStack max>
                <HStack max justify='center'>
                    <h1>Работа с реестром организаций</h1>
                </HStack>
                <HStack max justify='between'>
                    <HStack gap={16}>
                        {user.role === 'ADMIN' && (
                            <Button type='primary'>
                                <NavLink to="/selectSampleFields">Созлать шаблон</NavLink>
                            </Button> 
                        )}
                        {isAuth && (
                            <>
                                <Button type='primary'>
                                    <NavLink to="/changeSample">Выбрать шаблон</NavLink>
                                </Button>   
                                {selectedSampleId && (
                                    <>
                                        <Button type='primary'>
                                            <NavLink to="/viewSample">Работа с данными</NavLink>
                                        </Button>
                                        <Button type='primary'>
                                            <NavLink to="/useSample">Экспорт данных</NavLink>
                                        </Button>
                                    </>
                                )}
                        
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
                            <VStack align='end'>
                                <p>{user.email}</p>
                                <p>{roles[user.role]}</p>
                            </VStack>
                        )}
                    </HStack>
                </HStack>
            </VStack>
        </div>
    );
};
