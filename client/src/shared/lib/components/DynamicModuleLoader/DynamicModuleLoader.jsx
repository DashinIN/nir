import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export const DynamicModuleLoader = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        console.log('DynamicModuleLoader useEffect');
        const mountedReducers = store.reducerManager.getMountedReducers();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name];
            if (!mounted) {
                store.reducerManager.add(name, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            { children }
        </>

    );
};
