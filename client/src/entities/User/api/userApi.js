import { rtkApi } from '@/shared/api/rtkApi';

const userApi = rtkApi.injectEndpoints({ 
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (userData) => ({
                url: '/user/registration',
                method: 'POST',
                body: userData,
            }),
        }),
        login: builder.mutation({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData,
            }),
        }),
        check: builder.query({
            query: () => '/user/check',
        }),
    }),
});


export const useRegistration = userApi.useRegistrationMutation;
export const useLogin = userApi.useLoginMutation;