import { useQuery } from 'react-query';
import { ReorderList } from '../../shared/ui/ReorderList/ReorderList';
import { FieldsSelector } from '../../widgets/FieldsSelector/FieldsSelector';
import { fetchAllTitles } from '../../shared/api/queries';

const CreateTemplate = ({items, setItems}) => {
    const { data: fields, isLoading} = useQuery('titles', fetchAllTitles);
    
    if (isLoading) {
        return <div>Загрузка полей...</div>;
    }

    return (
        <>
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
                </>
            )}
        </>
    );
};

export default CreateTemplate;