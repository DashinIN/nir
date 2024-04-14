import { getFilters } from '@/entities/Filters/model/selectors/getFilters';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeleteOrgRecord, useEditOrgRecord, useGetFilteredOrgs, useGetFilteredOrgsCount, useGetSampleFieldsHeaders } from '../api/OrgsTableApi';
import { getSelectedSample } from '@/entities/Sample';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import { useAuth } from '@/entities/User/hooks/useAuth';
import { TableActions } from '@/widgets/TableActions';
import { validationRules } from '@/pages/ViewSamplePage/consts/consts';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import { actionsColumn, indexColumn, selectorValues, tableLocales } from '../consts/consts';


export const OrgsTable = () => {
    const { user } = useAuth();
    const selectedSampleId = useSelector(getSelectedSample); 

    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [pageSize, setPageSize] = useState(100);
 
    const filters = useSelector(getFilters);
    const [sortInfo, setSortInfo] = useState({ columnKey: null, order: 0 });
   
    const {
        data: filteredOrgsCount, 
        isLoading: isFilteredOrgsCountLoading,
        refetch: orgsCountRefetch 
    } = useGetFilteredOrgsCount(filters);
     
    const {
        data: orgsColumns,
        isLoading: isOrgsColumnsLoading
    } = useGetSampleFieldsHeaders(selectedSampleId);
         
    const  { 
        data: filteredOrgs,
        isLoading: isOrgsLoading,
        refetch: orgsRefetch,
        isFetching: isOrgsRefetching
    } = useGetFilteredOrgs({
        filters, 
        selectedSampleId,
        pageSize,
        currentPage,
        sortField: sortInfo.columnKey,
        sortOrder: sortInfo.order
    }); 
 
    useEffect(() => {
        setCurrentPage(1);
        orgsCountRefetch();
        orgsRefetch({
            sortField: sortInfo.columnKey,
            sortOrder: sortInfo.order
        });
    }, [
        filters,
        sortInfo,
        orgsCountRefetch, 
        orgsRefetch
    ]);
 
    const isTableUpdating = isOrgsColumnsLoading || isOrgsLoading || isFilteredOrgsCountLoading;
 
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination);
    };
 
    const handleColumnSort = (column) => {
        setSortInfo(prev => ({
            columnKey: column.key,
            order: prev.columnKey === column.key ? (prev.order + 1) % 3 : 1
        }));
    };
 
    const [form] = Form.useForm();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedOrgForEdit, setSelectedOrgForEdit] = useState(null);
    const [editOrgRecord] =  useEditOrgRecord();
    const [deleteOrgRecord] =  useDeleteOrgRecord();
 
    const handleOpenEditModal =  (org) => () => {
        setSelectedOrgForEdit(org);
        form.setFieldsValue(org);
        setEditModalVisible(true);
    };
 
    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };
 
    const handleSaveEditModal = async () => {
        try {
            await editOrgRecord({ id: selectedOrgForEdit.id, updatedData: form.getFieldsValue() });
            setEditModalVisible(false); 
            message.success('Изменения внесены'); 
        } catch (error) {
            message.error('Ошибка при изменении');
            console.error('Ошибка при изменении:', error);
        }
    };
 
    const handleOpenDeleteModal = (org) => () => {
        setSelectedOrgForEdit(org);
        setDeleteModalVisible(true);
    };
 
    const handleCloseDeleteModal = () => {
        setDeleteModalVisible(false);
    };
 
    const handleConfirmDelete = async () => {
        try {
            await deleteOrgRecord(selectedOrgForEdit.id);
            setDeleteModalVisible(false); 
            message.success('Запись успешно удалена!'); 
        } catch (error) {
            message.error('Ошибка при удалении записи');
            console.error('Ошибка при удалении записи:', error);
        }
    };
 
    const [formValid, setFormValid] = useState(true);
 
    const handleFormChange = () => {
        form.validateFields().then(() => {
            setFormValid(true);
        }).catch(() => {
            setFormValid(false);
        });
    };

    if(isTableUpdating) {
        return(
            <VStack max align='center'>
                <Loader />
            </VStack>
        );
    }

    return(
        <>
            <Table  
                style={{ maxWidth: '100%' }}
                scroll={{ x: 'max-content' }} 
                size='small'
                bordered
                rowKey={(org) => org.id}
                dataSource={filteredOrgs.map((org, index) => ({ ...org, index: (currentPage-1)*pageSize + index + 1 }))} 
                columns={[
                    indexColumn,
                    ...orgsColumns.map(column => ({
                        ...column,
                        sorter: true,
                        sortDirections: ['ascend', 'descend'],
                        onHeaderCell: column => ({
                            onClick: () => handleColumnSort(column)
                        }),
                    })),
                    ...(user.role !== 'USER' ? [{
                        ...actionsColumn,
                        render: (record) => (
                            <TableActions 
                                handleOpenEditModal={handleOpenEditModal(record)} 
                                handleOpenDeleteModal={handleOpenDeleteModal(record)}
                            />
                        ),
                    }] : []),
                ]}
                locale={tableLocales}
                loading={{spinning: isOrgsRefetching, size: 'large', indicator: <Loader/>}}
                pagination={{
                    size: 'default',
                    hideOnSinglePage: true,
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredOrgsCount.totalCount,
                    onChange: handleTableChange,
                    showSizeChanger: false 
                }}
                sticky
            />
            <Modal
                title={`Редактировать запись ${ selectedOrgForEdit && selectedOrgForEdit.id}`}
                open={editModalVisible}
                onCancel={handleCloseEditModal}
                width={1000}
                footer={[
                    <Button key="cancel" onClick={handleCloseEditModal}>
                        Отмена
                    </Button>,
                    <Button  disabled={!formValid} key="submit" type="primary" onClick={handleSaveEditModal}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Form size='small' form={form} layout="vertical" name="edit_record_form" onChange={handleFormChange}>
                    {orgsColumns.filter(org => org.title !== 'id').map((column) => {
                                        
                        const isAccess = {
                            'USER': false,
                            'ADMIN': true,
                            'MANAGER': column.rights !== 'ADMIN'
                        };

                        return (
                            <Form.Item 
                                key={column.key}
                                name={column.dataIndex}
                                label={column.title}
                                rules={validationRules[column.dataIndex]}
                                initialValue={selectedOrgForEdit && selectedOrgForEdit[column.dataIndex]}
                            >
                                {selectorValues[column.dataIndex] ? (
                                    <Select 
                                        size={isAccess[user.role] ? 'large' : 'small'} 
                                        disabled={!isAccess[user.role]}
                                    >
                                        {selectorValues[column.dataIndex].map(value => (
                                            <Select.Option key={value} value={value}>{value}</Select.Option>
                                        ))}
                                    </Select>
                                ) : (
                                    <Input 
                                        size={isAccess[user.role] ? 'large' : 'small'} 
                                        disabled={!isAccess[user.role]}
                                    />
                                )}
                            </Form.Item>
                        );
                    })}
                </Form>
            </Modal>
            <Modal
                title={`Удалить запись ${selectedOrgForEdit && selectedOrgForEdit.id}`}
                open={deleteModalVisible}
                onCancel={handleCloseDeleteModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseDeleteModal}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleConfirmDelete}>
                        Удалить
                    </Button>,
                ]}
            >
                <p>Вы уверены, что хотите удалить эту запись?</p>
            </Modal>
        </>
    );
};