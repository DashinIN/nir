import { sendSelectedTitles, getAllSamples } from '@/shared/api/queries';
import { classNames } from '@/shared/lib/classNames/classNames';
import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import { SelectListItem } from '@/shared/ui/SelectListItem/SelectListItem';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

const UseTemplate = () => {
    const [selectedSample, setSelectedSample] = useState(0);
    const { data, isLoading } =  useQuery('getAllSamples', getAllSamples);
    const useSendSelectedTitles = useMutation(sendSelectedTitles);

    const getRequestTable = async () => {
        const selectedSampleTitles = data[selectedSample].sample_content;
        if (!selectedSampleTitles.length) {
            return;
        }
        try {
            const selectedData = await useSendSelectedTitles.mutateAsync(selectedSampleTitles);
            outputToExel(selectedData);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const selectHandler = (item) => {
        setSelectedSample(data.indexOf(item));
    };
    
    if(isLoading) {
        return <div>загрузка шаблонов</div>;
    }

    return (
        <>
            <h2>Список доступных шаблонов</h2>
            <div className='row'>
                <p>Название шаблона</p>
                <p>Порядок полей</p>
            </div>
            {   
                data.map(item => (
                    <SelectListItem 
                        key = {item.sample_name}
                        name={item.sample_name}
                        onSelect={() => selectHandler(item)}
                        isSelected = {data.indexOf(item) === selectedSample}
                        content={item.sample_content.join(', ')} 
                    />
                ))
            }
            <h2>Сгенерировать таблицу по шаблону {data[selectedSample].sample_name}</h2>
            <button 
                onClick={getRequestTable} 
                disabled={useSendSelectedTitles.isLoading}>
                {useSendSelectedTitles.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </>
    );
};

export default UseTemplate;