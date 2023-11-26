import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectListItem } from '@/widgets/SelectListItem/SelectListItem';
import s from './SampleSelector.module.scss';
import { useAllSamples } from '../../api/sampleApi';
import { useEffect } from 'react';

export const SampleSelector = ({ selectedSample, setSelectedSample}) => {

    const {data, isLoading, isError, refetch} = useAllSamples();
    
    useEffect(() => {
        refetch();
    }, [refetch]);


    const selectHandler = (item) => {
        setSelectedSample(data.indexOf(item));
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
