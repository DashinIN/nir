import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { SaveSample } from '@/entities/Sample';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fieldsReducer, getFields } from '@/entities/Fields';
import { VStack } from '@/shared/ui/Stack';

const initialReducers = {
    fields: fieldsReducer,
};

const SaveSamplePage = () => {
    const fields = useSelector(getFields) || [];

    return (
        <DynamicModuleLoader  reducers={initialReducers} removeAfterUnmount={false}>
            <Page>  
                <VStack gap={8} max align='center'>
                    { fields.length ? (
                        <SaveSample items={fields}/>
                    ) : (
                        <div>Нет выбранных полей</div>
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default SaveSamplePage;