import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectListItem } from '../SelectListItem/SelectListItem';
import { useAllSamples, useDeleteSample } from '../../api/sampleApi';
import { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedSample } from '../../model/selectors/getSelectedSample';
import { sampleActions } from '../../model/slice/sampleSlice';
import { useNavigate } from 'react-router-dom';
import s from './SampleSelector.module.scss';

export const SampleSelector = () => {
    const {
        data: allSamples,
        isLoading,
        isError,
        refetch
    } = useAllSamples();
    const dispatch = useDispatch();
    const selectedSampleId = useSelector(getSelectedSample); 

    useEffect(() => {
        if(!selectedSampleId && allSamples){
            const firstSampleId = allSamples[0].sample_id;
            dispatch(sampleActions.setSelectedSample(firstSampleId));
        }
        refetch();
    }, [allSamples, dispatch, refetch, selectedSampleId]);

    const [deleteSample] = useDeleteSample();

    const navigate = useNavigate();   

    const selectHandler = (item) => () => {
        dispatch(sampleActions.setSelectedSample(item.sample_id));
    };

    const editHandler = (item)  => () => {
        const sample = allSamples.find(sample => sample.sample_name === item.sample_name); 
        const sampleId = sample.sample_id; 
        navigate(`/editSample/${sampleId}`); 
    };

    const deleteHandler = (item) => async () => {
        const sample = allSamples.find(sample => sample.sample_name === item.sample_name); 
        const sampleId = sample.sample_id; 
        try {
            const deleteData = await deleteSample(sampleId);
            const updatedSamples = await refetch();
            const firstSampleId = updatedSamples.data[0].sample_id;
            dispatch(sampleActions.setSelectedSample(firstSampleId));
            message.success(deleteData.data.message); 
        } catch (error) {
            message.error('Ошибка при удалении шаблона');
            console.error('Ошибка при удалении шаблона:', error);
        }
    };

    if(isLoading) {
        return null;
    }

    if(isError) {
        return <div>ошибка загрузки</div>;
    }

    return (
        <VStack max gap={8}>
            <HStack max justify='center'>
                <h3>Активный шаблон: {allSamples.find(sample => sample.sample_id === selectedSampleId)?.sample_name}</h3>                   

            </HStack>
            <h2>Список доступных шаблонов</h2>
            <div className={s.container}>
                <HStack max gap={8} justify='between' className={s.titles}>
                    <p>Название шаблона</p>
                    <p>Информация о шаблоне</p>
                </HStack>
                <VStack max className={s.wrapper}>
                    {   
                        allSamples.map(item => (
                            <SelectListItem 
                                key={item.sample_name}
                                name={item.sample_name}
                                onSelect={selectHandler(item)}
                                onEdit={editHandler(item)}
                                onDelete={deleteHandler(item)}
                                isSelected={item.sample_id === selectedSampleId} 
                                content={`Количество полей: ${item.sample_content.length}`} 
                            />
                        ))
                    }
                </VStack>
            </div>
            
        </VStack>
    );
};
