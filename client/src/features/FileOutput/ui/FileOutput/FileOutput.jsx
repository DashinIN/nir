import { VStack } from '@/shared/ui/Stack';
import { Filters } from '@/entities/Filters/ui/Filters/Filters';

export const FileOutput = () => {
   
 

    return (
        <VStack gap={8} max align={'center'}>
            <Filters />
        </VStack>
    );
};
