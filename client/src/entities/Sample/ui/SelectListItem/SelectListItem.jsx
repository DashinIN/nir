import { Button, Space, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import s from './SelectListItem.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { useAuth } from '@/entities/User/hooks/useAuth';

export const SelectListItem = (props) => {
    const {
        name,
        content,
        onSelect,
        onEdit,
        onDelete,
        isSelected
    } = props;

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        await onDelete();
        setDeleteModalVisible(false);
    };
    const {user} = useAuth();


    return (
        <div 
            className={classNames(s.wrapper, {[s.active]: isSelected}, [])}
            onClick={onSelect} 
        >
            <div>{name}</div>
            <HStack gap={16}>
                <div>{content}</div>
                {user.role === 'ADMIN' && (
                    <Space>
                        <Tooltip title="Редактировать шаблон" color='blue'>
                            <Button
                                type="primary"
                                shape="circle"
                                size="middle"
                                icon={<EditOutlined />}
                                onClick={onEdit}
                            />
                        </Tooltip>
                        <Tooltip title="Удалить шаблон" color='red'>
                            <Button
                                type="default"
                                danger
                                shape="circle"
                                size="middle"
                                icon={<DeleteOutlined />}
                                onClick={showDeleteModal}
                            />
                        </Tooltip>
                    </Space>
                )}
            </HStack>
            {user.role === 'ADMIN' && (
                <Modal
                    title={`Удалить шаблон ${name}?`}
                    open={isDeleteModalVisible}
                    onCancel={handleCancelDelete}
                    footer={[
                        <Button key="cancel" onClick={handleCancelDelete}>
                            Отмена
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleConfirmDelete}>
                            Удалить
                        </Button>,
                    ]}
                >
                    <p>Вы уверены, что хотите удалить этот шаблон?</p>
                </Modal>
            )}
        </div>
    );
};
