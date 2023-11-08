import { sendSelectedTitles } from '@/shared/api/queries';
import { classNames } from '@/shared/lib/classNames/classNames';
import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import { SelectListItem } from '@/shared/ui/SelectListItem/SelectListItem';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

const UseTemplate = () => {
    const [selectedSample, setSelectedSample] = useState(0);

    const getAllSamples = async () => {
        const response = await fetch('http://localhost:5000/getAllSamples');
        if (!response.ok) {
            throw new Error('Произошла ошибка при получении данных');
        }
        return response.json();
    };

    const { data, isLoading, isError } =  useQuery('getAllSamples', getAllSamples);

    const useSendSelectedTitles = useMutation(sendSelectedTitles);

    const getRequestTable = async () => {
        if (!data[selectedSample].sample_content.length) {
            return;
        }
        try {
            console.log(data[selectedSample].sample_content);
            const selectedData = await useSendSelectedTitles.mutateAsync(data[selectedSample].sample_content);
            outputToExel(selectedData);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };
    
    if(isLoading) {
        return <div>загрузка шаблонов</div>;
    }

    return (
        <>
            <h2>Список доступных шаблонов</h2>
            {   
                data.map(item => (
                    <SelectListItem 
                        key = {item.sample_name}
                        name={item.sample_name}
                        onClick={() => {
                            setSelectedSample(data.indexOf(item));
                        }}
                        isSelected = {data.indexOf(item) === selectedSample}
                        content={item.sample_content.join(', ')} 
                    />
                ))
            }
            <h3>Выбранный шаблон: {data[selectedSample].sample_name}</h3>
            <h2>Сгенерировать таблицу</h2>
            <button 
                onClick={getRequestTable} 
                disabled={useSendSelectedTitles.isLoading}>
                {useSendSelectedTitles.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </>
    );
};

export default UseTemplate;