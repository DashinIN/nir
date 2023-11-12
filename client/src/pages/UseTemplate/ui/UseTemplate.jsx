import { FileOutput } from '@/features/FileOutput';
import { SampleSelector } from '@/widgets/SampleSelector';
import { getAllSamples } from '@/shared/api/queries';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '@/shared/ui/Loader';

const UseTemplate = () => {
    const [selectedSample, setSelectedSample] = useState(0);
    const { data, isLoading } =  useQuery('getAllSamples', getAllSamples);

    if(isLoading) {
        return <Loader />;
    }

    return (
        <>
            <SampleSelector 
                data={data}
                selectedSample={selectedSample}
                setSelectedSample={setSelectedSample}
            />
            <FileOutput 
                data={data}
                selectedSample={selectedSample}
            />
        </>
    );
};

export default UseTemplate;