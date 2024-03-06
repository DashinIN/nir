import { useDispatch, useSelector } from 'react-redux';
import { ReorderList } from '@/widgets/ReorderList';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsActions, fieldsReducer, getFields } from '@/entities/Fields';

const initialReducers = {
    fields: fieldsReducer,
};

const ChangeSampleFieldsOrderPage = () => {
    const dispatch = useDispatch();
    const fields = useSelector(getFields) || [];

    const handleSelectedFields = (selectedFields) => {
        dispatch(fieldsActions.setFields(selectedFields));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                { fields.length ? (
                    <>  
                        <VStack gap={8} max align='center'>
                            <h2>Выбор порядка полей шаблона</h2>
                            <ReorderList 
                                items={fields} 
                                setItems={handleSelectedFields}
                            />
                        </VStack>
                    </>
                ) : (
                    <div>Поля не выбраны</div>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSampleFieldsOrderPage;