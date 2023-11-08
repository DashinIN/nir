import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { ReorderList } from '@/shared/ui/ReorderList/ReorderList';
import { FieldsSelector } from '@/widgets/FieldsSelector/FieldsSelector';
import { fetchAllTitles } from '@/shared/api/queries';
import {addSample} from '@/shared/api/queries';

const CreateTemplate = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');

    const addSampleMutation  = useMutation(addSample); 

    const { data: fields, isLoading} = useQuery('titles', fetchAllTitles);
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSave = () => {
        if (name.trim() !== '' && items) {
            const data = { name, items };
    
            addSampleMutation.mutate(data, {
                onSuccess: () => {
                    console.log('Запись успешно добавлена в таблицу output_samples');
                },
                onError: (error) => {
                    console.error('Ошибка:', error.message);
                },
            });
        } else {
            alert('Введите название и содержимое шаблона.');
        }
    };

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    if (isLoading) {
        return <div>Загрузка полей...</div>;
    }

    return (
        <>  
            <input 
                placeholder='Поиск поля' 
                type="text" 
                value={search}
                onChange={searchHandler}
            />
            <button onClick={() => setSearch('')}>
                Сбросить
            </button>
            <FieldsSelector 
                fields={fields
                    .filter(field =>
                        field.toLowerCase()
                            .includes(search.toLowerCase()))}
                items={items}
                setItems={setItems}
            />
            { Boolean(items.length) && (
                <>
                    <h2>Выберете порядок полей</h2>
                    <ReorderList items={items} setItems={setItems}/>
                    <div>Порядок полей: {items.join(', ').toLowerCase()}</div>
                    <h2>Сохранить шаблон</h2>
                    <input type="text" value={name}
                        onChange={handleNameChange}
                        placeholder="Название шаблона" />
                    <button onClick={handleSave}>сохранить</button>
                </>
            )}
        </>
    );
};

export default CreateTemplate;