import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectListItem } from '../SelectListItem/SelectListItem';
import { useAllSamples } from '../../api/sampleApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedSample } from '../../model/selectors/getSelectedSample';
import { sampleActions } from '../../model/slice/sampleSlice';
import s from './SampleSelector.module.scss';

export const SampleSelector = () => {
    const {
        data: allSamples,
        isLoading,
        isError,
        isSuccess,
        refetch
    } = useAllSamples();
    
    useEffect(() => {
        refetch();
    }, [refetch]);

    const dispatch = useDispatch();
    const selectedSample = useSelector(getSelectedSample);

    let selectedSampleName;
    if (isSuccess  && allSamples[selectedSample]) {
        selectedSampleName = allSamples[selectedSample].sample_name;
    } else {
        return null;
    }

    const selectHandler = (item) => {
        const sampleIndex = allSamples.indexOf(item);
        dispatch(sampleActions.setSelectedSample(sampleIndex));
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
                <h2>Активный шаблон: {selectedSampleName}</h2>
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
                                key = {item.sample_name}
                                name={item.sample_name}
                                onSelect={() => selectHandler(item)}
                                isSelected = {allSamples.indexOf(item) === selectedSample}
                                content={`Количество полей: ${item.sample_content.length}`} 
                            />
                        ))
                    }
                </VStack>
            </div>
        </VStack>
    );
};
