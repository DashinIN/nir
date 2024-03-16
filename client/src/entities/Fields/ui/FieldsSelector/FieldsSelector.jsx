import { FieldsList } from '../FieldsList/FieldsList';
import { useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAllTitles } from '../../api/fieldsSelectorApi';
import { Search } from '@/widgets/Search/ui/Search';
import { Button } from 'antd';

export const FieldsSelector = ({ items, setItems}) => {
    const { data: fields = [], isLoading } = useAllTitles();

    const [searchValue, setSearchValue] = useState('');

    const filteredFields = fields.filter(field => 
        field && field.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    const resetItems = () => {
        setItems([]);
    };

    if (isLoading) {
        return null;
    }

    return (
        <VStack gap={8} max>
            <HStack justify='between' max>
                <h2>Выбор полей шаблона</h2>
                <HStack gap='8'>
                    <Search 
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <Button onClick={resetItems}>Сброс полей</Button>
                </HStack>
            </HStack>
            {
                filteredFields.length ? (
                    <FieldsList 
                        fields={filteredFields}
                        items={items}
                        setItems={setItems}
                    />

                ) : (
                    <p>Такого поля нет</p>
                )
            }
            
        </VStack>
    );
};
