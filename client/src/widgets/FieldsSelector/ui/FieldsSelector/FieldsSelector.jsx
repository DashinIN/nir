import { FieldsList } from '../FieldsList/FieldsList';
import { useState } from 'react';

export const FieldsSelector = ({fields, items, setItems}) => {
    const [searchValue, setSearchValue] = useState('');

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const resetSearchHandler = () => {
        setSearchValue('');
    };

    const filteredFields = fields.filter(field => 
        field.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>  
            <h2>Отметьте требуемые поля</h2>
            <input 
                placeholder='Поиск поля' 
                type="text" 
                value={searchValue}
                onChange={searchHandler}
            />
            <button onClick={resetSearchHandler}>
                Сбросить
            </button>
            <FieldsList 
                fields={filteredFields}
                items={items}
                setItems={setItems}
            />
        </>
    );
};
