import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader';
import { routeConfig } from './config';
import { useAuth } from '@/entities/User/hooks/useAuth';
import AngryCat from '@/shared/assets/1.jpg';

export const AppRouter = () => {
    const { isAuth, role } = useAuth();

    return (
        <Routes>
            {routeConfig.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <Suspense fallback={<Loader />}>
                            {(route.path === '/' || isAuth) && (!route.roles || route.roles.includes(role)) ? (
                                route.element
                            ) : (
                                <Navigate to="/error" replace />
                            )}
                        </Suspense>
                    }
                />
            ))}
            <Route path="/error" element={<div>НЕЛЬЗЯ!!!!<img width={500} src={AngryCat} /></div>} />
        </Routes>
    );
};