import { useDispatch, useSelector } from 'react-redux';
import { ReorderList } from '@/widgets/ReorderList';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { SaveSample } from '@/entities/Sample';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { FieldsSelector, fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';

const initialReducers = {
    fields: fieldsReducer,
};

const CreateSamplePage = () => {
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
                            <h2>Выбор порядка полей шаблона</h2>
                            <VStack gap={8} max align='center'>
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

export default CreateSamplePage;