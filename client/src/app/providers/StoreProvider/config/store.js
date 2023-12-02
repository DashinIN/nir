import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '@/entities/Counter';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './ReducerManager';
import { sampleReducer } from '@/entities/Sample/model/slice/sampleSlice';

export function createReduxStore(initialState, asyncReducers) {
    const rootReducers = {
        ...asyncReducers,
        counter: counterReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
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

