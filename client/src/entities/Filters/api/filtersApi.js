import { rtkApi } from '@/shared/api/rtkApi';

const filtersApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getFilterValues: builder.query({
            query: (filters) => ({
                url: '/orgs/values',
                method: 'POST',
                body: { filters },
            })
        }),
    }),
});

export const useGetFilterValues = filtersApi.useGetFilterValuesQuery;
