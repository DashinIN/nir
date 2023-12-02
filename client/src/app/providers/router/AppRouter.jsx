import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader';
import { routeConfig } from './config';

export const AppRouter = () => {
    return (
        <Routes>
            {routeConfig.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <Suspense fallback={<Loader />}>
                            {route.element}
                        </Suspense>}
                />
            ))}
        </Routes>
    );
};
