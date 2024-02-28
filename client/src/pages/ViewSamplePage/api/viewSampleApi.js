import { rtkApi } from '@/shared/api/rtkApi';

const viewSampleApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getFilterValues: builder.query({
            query: (filters) => ({
                url: 'api/orgs/values',
                method: 'POST',
                body: { filters },
            })
        }),
        getFilteredOrgs: builder.query({
            query: (filters) => ({
                url: 'api/orgs/filter', // Путь к вашему эндпоинту
                method: 'POST',
                body: { filters }, // Передача фильтров в теле запроса
            }),
        }),
    }),
});

export const useGetFilterValues = viewSampleApi.useGetFilterValuesQuery;
export const useGetFilteredOrgs = viewSampleApi.useLazyGetFilteredOrgsQuery;
