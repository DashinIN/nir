import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { getSelectedSample, useAllSamples } from '@/entities/Sample';
import { useDeleteOrgRecord, useEditOrgRecord, useGetFilterValues, useGetFilteredOrgs, useGetFilteredOrgsCount, useGetSampleFieldsHeaders } from '../api/viewSampleApi';
import { Loader } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useSelector } from 'react-redux';
import { Table, Modal, Button, Form, Input, message, Space, Tooltip  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { HStack, VStack } from '@/shared/ui/Stack';
import { levelLabels, fedOkrugLabels, validationRules } from '../consts/consts';

const initialReducers = {
    sample: sampleReducer,
};

const generateOptions = (values, labels) => {
    return values ? values.filter(value => Boolean(value) !== false).map(value => ({
        label: labels ? labels[value] || value : value,
        value: value
    })) : [];
};

const ViewSamplePage = () => {
    //Номер текущего шаблона
    const selectedSample = useSelector(getSelectedSample) || 1;
    const selectedSampleId = selectedSample + 1;
    const {data: allSamples, isSuccess } = useAllSamples();
        
    const [sortInfo, setSortInfo] = useState({ columnKey: null, order: 0 });
    //Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    //Состояния фильтров
    const [orgTypeFilterValue, setOrgTypeFilterValue] = useState([]);
    const [statusEgrulFilterValue, setStatusEgrulFilterValue] = useState([]);
    const [fedOkrugFilterValue, setFedOkrugFilterValue] = useState([]);
    const [levelFilterValue, setLevelFilterValue] = useState([]);
    const [regionFilterValue, setRegionFilterValue] = useState([]);

    const filters = {
        orgType: orgTypeFilterValue,
        statusEgrul: statusEgrulFilterValue,
        fedOkrug: fedOkrugFilterValue,
        level: levelFilterValue,
        region: regionFilterValue
    };

    //Получение параметров для фильтров
    const { 
        data: filtersData,
        isLoading: isFiltersDataLoading,
        refetch: filtersDataRefetch 
    } = useGetFilterValues({
        fedOkrug: fedOkrugFilterValue,
        region: regionFilterValue
    });

    const levelOptions = generateOptions(filtersData?.levelValues || [], levelLabels);
    const orgTypeOptions = generateOptions(filtersData?.orgTypeValues || []);
    const statusEgrulOptions = generateOptions(filtersData?.statusEgrulValues || []);
    const fedOkrugOptions = generateOptions(filtersData?.fedokrugValues || [], fedOkrugLabels);
    const regionOptions = generateOptions(filtersData?.regionValues || []);

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

    //При изменении федерального округа оставляем в выбранных только подходящие регионы
    useEffect(() => {
        filtersDataRefetch();
        if (filtersData && filtersData.regionValues) {
            setRegionFilterValue(prev => prev.filter(region => filtersData.regionValues.includes(region)));
        }
    }, [fedOkrugFilterValue, filtersData, filtersDataRefetch]);

    //При изменении фильтров пересчитываем записи, делаем по ним пагинацию и обновляем таблицу
    useEffect(() => {
        setCurrentPage(1);
        orgsCountRefetch();
        orgsRefetch({
            sortField: sortInfo.columnKey,
            sortOrder: sortInfo.order
        });
    }, [
        orgTypeFilterValue,
        statusEgrulFilterValue,
        fedOkrugFilterValue,
        levelFilterValue,
        regionFilterValue,
        sortInfo,
        orgsCountRefetch, 
        orgsRefetch
    ]);

    useEffect(() => {
        console.log(filteredOrgs);
    }, [filteredOrgs]);

    useEffect(() => {
        console.log(orgsColumns);
    }, [ orgsColumns]);

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

    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <VStack gap='8' >
                <div style={{ padding: '20px' }}>
                    <VStack gap='8'>
                        <HStack max justify='between'> 
                            <h3>Фильтр</h3>
                            {isSuccess && <h3>Активный шаблон: { allSamples[selectedSample].sample_name}</h3>}
                        </HStack>   
                        {isFiltersDataLoading || isTableUpdating  ? (
                            <VStack max align='center'>
                                <Loader />
                            </VStack>
                        ) : (
                            <Space>
                                <Select 
                                    options={orgTypeOptions}
                                    value={orgTypeFilterValue}
                                    onChange={setOrgTypeFilterValue}
                                    placeholder={'Тип организации'}
                                />
                                <Select 
                                    options={statusEgrulOptions}
                                    value={statusEgrulFilterValue}
                                    onChange={setStatusEgrulFilterValue}
                                    placeholder={'Статус в ЕГРЮЛ'}
                                />
                                <Select 
                                    options={fedOkrugOptions}
                                    value={fedOkrugFilterValue}
                                    onChange={setFedOkrugFilterValue}
                                    placeholder={'Федеральный округ'}
                                />
                                <Select 
                                    options={regionOptions}
                                    value={regionFilterValue}
                                    onChange={setRegionFilterValue}
                                    placeholder={'Регион'}
                                />
                                <Select 
                                    options={levelOptions}
                                    value={levelFilterValue}
                                    onChange={setLevelFilterValue}
                                    placeholder={'Уровень'}
                                />
                            </Space>  
                        )}
                    </VStack>
                </div>
                {
                    isTableUpdating ? (
                        <VStack max align='center'>
                            <Loader />
                        </VStack>
                    ) : (
                        <>
                            <Table  
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
                                    {orgsColumns.filter(org => org.title !== 'id').map((column) => (
                                        <Form.Item 
                                            key={column.key}
                                            name={column.dataIndex}
                                            label={column.title}
                                            rules={validationRules[column.dataIndex]}
                                            initialValue={selectedOrgForEdit && selectedOrgForEdit[column.dataIndex]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    ))}
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
                    )
                }
            </VStack>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;