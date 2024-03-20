import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


export const TableActions = ({handleOpenEditModal, handleOpenDeleteModal}) => {
    
    return (
        <Space>
            <Tooltip title="Редактировать" color='blue'>
                <Button
                    type="primary"
                    shape="circle"
                    size="middle"
                    icon={<EditOutlined />}
                    onClick={handleOpenEditModal}
                />
            </Tooltip>
            <Tooltip title="Удалить" color='red'>
                <Button
                    type="default"
                    danger
                    shape="circle"
                    size="middle"
                    icon={<DeleteOutlined />}
                    onClick={handleOpenDeleteModal}
                />
            </Tooltip>
        </Space>
    );
};

