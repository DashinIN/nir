import { rtkApi } from '@/shared/api/rtkApi';

const sampleApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getAllSamples: builder.query({
            query: () => 'api/samples', 
        }),
        addSample: builder.mutation({
            query: (data) => ({
                url: 'api/samples',
                method: 'POST',
                body: data,
            }), 
        }),
    }),
});


export const useAddSample = sampleApi.useAddSampleMutation;
export const useAllSamples = sampleApi.useGetAllSamplesQuery;