import { rtkApi } from '@/shared/api/rtkApi';

const fieldsSelectorApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTitles: builder.query({
            query: () => 'orgs/titles', 
        }),
    }),
});

export const useAllTitles = fieldsSelectorApi.useGetAllTitlesQuery;