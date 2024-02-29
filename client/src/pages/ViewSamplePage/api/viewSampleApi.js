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
        getSampleFieldsHeaders: builder.query({
            query: (selectedSampleId) => ({
                url: 'api/orgs/sampleFieldsTitles',
                method: 'POST',
                body: { selectedSampleId },
            })
        }),
        getFilteredOrgs: builder.query({
            query: ({ filters, selectedSampleId, page, pageSize }) => ({
                url: 'api/orgs/filter', // Путь к вашему эндпоинту
                method: 'POST',
                body: { filters, selectedSampleId, page, pageSize }// Передача фильтров в теле запроса
            }),
        }),
        getFilteredOrgsCount: builder.query({
            query: (filters) => ({
                url: 'api/orgs/filterCount', // Путь к вашему эндпоинту
                method: 'POST',
                body: { filters }// Передача фильтров в теле запроса
            }),
        }),
    }),
});

export const useGetFilterValues = viewSampleApi.useGetFilterValuesQuery;
export const useGetSampleFieldsHeaders = viewSampleApi.useGetSampleFieldsHeadersQuery;
export const useGetFilteredOrgs = viewSampleApi.useGetFilteredOrgsQuery;
export const useGetFilteredOrgsCount = viewSampleApi.useGetFilteredOrgsCountQuery;
