import { Modal, Dropdown, Form, Input, Select, Button } from 'antd';
import { useState } from 'react';


export const AuthModal = ({isRegistration, modalVisible, handleCloseModal, handleAuth}) => {

    const [form] = Form.useForm();
    const [formValid, setFormValid] = useState(false);

    const handleFormChange = () => {
        form.validateFields().then(() => {
            setFormValid(true);
        }).catch(() => {
            setFormValid(false);
        });
    };

    const handleSelectChange = (value) => {
        form.setFieldsValue({ role: value });
        form.validateFields().then(() => {
            setFormValid(true);
        }).catch(() => {
            setFormValid(false);
        });
    };

    const handleCancel = () => {
        form.resetFields(); 
        handleCloseModal();
    };

    return (
        <Modal
            title={isRegistration ? 'Регистрация': 'Авторизация'}
            open={modalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button  type="primary" key="submit" htmlType="submit" disabled={!formValid}>
                    {isRegistration ? 'Зарегистрировать пользователя': 'Войти'}
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAuth}
                onChange={handleFormChange}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Некорректный email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: 'Введите  пароль' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {isRegistration && (
                    <Form.Item
                        label="Роль"
                        name="role"
                        rules={[
                            { required: true, message: 'Пожалуйста, выберите вашу роль' },
                        ]}
                    >
                        <Select
                            onChange={handleSelectChange}
                            style={{
                                width: 150,
                            }}
                            options={[
                                {
                                    value: 'USER',
                                    label: 'Пользователь',
                                },
                                {
                                    value: 'MANAGER',
                                    label: 'Редактор',
                                },
                                {
                                    value: 'ADMIN',
                                    label: 'Администратор',
                                },
                                               
                            ]}
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>

    );
};