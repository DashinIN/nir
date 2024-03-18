import { rtkApi } from '@/shared/api/rtkApi';

const viewSampleApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        getSampleFieldsHeaders: builder.query({
            query: (selectedSampleId) => ({
                url: '/orgs/sampleFieldsTitles',
                method: 'POST',
                body: { selectedSampleId },
            })
        }),
        getFilteredOrgs: builder.query({
            query: (req) => ({
                url: '/orgs/filter', 
                method: 'POST',
                body: req
            }),
        }),
        getFilteredOrgsCount: builder.query({
            query: (filters) => ({
                url: '/orgs/filterCount',
                method: 'POST',
                body: { filters }
            }),
        }),
        editOrgRecord: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/orgs/record/${id}`,
                method: 'PUT',
                body: updatedData
            })
        }),
        deleteOrgRecord: builder.mutation({
            query: (id) => ({
                url: `/orgs/record/${id}`,
                method: 'DELETE'
            })
        })
    }),
});

export const useGetSampleFieldsHeaders = viewSampleApi.useGetSampleFieldsHeadersQuery;
export const useGetFilteredOrgs = viewSampleApi.useGetFilteredOrgsQuery;
export const useGetFilteredOrgsCount = viewSampleApi.useGetFilteredOrgsCountQuery;
export const useEditOrgRecord = viewSampleApi.useEditOrgRecordMutation;
export const useDeleteOrgRecord = viewSampleApi.useDeleteOrgRecordMutation;