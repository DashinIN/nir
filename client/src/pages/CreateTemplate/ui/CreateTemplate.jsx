import { ReorderList } from '@/widgets/ReorderList';
import { FieldsSelector } from '@/widgets/FieldsSelector';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { useState } from 'react';
import { SaveSample } from '@/entities/Sample';

const CreateTemplate = () => {
    const [items, setItems] = useState([]);
    
    return (
        <Page>  
            <VStack gap={16}>
                <FieldsSelector 
                    items={items} 
                    setItems={setItems}
                />
                { Boolean(items.length) && (
                    <>
                        <VStack gap={8} max>
                            <h2>Выберете порядок полей</h2>
                            <ReorderList items={items} setItems={setItems}/>
                        </VStack>
                        <SaveSample items={items}/>
                    </>
                )}
            </VStack>
        </Page>
    );
};

export default CreateTemplate;