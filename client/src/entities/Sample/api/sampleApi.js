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
    }),
});

export const useAddSample = sampleApi.useAddSampleMutation;