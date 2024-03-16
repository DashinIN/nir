import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SampleSelector, sampleReducer } from '@/entities/Sample';

const initialReducers = {
    sample: sampleReducer,
};

const ChangeSamplePage = () => {
    return (
        <DynamicModuleLoader 
            reducers={initialReducers}
            removeAfterUnmount={false}
        >
            <Page>
                <VStack gap={16} max>
                    <SampleSelector />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSamplePage;