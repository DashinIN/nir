/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import './index.scss';

function App() {
    const [items, setItems] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllTitles = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/getAllTitles');
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const jsonData = await response.json();
            setFields(jsonData);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setLoading(false);
        }
    };
  
    const getRequestTable = async () => {
        if(!items.length) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/postOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(items),
            });
            if (!response.ok) {
                throw new Error('Ошибка HTTP: ' + response.status);
            }
            const data = await response.json();
            const ws = XLSXUtils.json_to_sheet(data);
            const wb = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(wb, ws, 'Лист 1');
            XLSXWriteFile(wb, 'Таблица.xlsx');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (field) => {
        if (items.includes(field)) {
            setItems(items.filter(item => item !== field));
        } else {
            setItems([...items, field]);
        }
    };

    useEffect(() => {
        fetchAllTitles();
    }, []);

    return (
        <div className="App">
            <h2>Отметьте требуемые поля</h2>
            <div className="fieldsWrapper">
                {fields.map((field, index) => (
                    <div className='fieldItem' key={index}>
                        <input
                            type="checkbox"
                            name="check"
                            checked={items.includes(field)}
                            onChange={() => handleCheckboxChange(field)}
                        />
                        <label htmlFor="check">{field}</label>
                    </div>
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
            <h2>Сгенерировать отчет</h2>
            <button onClick={getRequestTable} disabled={loading}>
                {loading ? 'Загрузка...' : 'Получить таблицу'}
            </button>
        </div>
    );
}

export default App;