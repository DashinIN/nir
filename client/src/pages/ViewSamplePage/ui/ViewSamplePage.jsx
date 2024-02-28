import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { Page } from '@/widgets/Page';
import { getSelectedSample } from '../../../entities/Sample/model/selectors/getSelectedSample';
import { useGetFilterValues, useGetFilteredOrgs, useGetSampleFieldsHeaders } from '../api/viewSampleApi';
import { Loader } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useDispatch, useSelector } from 'react-redux';


const initialReducers = {
    sample: sampleReducer,
};

const ViewSamplePage = () => {
    const selectedSample = useSelector(getSelectedSample);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    
    const [orgTypeFilterValue, setOrgTypeFilterValue] = useState([]);
    const [statusEgrulFilterValue, setStatusEgrulFilterValue] = useState([]);
    const [fedOkrugFilterValue, setFedOkrugFilterValue] = useState([]);
    const [levelFilterValue, setLevelFilterValue] = useState([]);
    const [regionFilterValue, setRegionFilterValue] = useState([]);

    const { data, isLoading, refetch } = useGetFilterValues({
        fedOkrug: fedOkrugFilterValue,
        region: regionFilterValue
    });


    console.log(selectedSample + ' peredal');
    const { data: headers, isLoading: isHeadersLoading } = useGetSampleFieldsHeaders(selectedSample+1);
    


    const [getFilteredOrgs, { data: filteredOrgs, error, isLoading: isOrgsLoading }] = useGetFilteredOrgs(); // Используем lazy query

    const handleButtonClick = () => {
        getFilteredOrgs(
            {
                filters: {
                    orgType: orgTypeFilterValue,
                    statusEgrul: statusEgrulFilterValue,
                    fedOkrug: fedOkrugFilterValue,
                    level: levelFilterValue,
                    region: regionFilterValue
                },
                page: pagination.current, // Передаем текущую страницу
                pageSize: pagination.pageSize, // Передаем количество записей на странице
            });
    };

  

    useEffect(() => {
        refetch();
        if (data && data.regionValues) {
            setRegionFilterValue(prev => prev.filter(region => data.regionValues.includes(region)));
        }
    }, [data, fedOkrugFilterValue, refetch]);

    useEffect(() => {
        console.log('Data:', filteredOrgs);
        console.log('Loading:', isOrgsLoading);
    }, [filteredOrgs, isOrgsLoading]);

   

    const levelLabels = {
        '1': 'головное',
        '2': 'филиал',
        '3': 'представительство'
    };

    const levelOptions = data ? data.levelValues.filter(value => value !== 0).map(value => ({
        label: levelLabels[value] || value,
        value: value
    })) : [];
    
    const orgTypeOptions = data ? data.orgTypeValues.filter(value => Boolean(value) !== false).map(value => ({
        label: value,
        value: value
    })) : [];
    
    const statusEgrulOptions = data ? data.statusEgrulValues.filter(value => Boolean(value) !== false).map(value => ({
        label: value,
        value: value
    })) : [];
    
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
    
    const fedOkrugOptions = data ? Object.entries(fedOkrugLabels).map(([value, label]) => ({
        label: label,
        value: parseInt(value)
    })) : [];
    
    const regionOptions = data ? data.regionValues.filter(value => Boolean(value) !== false).map(value => ({
        label: value,
        value: value
    })) : [];
    
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <Page>
                <button onClick={handleButtonClick}>Отправить запрос</button>
                {isLoading ? (<Loader />) : (
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
              
                
            </Page>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;