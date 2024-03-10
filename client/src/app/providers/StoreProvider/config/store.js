import { configureStore } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './ReducerManager';
import {userReducer} from '@/entities/User/model/slice/userSlice';

export function createReduxStore(initialState, asyncReducers) {
    const rootReducers = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(rtkApi.middleware),
    });
    store.reducerManager = reducerManager;

    return store;
}

