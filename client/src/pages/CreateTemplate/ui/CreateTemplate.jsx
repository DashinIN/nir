import { useQuery } from 'react-query';
import { useState } from 'react';
import { ReorderList } from '@/widgets/ReorderList';
import { FieldsSelector } from '@/widgets/FieldsSelector';
import { fetchAllTitles } from '@/shared/api/queries';
import { SaveSample } from '@/features/SaveSample/';
import { Loader } from '@/shared/ui/Loader';
import { Page } from '@/widgets/Page';

const CreateTemplate = () => {
    const [items, setItems] = useState([]);
    const { data: fields, isLoading} = useQuery('titles', fetchAllTitles);
    
    if (isLoading) {
        return <Loader />;
    }

    return (
        <Page>  
            <FieldsSelector 
                fields={fields} 
                items={items} 
                setItems={setItems}
            />
            { Boolean(items.length) && (
                <>
                    <h2>Выберете порядок полей</h2>
                    <ReorderList items={items} setItems={setItems}/>
                    <div>Порядок полей: {items.join(', ').toLowerCase()}</div>
                    <SaveSample items={items}/>
                </>
            )}
        </Page>
    );
};

export default CreateTemplate;