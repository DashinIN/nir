import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token'); 
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    
    endpoints: () => ({}),
});
