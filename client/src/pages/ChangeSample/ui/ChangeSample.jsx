import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SampleSelector, sampleReducer } from '@/entities/Sample';

const initialReducers = {
    sample: sampleReducer,
};

const ChangeSample = () => {
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false} 
            reducers={initialReducers}
        >
            <Page>
                <VStack gap={16} max>
                    <SampleSelector />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ChangeSample;