import { FileOutput } from '@/features/FileOutput';
import { useState } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { SampleSelector } from '@/entities/Sample/ui/SampleSelector/SampleSelector';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';


const initialReducers = {
    sample: sampleReducer,
};

const UseTemplate = () => {
    
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Page>
                <VStack gap={16} max>
                    <SampleSelector />
                    <FileOutput />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default UseTemplate;