import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { Page } from '@/widgets/Page';
import { getSelectedSample } from '../../../entities/Sample/model/selectors/getSelectedSample';
import { 
    useGetFilterValues,
    useGetFilteredOrgs,
    useGetFilteredOrgsCount, 
    useGetSampleFieldsHeaders
} from '../api/viewSampleApi';
import { Loader } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useSelector } from 'react-redux';
import { Table } from 'antd';


const initialReducers = {
    sample: sampleReducer,
};

const levelLabels = {
    '1': 'головное',
    '2': 'филиал',
    '3': 'представительство'
};

const fedOkrugLabels = {
    '1': 'Центральный федеральный округ',
    '2': 'Северо-Западный федеральный округ',
    '3': 'Южный федеральный округ',
    '4': 'Приволжский федеральный округ',
    '5': 'Уральский федеральный округ',
    '6': 'Сибирский федеральный округ',
    '7': 'Дальневосточный федеральный округ',
    '8': 'Прочие',
    '10': 'Федеральный округ не задан',
    '11': 'Северо-Кавказский федеральный округ',
    '9999': 'Не указано'
};

const generateOptions = (values, labels) => {
    return values ? values.filter(value => Boolean(value) !== false).map(value => ({
        label: labels ? labels[value] || value : value,
        value: value
    })) : [];
};


const ViewSamplePage = () => {
    //Номер текущего шаблона
    const selectedSample = useSelector(getSelectedSample);
    const selectedSampleId = selectedSample + 1;
     
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
        currentPage
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
        orgsRefetch();
    }, [
        orgTypeFilterValue,
        statusEgrulFilterValue,
        fedOkrugFilterValue,
        levelFilterValue,
        regionFilterValue,
        orgsCountRefetch, 
        orgsRefetch
    ]);


    const isTableUpdating = isOrgsColumnsLoading || isOrgsLoading || isFilteredOrgsCountLoading;

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination);
    };
    
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <Page>
                {isFiltersDataLoading  ? (<Loader />) : (
                    <>
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
                    </>
                )}
                {
                    isTableUpdating ? (<Loader />) : (
                        <Table
                            dataSource={filteredOrgs}
                            columns={orgsColumns} 
                            loading={isTableUpdating}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: filteredOrgsCount.totalCount,
                                onChange: handleTableChange,
                                showSizeChanger: false 
                            }}
                            scroll={{
                                y: 530,
                            }}
                        />
                    )
                }
                
            </Page>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;