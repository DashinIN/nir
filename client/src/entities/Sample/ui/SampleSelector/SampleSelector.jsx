import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectListItem } from '@/widgets/SelectListItem/SelectListItem';
import { useAllSamples } from '../../api/sampleApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedSample } from '../../model/selectors/getSelectedSample';
import { sampleActions } from '../../model/slice/sampleSlice';
import s from './SampleSelector.module.scss';

export const SampleSelector = () => {
    const {data, isLoading, isError, refetch} = useAllSamples();
    
    useEffect(() => {
        refetch();
    }, [refetch]);

    const dispatch = useDispatch();
    const selectedSample = useSelector(getSelectedSample);

    const selectHandler = (item) => {
        const sampleIndex = data.indexOf(item);
        dispatch(sampleActions.setSelectedSample(sampleIndex));
    };

    if(isLoading) {
        return <div>загрузка</div>;
    }

    if(isError) {
        return <div>ошибка загрузки</div>;
    }

    return (
        <VStack max gap={8}>
            <h2>Список доступных шаблонов</h2>
            <div className={s.container}>
                <HStack max gap={8} justify='between' className={s.titles}>
                    <p>Название шаблона</p>
                    <p>Поля шаблона</p>
                </HStack>
                <VStack max className={s.wrapper}>
                    {   
                        data.map(item => (
                            <SelectListItem 
                                key = {item.sample_name}
                                name={item.sample_name}
                                onSelect={() => selectHandler(item)}
                                isSelected = {data.indexOf(item) === selectedSample}
                                content={`Количество полей: ${item.sample_content.length}`} 
                            />
                        ))
                    }
                </VStack>
            </div>
        </VStack>
    );
};
