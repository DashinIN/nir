import { sendSelectedTitles } from '../../shared/api/queries';
import { outputToExel } from '../../shared/lib/outputToExel/outputToExel';
import { useMutation } from 'react-query';

const UseTemplate = ({items}) => {

    const sendingSelectedTitles = useMutation(sendSelectedTitles);

    const getRequestTable = async () => {
        if (!items.length) {
            return;
        }
        try {
            const data = await sendingSelectedTitles.mutateAsync(items);
            outputToExel(data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    return (
        <>
            <h2>Сгенерировать таблицу</h2>
            <button 
                onClick={getRequestTable} 
                disabled={sendingSelectedTitles.isLoading}>
                {sendingSelectedTitles.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </>
    );
};

export default UseTemplate;