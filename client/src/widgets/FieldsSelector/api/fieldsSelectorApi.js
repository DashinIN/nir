import { rtkApi } from '@/shared/api/rtkApi';

const fieldsSelectorApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTitles: builder.query({
            query: () => 'getAllTitles', 
        }),
    }),
});

export const useAllTitles = fieldsSelectorApi.useGetAllTitlesQuery;