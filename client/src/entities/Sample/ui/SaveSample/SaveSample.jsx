import { useState } from 'react';
import { Button, Input } from 'antd';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAddSample } from '../../api/sampleApi';
import SaveIcon from '@/shared/assets/save.svg';
import s from './SaveSample.module.scss';

export const SaveSample = ({items}) => {
    const [sampleNameInputValue, setSampleNameInputValue] = useState('');
    const [validationErrorMessage, setValidationErrorMessage] = useState('');
    const [addSample, {isSuccess, isError, isLoading, error, data} ] = useAddSample();

    const handleNameChange = (event) => {
        setSampleNameInputValue(event.target.value);
    };

    const handleSave = async () => {
        if (!(sampleNameInputValue.trim() !== '' && items)) {
            setValidationErrorMessage('Введите название и содержимое шаблона.');
            return;
        }
        setValidationErrorMessage('');

        const sampeleData = { name: sampleNameInputValue, items };
        await addSample(sampeleData);

        if (isSuccess) {
            setSampleNameInputValue('');
        }
    };

    return (
        <VStack gap={8} align='center'>
            <h2>Сохранение шаблона</h2>
            {validationErrorMessage  && (
                <div className={s.errors}>{validationErrorMessage}</div>
            )}
            {(isError && !validationErrorMessage) && (
                <div className={s.errors}>{error.data.error}</div>
            )}
            {isSuccess && (
                <div>{data.message}</div>
            )}  
            <HStack gap={8}>
                <Input 
                    type="text"
                    size='large'
                    value={sampleNameInputValue}
                    onChange={handleNameChange}
                    placeholder="Название шаблона" />
                <Button 
                    onClick={handleSave}
                    className={s.saveButton}
                    size='large'
                >
                    {isLoading ? 'Сохранение...' : 'Cохранить'}
                    <SaveIcon />
                </Button>
            </HStack>          
        </VStack>
    );
};
