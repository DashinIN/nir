import { sendSelectedTitles } from '@/shared/api/queries';
import { outputToExel } from '@/shared/lib/outputToExel/outputToExel';
import { useQuery, useMutation } from 'react-query';

const UseTemplate = () => {
    

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
        if (!data[0].sample_content.length) {
            return;
        }
        try {
            console.log(data[0].sample_content);
            const selectedData = await useSendSelectedTitles.mutateAsync(data[0].sample_content);
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
            <h2>Сгенерировать таблицу</h2>
            {   
                data.map(item => (
                    <div key={item.sample_name}>
                        <div>{item.sample_name}</div>
                        <div>{item.sample_content.join(', ')}</div>
                    </div>
                ))
            }
            <button 
                onClick={getRequestTable} 
                disabled={useSendSelectedTitles.isLoading}>
                {useSendSelectedTitles.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </>
    );
};

export default UseTemplate;