import { useState } from 'react';
import { useMutation } from 'react-query';
import { addSample } from '@/shared/api/queries';

export const SaveSample = ({items}) => {
    const [name, setName] = useState('');
    const addSampleMutation  = useMutation(addSample); 

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

    return (
        <>
            <h2>Сохранить шаблон</h2>
            <input type="text" value={name}
                onChange={handleNameChange}
                placeholder="Название шаблона" />
            <button onClick={handleSave}>сохранить</button>
        </>
    );
};
