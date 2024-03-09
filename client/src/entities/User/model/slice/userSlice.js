import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
    },
});



export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
