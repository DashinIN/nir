import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '@/entities/Counter';
import { createReducerManager } from './ReducerManager';

export function createReduxStore(initialState, asyncReducers) {
    const rootReducers = {
        ...asyncReducers,
        counter: counterReducer,
    };

    const reducerManager = createReducerManager(rootReducers);


    const store = configureStore({
        reducer: reducerManager.reduce,
        preloadedState: initialState,
    });
    store.reducerManager = reducerManager;

    return store;
}

