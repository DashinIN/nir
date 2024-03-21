import { FileOutput } from '@/features/FileOutput';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { filtersReducer } from '@/entities/Filters/model/slice/FiltersSlice';


const initialReducers = {
    sample: sampleReducer,
    filters: filtersReducer
};

const UseSamplePage = () => {
    
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <VStack gap={16} max>
                <FileOutput />
            </VStack>
        </DynamicModuleLoader>
    );
};

export default UseSamplePage;