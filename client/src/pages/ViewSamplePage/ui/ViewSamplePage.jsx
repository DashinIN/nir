import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { getSelectedSample } from '@/entities/Sample';
import { useDeleteOrgRecord, useEditOrgRecord, useGetFilteredOrgs, useGetFilteredOrgsCount, useGetSampleFieldsHeaders } from '../api/viewSampleApi';
import { Loader } from '@/shared/ui/Loader';
import { useSelector } from 'react-redux';
import { Table, Modal, Button, Form, Input, message, Space, Tooltip  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { VStack } from '@/shared/ui/Stack';
import { validationRules } from '../consts/consts';
import { filtersReducer } from '@/entities/Filters/model/slice/FiltersSlice';
import { getFilters } from '@/entities/Filters/model/selectors/getFilters';
import { Filters } from '@/entities/Filters/ui/Filters/Filters';
import { EditOrgModal } from '@/features/EditOrgModal/EditOrgModal';

const initialReducers = {
    sample: sampleReducer,
    filters: filtersReducer
};


const ViewSamplePage = () => {
    //Id текущего шаблона
    const selectedSampleId = useSelector(getSelectedSample); 
        
    //Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    //Получение параметров для фильтров
    const filters = useSelector(getFilters);
  
    //сортировка
    const [sortInfo, setSortInfo] = useState({ columnKey: null, order: 0 });
    //Запрос на количества записей
    const {
        data: filteredOrgsCount, 
        isLoading: isFilteredOrgsCountLoading,
        refetch: orgsCountRefetch 
    } = useGetFilteredOrgsCount(filters);
    
    //Запрос на получение заголовков полей
    const {
        data: orgsColumns,
        isLoading: isOrgsColumnsLoading
    } = useGetSampleFieldsHeaders(selectedSampleId);
        
    //Запрос на получение полей с фильтрами и пагинацией
    const  { 
        data: filteredOrgs,
        isLoading: isOrgsLoading,
        refetch: orgsRefetch 
    } = useGetFilteredOrgs({
        filters, 
        selectedSampleId,
        pageSize,
        currentPage,
        sortField: sortInfo.columnKey,
        sortOrder: sortInfo.order
    }); 

  
    //При изменении фильтров пересчитываем записи, делаем по ним пагинацию и обновляем таблицу
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

    const isTableUpdating =  isOrgsColumnsLoading || isOrgsLoading || isFilteredOrgsCountLoading;

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

    const handleOpenEditModal = (org) => {
        console.log(org);
        setSelectedOrgForEdit(org);
        form.setFieldsValue(org);
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };

    const handleSaveEditModal = async () => {
        console.log(form.getFieldsValue());
        try {
            await editOrgRecord({ id: selectedOrgForEdit.id, updatedData: form.getFieldsValue() });
            setEditModalVisible(false); 
            orgsRefetch(); 
            message.success('Изменения внесены'); 
        } catch (error) {
            message.error('Ошибка при изменении');
            console.error('Ошибка при изменении:', error);
        }

    };

    const handleOpenDeleteModal = (org) => {
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
            orgsRefetch(); 
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

    if(!selectedSampleId) {
        return (<div>nooo</div>);
    }

    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <VStack gap='8' max>
                <Filters />
                {
                    isTableUpdating ? (
                        <VStack max align='center'>
                            <Loader />
                        </VStack>
                    ) : (
                        <>
                            <Table  
                                style={{ maxWidth: '100%' }}
                                scroll={{ x: 'max-content' }} 
                                size='small'
                                bordered
                                rowKey={(org) => org.id}
                                dataSource={filteredOrgs.map((org, index) => ({ ...org, index: (currentPage-1)*pageSize + index + 1 }))} 
                                columns={[
                                    {
                                        title: '№', 
                                        dataIndex: 'index', 
                                        width: '60px',
                                    },
                                    ...orgsColumns.map(column => ({
                                        ...column,
                                        sorter: true,
                                        sortDirections: ['ascend', 'descend'],
                                        onHeaderCell: column => ({
                                            onClick: () => handleColumnSort(column)
                                        }),
                                    })),
                                    {
                                        title: 'Действия',
                                        key: 'actions',
                                        width: '100px',
                                        render: (text, record) => (
                                            <Space>
                                                <Tooltip title="Редактировать" color='blue'>
                                                    <Button
                                                        type="primary"
                                                        shape="circle"
                                                        size="middle"
                                                        icon={<EditOutlined />}
                                                        onClick={() => handleOpenEditModal(record)}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Удалить" color='red'>
                                                    <Button
                                                        type="default"
                                                        danger
                                                        shape="circle"
                                                        size="middle"
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => handleOpenDeleteModal(record)}
                                                    />
                                                </Tooltip>
                                            </Space>
                                        ),
                                    },
                                ]} 
                                locale={{
                                    emptyText: 'Записях об организациях, подходящих по фильтру нет',
                                    triggerAsc: 'Сортировать по возрастанию',
                                    triggerDesc: 'Сортировать по убыванию',
                                    cancelSort: 'Отменить сортировку',
                                }}
                                loading={isTableUpdating}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: filteredOrgsCount.totalCount,
                                    onChange: handleTableChange,
                                    showSizeChanger: false 
                                }}
                                sticky
                            />
                            <EditOrgModal 
                            
                            />
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
                    )
                }
            </VStack>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;