import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { useState, useEffect } from 'react';
import { Page } from '@/widgets/Page';
import { getSelectedSample } from '../../../entities/Sample/model/selectors/getSelectedSample';
import { useGetFilterValues, useGetFilteredOrgs, useGetFilteredOrgsCount, useGetSampleFieldsHeaders } from '../api/viewSampleApi';
import { Loader } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useDispatch, useSelector } from 'react-redux';


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
    const selectedSample = useSelector(getSelectedSample);

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

    const { data, isLoading, refetch } = useGetFilterValues({
        fedOkrug: fedOkrugFilterValue,
        region: regionFilterValue
    });
    const { data: headers, isLoading: isHeadersLoading } = useGetSampleFieldsHeaders(selectedSample+1);
    const {
        data: filteredOrgsCount, 
        isLoading: isFilteredOrgsCountLoading,
        refetch: orgsCountRefetch 
    } = useGetFilteredOrgsCount(filters);

    const [getFilteredOrgs, { 
        data: filteredOrgs,
        error,
        isLoading: isOrgsLoading 
    }] = useGetFilteredOrgs({
        filters: filters, 
        selectedSampleId: selectedSample+1
    }); 

    useEffect(() => {
        refetch();
        if (data && data.regionValues) {
            setRegionFilterValue(prev => prev.filter(region => data.regionValues.includes(region)));
        }
    }, [data, fedOkrugFilterValue, refetch]);

    useEffect(() => {
        orgsCountRefetch();
    }, [orgTypeFilterValue, statusEgrulFilterValue, fedOkrugFilterValue, levelFilterValue, regionFilterValue, orgsCountRefetch]);

    useEffect(() => {
        console.log(filteredOrgsCount);
    }, [filteredOrgsCount]);


    const handleButtonClick = () => {
        getFilteredOrgs({filters: filters, selectedSampleId: selectedSample+1});
    };

    useEffect(() => {
        console.log('Data:', filteredOrgs);
        console.log('Loading:', isOrgsLoading);
    }, [filteredOrgs, isOrgsLoading]);


    const levelOptions = generateOptions(data?.levelValues || [], levelLabels);
    const orgTypeOptions = generateOptions(data?.orgTypeValues || []);
    const statusEgrulOptions = generateOptions(data?.statusEgrulValues || []);
    const fedOkrugOptions = generateOptions(data?.fedokrugValues || [], fedOkrugLabels);
    const regionOptions = generateOptions(data?.regionValues || []);
    
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