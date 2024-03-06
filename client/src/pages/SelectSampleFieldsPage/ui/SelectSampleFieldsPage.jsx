import { useDispatch, useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { FieldsSelector, fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';

const initialReducers = {
    fields: fieldsReducer,
};

const SelectSampleFieldsPage = () => {
    const dispatch = useDispatch();
    const fields = useSelector(getFields) || [];

    const handleSelectedFields = (selectedFields) => {
        dispatch(fieldsActions.setFields(selectedFields));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                <FieldsSelector 
                    items={fields} 
                    setItems={handleSelectedFields}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default SelectSampleFieldsPage;