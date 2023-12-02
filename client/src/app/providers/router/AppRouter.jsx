import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTemplate from '@/pages/CreateTemplate';
import UseTemplate from '@/pages/UseTemplate';
import MainPage from '@/pages/MainPage';
import ChangeSample from '@/pages/ChangeSample';
import { Loader } from '@/shared/ui/Loader';


export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path={'/'}
                element={
                    <Suspense fallback={<Loader />}>
                        <MainPage />
                    </Suspense>}
            />
            <Route
                path={'/createTemplate'}
                element={
                    <Suspense fallback={<Loader />}>
                        <CreateTemplate />
                    </Suspense>}
            />
            <Route
                path={'/changeSample'}
                element={
                    <Suspense fallback={<Loader />}>
                        <ChangeSample />
                    </Suspense>
                }
            />
            <Route
                path={'/useTemplate'}
                element={
                    <Suspense fallback={<Loader />}>
                        <UseTemplate />
                    </Suspense>
                }
            />
        </Routes>
    );
};
