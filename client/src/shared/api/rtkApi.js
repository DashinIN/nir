import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token'); 
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Samples', 'Orgs'],
    endpoints: () => ({}),
});
