import { rtkApi } from '@/shared/api/rtkApi';

const fileOutputApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getSelectedSampleData: builder.mutation({
            query: (selectedSampleTitles) => ({
                url: '/getSelectedSampleData',
                method: 'POST',
                body: selectedSampleTitles,
            }),
        }),
    }),
});

export const useGetSelectedSampleData = fileOutputApi.useGetSelectedSampleDataMutation;
