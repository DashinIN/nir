import { useState } from 'react';
import { useMutation } from 'react-query';
import { addSample } from '@/shared/api/queries';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input';
import s from './SaveSample.module.scss';

export const SaveSample = ({items}) => {
    const [sampleNameInputValue, setSampleNameInputValue] = useState('');
    const [validationErrorMessage, setValidationErrorMessage] = useState('');
    const addSampleMutation  = useMutation(addSample); 

    const handleNameChange = (event) => {
        setSampleNameInputValue(event.target.value);
    };

    const handleSave = () => {
        if (!(sampleNameInputValue.trim() !== '' && items)) {
            setValidationErrorMessage('Введите название и содержимое шаблона.');
            return;
        }
    
        setValidationErrorMessage('');
        const data = { name: sampleNameInputValue, items };
    
        addSampleMutation.mutate(data, {
            onSuccess: () => {
                setSampleNameInputValue('');
            },
            onError: (error) => {
                console.error(error.message);
            },
        });
    };

    return (
        <>
            <h2>Сохранить шаблон</h2>
            <div className={s.search}>
                <Input 
                    type="text"
                    value={sampleNameInputValue}
                    onChange={handleNameChange}
                    placeholder="Название шаблона" />
                <Button onClick={handleSave}>сохранить</Button>
            </div>
            {validationErrorMessage  && (
                <div>{validationErrorMessage}</div>
            )}
            {(addSampleMutation.isError && !validationErrorMessage) && (
                <div>{addSampleMutation.error.message}</div>
            )}
            {addSampleMutation.isSuccess && (
                <div>{addSampleMutation.data.message}</div>
            )}            
        </>
    );
};
