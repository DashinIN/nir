import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import {jwtDecode} from 'jwt-decode';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload || {};
            state.isAuth = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, action) => {
                localStorage.setItem('token', action.payload.token);
                const userData = jwtDecode(action.payload.token);
                state.user = userData;
                state.isAuth = !!userData;
            },
        );
        builder.addMatcher(
            userApi.endpoints.check.matchFulfilled,
            (state, action) => {
                localStorage.setItem('token', action.payload.token);
                const userData = jwtDecode(action.payload.token);
                state.user = userData;
                state.isAuth = !!userData;
            },
        );
    },
});



export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
