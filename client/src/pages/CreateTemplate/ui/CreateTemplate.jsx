import { useQuery } from 'react-query';
import { useState } from 'react';
import { ReorderList } from '@/widgets/ReorderList';
import { FieldsSelector } from '@/widgets/FieldsSelector';
import { fetchAllTitles } from '@/shared/api/queries';
import { SaveSample } from '@/features/SaveSample/';
import { Loader } from '@/shared/ui/Loader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';

const CreateTemplate = () => {
    const [items, setItems] = useState([]);
    const { data: fields, isLoading} = useQuery('titles', fetchAllTitles);
    
    if (isLoading) {
        return <Loader />;
    }

    return (
        <Page>  
            <VStack gap={16}>
                <FieldsSelector 
                    fields={fields} 
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