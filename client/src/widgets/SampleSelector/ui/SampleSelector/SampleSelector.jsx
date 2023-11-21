import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectListItem } from '../SelectListItem/SelectListItem';
import s from './SampleSelector.module.scss';

export const SampleSelector = ({data, selectedSample, setSelectedSample}) => {

    const selectHandler = (item) => {
        setSelectedSample(data.indexOf(item));
    };

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
