import { rtkApi } from '@/shared/api/rtkApi';

const sampleApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        addSample: builder.mutation({
            query: (data) => ({
                url: 'addSample',
                method: 'POST',
                body: data,
            }), 
        }),
        getAllSamples: builder.query({
            query: () => 'getAllSamples', 
        }),
    }),
});


export const useAddSample = sampleApi.useAddSampleMutation;
export const useAllSamples = sampleApi.useGetAllSamplesQuery;