import { FileOutput } from '@/features/FileOutput';
import { useState } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { SampleSelector } from '@/entities/Sample/ui/SampleSelector/SampleSelector';

const UseTemplate = () => {
    const [selectedSample, setSelectedSample] = useState(0);
    
    return (
        <Page>
            <VStack gap={16} max>
                <SampleSelector 
                    selectedSample={selectedSample}
                    setSelectedSample={setSelectedSample}
                />
                <FileOutput 
                    selectedSample={selectedSample}
                />
            </VStack>
        </Page>
    );
};

export default UseTemplate;