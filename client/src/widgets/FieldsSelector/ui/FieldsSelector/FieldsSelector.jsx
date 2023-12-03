import { FieldsList } from '../FieldsList/FieldsList';
import { useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAllTitles } from '../../api/fieldsSelectorApi';
import { Search } from '@/widgets/Search/ui/Search';

export const FieldsSelector = ({ items, setItems}) => {
    const { data: fields = [], isLoading } = useAllTitles();

    const [searchValue, setSearchValue] = useState('');

    const filteredFields = fields.filter(field => 
        field.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (isLoading) {
        return null;
    }

    return (
        <VStack gap={8} max>
            <HStack justify='between' max>
                <h2>Отметьте требуемые поля шаблона</h2>
                <Search 
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
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
