import { useMutation } from 'react-query';
import { fetchSelectedData } from '@/shared/api/queries';
import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';


export const FileOutput = ({data, selectedSample}) => {
    const useFetchSelectedData = useMutation(fetchSelectedData);

    const getRequestTable = async () => {
        const selectedSampleTitles = data[selectedSample].sample_content;
        if (!selectedSampleTitles.length) {
            return;
        }
        try {
            const selectedData = await useFetchSelectedData.mutateAsync(selectedSampleTitles);
            outputToExel(selectedData);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    return (
        <>
            <h2>Сгенерировать таблицу по шаблону {data[selectedSample].sample_name}</h2>
            <button 
                onClick={getRequestTable} 
                disabled={useFetchSelectedData.isLoading}>
                {useFetchSelectedData.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </>
    );
};
