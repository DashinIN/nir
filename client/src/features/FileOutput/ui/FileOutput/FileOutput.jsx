import { useMutation } from 'react-query';
import { fetchSelectedData } from '@/shared/api/queries';
import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import {Button} from '@/shared/ui/Button';


export const FileOutput = ({data, selectedSample}) => {
    const useFetchSelectedData = useMutation(fetchSelectedData);
     
    const selectedSampleName = data[selectedSample].sample_name;
    const selectedSampleTitles = data[selectedSample].sample_content;

    const getRequestTable = async () => {
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
            <h2>Вывести таблицу в файл по шаблону: {selectedSampleName}</h2>
            <Button 
                onClick={getRequestTable} 
                disabled={useFetchSelectedData.isLoading}>
                {useFetchSelectedData.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </Button>
        </>
    );
};
