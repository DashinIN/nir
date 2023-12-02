import { FileOutput } from '@/features/FileOutput';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';


const initialReducers = {
    sample: sampleReducer,
};

const UseSamplePage = () => {
    
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <Page>
                <VStack gap={16} max>
                    <FileOutput />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default UseSamplePage;