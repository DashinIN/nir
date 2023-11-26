import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAddSample } from '../../api/sampleApi';

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
                <div>{validationErrorMessage}</div>
            )}
            {(isError && !validationErrorMessage) && (
                <div>{error.data.error}</div>
            )}
            {isSuccess && (
                <div>{data.message}</div>
            )}  
            <HStack gap={8}>
                <Input 
                    type="text"
                    value={sampleNameInputValue}
                    onChange={handleNameChange}
                    placeholder="Название шаблона" />
                <Button onClick={handleSave}>
                    {isLoading ? 'Сохранение...' : 'Cохранить'}
                </Button>
            </HStack>          
        </VStack>
    );
};
