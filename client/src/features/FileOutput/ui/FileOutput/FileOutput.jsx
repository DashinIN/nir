import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { useAllSamples } from '@/entities/Sample/api/sampleApi';
import { useGetSelectedSampleData } from '../../api/fileOutputApi';
import { useSelector } from 'react-redux';
import { getSelectedSample } from '@/entities/Sample/model/selectors/getSelectedSample';


export const FileOutput = () => {

    const selectedSample = useSelector(getSelectedSample);

    const {data: allSamples, isSuccess } = useAllSamples();
   
    const [getSelectedSampleData, { isLoading} ]  = useGetSelectedSampleData();

    let selectedSampleName, selectedSampleTitles;
    if (isSuccess && allSamples && allSamples[selectedSample]) {
        selectedSampleName = allSamples[selectedSample].sample_name;
        selectedSampleTitles = allSamples[selectedSample].sample_content;
    } else {
        return null;
    }

    const getRequestTable = async () => {
        if (!selectedSampleTitles.length) {
            return;
        }
        const {data: selectedData} = await getSelectedSampleData(selectedSampleTitles);
        outputToExel(selectedData);
    };

    return (
        <VStack gap={8} max>
            <h2>Выбранный шаблон: {selectedSampleName}</h2>
            <Button 
                onClick={getRequestTable} 
                disabled={isLoading}>
                {isLoading ? 'Формирование таблицы...' : 'Получить таблицу'}
            </Button>
        </VStack>
    );
};
