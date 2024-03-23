import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';
import { getSelectedSample } from '@/entities/Sample';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import { filtersReducer } from '@/entities/Filters/model/slice/FiltersSlice';
import { Filters } from '@/entities/Filters/ui/Filters/Filters';
import { OrgsTable } from '@/features/OrgsTable';

const initialReducers = {
    sample: sampleReducer,
    filters: filtersReducer
};


const ViewSamplePage = () => {
   
    const selectedSampleId = useSelector(getSelectedSample); 
        
    if(!selectedSampleId) {
        return (<div>Шаблон не выбран</div>);
    }
    return (
        <DynamicModuleLoader 
            removeAfterUnmount={false}  
            reducers={initialReducers}
        >
            <VStack gap='32' max>
                <Filters />
                <OrgsTable />
            </VStack>
        </DynamicModuleLoader>
    );
};

export default ViewSamplePage;