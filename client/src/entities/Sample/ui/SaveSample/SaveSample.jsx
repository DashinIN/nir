import { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAddSample } from '../../api/sampleApi';
import SaveIcon from '@/shared/assets/save.svg';
import s from './SaveSample.module.scss';
import { useNavigate } from 'react-router-dom';

export const SaveSample = ({items}) => {
    const [sampleNameInputValue, setSampleNameInputValue] = useState('');
    const navigate = useNavigate();
    const [addSample, {isSuccess, isError, error} ] = useAddSample();

    useEffect(() => {
        if (isError) {
            message.error(error.data.error);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            message.success(`Шаблон ${sampleNameInputValue} успешно сохранен.`);
            setSampleNameInputValue('');
            navigate('/changeSample');
        }
    }, [isSuccess, navigate, sampleNameInputValue]);

    const handleNameChange = (event) => {
        setSampleNameInputValue(event.target.value);
    };

    const handleSave = async () => {
        if (!(sampleNameInputValue.trim() !== '' && items)) {
            message.error('Введите название и содержимое шаблона.');
            return;
        }

        const sampleData = { name: sampleNameInputValue, items };
        await addSample(sampleData);
    };

    return (
        <VStack gap={8} align='center'>
            <h2>Сохранение шаблона</h2>
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
                    Cохранить
                    <SaveIcon />
                </Button>
            </HStack>          
        </VStack>
    );
};
