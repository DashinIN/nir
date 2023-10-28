/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Reorder } from 'framer-motion';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { useQuery, useMutation } from 'react-query';
import { CheckboxItem } from '../shared/ui/CheckboxItem/CheckboxItem';
import {fetchAllTitles, sendSelectedTitles} from '../shared/api/queries';
import './index.scss';

function App() {
    const [items, setItems] = useState([]);

    const { data: fields, isLoading} = useQuery('titles', fetchAllTitles);
    const sendingSelectedTitles = useMutation(sendSelectedTitles);

    const getRequestTable = async () => {
        if (!items.length) {
            return;
        }
        try {
            const data = await sendingSelectedTitles.mutateAsync(items);
            const ws = XLSXUtils.json_to_sheet(data);
            const wb = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(wb, ws, 'Лист 1');
            XLSXWriteFile(wb, 'Таблица.xlsx');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };
      
    const handleCheckboxChange = (field) => {
        if (items.includes(field)) {
            setItems(items.filter(item => item !== field));
        } else {
            setItems([...items, field]);
        }
    };

    if (isLoading) {
        return <div>Загрузка полей...</div>;
    }

    return (
        <div className="App">
            <h2>Отметьте требуемые поля</h2>
            <div className="fieldsWrapper">
                {fields.map((field, index) => (
                    <CheckboxItem 
                        key={index} 
                        label={field}
                        handleCheckboxChange={() => handleCheckboxChange(field)}
                        handleCheck={items.includes(field)}
                    />
                ))}
            </div>
            { Boolean(items.length) && (
                <>
                    <h2>Выберете порядок полей</h2>
                    <Reorder.Group values={items} onReorder={setItems} className='itemsWrapper'>
                        {items.map(item => (
                            <Reorder.Item key={item} value={item} className='item'>
                                {item}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    <div>Порядок полей: {items.join(', ').toLowerCase()}</div>
                </>
            )}
            <h2>Сгенерировать таблицу</h2>
            <button 
                onClick={getRequestTable} 
                disabled={sendingSelectedTitles.isLoading}>
                {sendingSelectedTitles.isLoading ? 'Загрузка' : 'Получить таблицу'}
            </button>
        </div>
    );
}

export default App;