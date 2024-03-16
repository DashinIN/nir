import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';
import { ReorderList } from '@/widgets/ReorderList';


const initialReducers = {
    fields: fieldsReducer,
};

const ChangeSampleFieldsOrderPage = () => {
    const dispatch = useDispatch();
    const fields = useSelector(getFields) || [];

    const handleSelectedFields = (selectedFields) => {
        console.log(selectedFields);
        dispatch(fieldsActions.setFields(selectedFields));
    };

    const handleChange = (item, value) => {
        const newData = {
            name: item.name, 
            rights: value
        };
        console.log(newData);
        dispatch(fieldsActions.updateField(newData));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                { fields.length ? (
                    <ReorderList
                        fields={fields} 
                        setFields={handleSelectedFields}
                        handleChange={handleChange}
                    />
                ) : (
                    <div>Поля не выбраны</div>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSampleFieldsOrderPage;