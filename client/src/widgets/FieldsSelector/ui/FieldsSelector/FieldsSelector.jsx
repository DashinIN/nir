import { Button } from '@/shared/ui/Button';
import { FieldsList } from '../FieldsList/FieldsList';
import { useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAllTitles } from '../../api/fieldsSelectorApi';

export const FieldsSelector = ({ items, setItems}) => {
    const { data: fields = [], isLoading } = useAllTitles();

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

    if (isLoading) {
        return <div>загрузка</div>;
    }

    return (
        <VStack gap={8} max>
            <h2>Отметьте требуемые поля</h2>
            <HStack gap={4}>
                <Input 
                    placeholder='Поиск поля' 
                    type="text" 
                    value={searchValue}
                    onChange={searchHandler}
                />
                <Button onClick={resetSearchHandler}>
                    Сбросить
                </Button>
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
