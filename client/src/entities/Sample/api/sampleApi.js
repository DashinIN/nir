import { rtkApi } from '@/shared/api/rtkApi';

const sampleApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getAllSamples: builder.query({
            query: () => '/samples', 
        }),
        getSample: builder.query({
            query: (id) => `/samples/${id}`,
        }),
        addSample: builder.mutation({
            query: (data) => ({
                url: '/samples',
                method: 'POST',
                body: data,
            }), 
        }),
        editSample: builder.mutation({
            query: ({ id, data }) => ({
                url: `/samples/${id}`,
                method: 'PUT',
                body: data,
            }), 
        }),
        deleteSample: builder.mutation({
            query: (id) => ({
                url: `/samples/${id}`,
                method: 'DELETE',
            }), 
        }),
    }),
});

export const useAllSamples = sampleApi.useGetAllSamplesQuery;
export const useSample = sampleApi.useGetSampleQuery;
export const useAddSample = sampleApi.useAddSampleMutation;
export const useEditSample = sampleApi.useEditSampleMutation;
export const useDeleteSample = sampleApi.useDeleteSampleMutation;