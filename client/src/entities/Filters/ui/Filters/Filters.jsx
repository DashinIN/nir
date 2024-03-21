import { useDispatch, useSelector } from 'react-redux';
import { getFedOkrugFitlerValue, getRegionFilterValue, getOrgTypeFilterValue, getStatusEgrulFilterValue, getLevelFilterValue } from '../../model/selectors/getFilters';
import { filtersActions } from '../../model/slice/FiltersSlice';
import { getSelectedSample, useAllSamples } from '@/entities/Sample';
import { levelLabels, fedOkrugLabels } from '@/shared/consts/filtersConsts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Space } from 'antd';
import { Loader } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useEffect } from 'react';
import s from './Filters.module.scss';
import { useGetFilterValues } from '../../api/filtersApi';

const generateOptions = (values, labels) => {
    return values ? values.filter(value => Boolean(value) !== false).map(value => ({
        label: labels ? labels[value] || value : value,
        value: value
    })) : [];
};

export const Filters = () => {
    const dispatch = useDispatch();
    
    const selectedSampleId = useSelector(getSelectedSample);
    const {data: allSamples } = useAllSamples();

    const orgTypeFilterValue = useSelector(getOrgTypeFilterValue);
    const statusEgrulFilterValue = useSelector(getStatusEgrulFilterValue);
    const fedOkrugFilterValue = useSelector(getFedOkrugFitlerValue);
    const levelFilterValue = useSelector(getLevelFilterValue);
    const regionFilterValue = useSelector(getRegionFilterValue);

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

    const handleChangeOrgTypeFilter = (value) => {
        dispatch(filtersActions.setOrgTypeFilter(value));
    };
    
    const handleChangeStatusEgrulFilter = (value) => {
        dispatch(filtersActions.setStatusEgrulFilter(value));
    };

    const handleChangeFedOkrugFilter = (value) => {
        dispatch(filtersActions.setFedOkrugFilter(value));
    };

    const handleChangeLevelFilter = (value) => {
        dispatch(filtersActions.setLevelFilter(value));
    };

    const handleChangeRegionFilter = (value) => {
        dispatch(filtersActions.setRegionFilter(value));
    };

    useEffect(() => {
        filtersDataRefetch();
        if(filtersData && filtersData.regionValues) {
            dispatch(filtersActions.setCorrectRegions(filtersData.regionValues));
        }
    }, [filtersData, fedOkrugFilterValue, filtersDataRefetch, dispatch]);


    return (
        <div className={s.wrapper}>
            <VStack gap='8' max> 
                {isFiltersDataLoading  ? (
                    <VStack max align='center'>
                        <Loader />
                    </VStack>
                ) : (
                    <>
                        <HStack max justify='between'> 
                            <h3>Фильтр по организациям</h3>
                            <h3>Активный шаблон: {allSamples.find(sample => sample.sample_id === selectedSampleId)?.sample_name}</h3>                                    
                        </HStack>  
                        <Space>
                            <Select 
                                options={fedOkrugOptions}
                                value={fedOkrugFilterValue}
                                onChange={handleChangeFedOkrugFilter}
                                placeholder={'Федеральный округ'}
                            />
                            <Select 
                                options={regionOptions}
                                value={regionFilterValue}
                                onChange={handleChangeRegionFilter}
                                placeholder={'Регион'}
                            />
                            <Select 
                                options={orgTypeOptions}
                                value={orgTypeFilterValue}
                                onChange={handleChangeOrgTypeFilter}
                                placeholder={'Тип организации'}
                            />
                            <Select 
                                options={levelOptions}
                                value={levelFilterValue}
                                onChange={handleChangeLevelFilter}
                                placeholder={'Уровень организации'}
                            />
                            <Select 
                                options={statusEgrulOptions}
                                value={statusEgrulFilterValue}
                                onChange={handleChangeStatusEgrulFilter}
                                placeholder={'Статус в ЕГРЮЛ'}
                            />
                        </Space>  
                    </>
                )}
            </VStack>
        </div>
    );
};
