import { ReorderList } from '@/widgets/ReorderList';
import { FieldsSelector } from '@/widgets/FieldsSelector';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { SaveSample } from '@/entities/Sample';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer } from '@/entities/Fields/model/slice/fieldsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFields } from '@/entities/Fields/model/selectors/getFields';


const initialReducers = {
    fields: fieldsReducer,
};

const CreateTemplate = () => {
    const dispatch = useDispatch();
    const fields = useSelector(getFields) || [];

    const handleSelectedFields = (selectedFields) => {
        dispatch(fieldsActions.setFields(selectedFields));
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Page>  
                <VStack gap={16}>
                    <FieldsSelector 
                        items={fields} 
                        setItems={handleSelectedFields}
                    />
                    { Boolean(fields.length) && (
                        <>
                            <VStack gap={8} max>
                                <h2>Выберете порядок полей</h2>
                                <ReorderList 
                                    items={fields} 
                                    setItems={handleSelectedFields}
                                />
                            </VStack>
                            <SaveSample items={fields}/>
                        </>
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default CreateTemplate;