import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input';
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
        <VStack max gap={8}>
            <h2>Сохранить шаблон</h2>
            {validationErrorMessage  && (
                <div className={s.errors}>{validationErrorMessage}</div>
            )}
            {(isError && !validationErrorMessage) && (
                <div className={s.errors}>{error.data.error}</div>
            )}
            {isSuccess && (
                <div>{data.message}</div>
            )}  
            <HStack gap={8} max>
                <Input 
                    type="text"
                    value={sampleNameInputValue}
                    onChange={handleNameChange}
                    placeholder="Название шаблона" />
                <Button 
                    onClick={handleSave}
                    className={s.saveButton}
                >
                    {isLoading ? 'Сохранение...' : 'Cохранить'}
                    <SaveIcon />
                </Button>
            </HStack>          
        </VStack>
    );
};
