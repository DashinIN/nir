import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import { Button } from 'antd';
import { VStack } from '@/shared/ui/Stack';
import { useAllSamples } from '@/entities/Sample/api/sampleApi';
import { useGetSelectedSampleData } from '../../api/fileOutputApi';
import { useSelector } from 'react-redux';
import { getSelectedSample } from '@/entities/Sample/model/selectors/getSelectedSample';
import DownloadIcon from '@/shared/assets/download.svg';
import s from './FileOutput.module.scss';
import { Loader } from '@/shared/ui/Loader';

export const FileOutput = () => {
    const selectedSample = useSelector(getSelectedSample);
    const {data: allSamples, isSuccess } = useAllSamples();
    const [getSelectedSampleData, { isLoading} ]  = useGetSelectedSampleData();

    const getRequestTable = async () => {
        const {data: selectedData} = await getSelectedSampleData(allSamples[selectedSample].sample_content);
        outputToExel(selectedData);
    };

    if(!isSuccess) {
        return <Loader />;
    }

    return (
        <VStack gap={8} max align={'center'}>
            <h2>Активный шаблон: {allSamples[selectedSample].sample_name}</h2>
            <Button 
                size='large'
                onClick={getRequestTable} 
                disabled={isLoading}
                className={s.downloadButton}
            >
                {isLoading ? 'Формирование таблицы...' : 'Экспорт данных по шаблону в виде таблицы'}
                <DownloadIcon />
            </Button>
        </VStack>
    );
};
