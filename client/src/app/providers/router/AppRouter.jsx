import { Route, Routes } from 'react-router-dom';
import CreateTemplate from '@/pages/CreateTemplate/CreateTemplate';
import UseTemplate from '@/pages/UseTemplate/UseTemplate';

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                index
                path={'/createTemplate'}
                element={<CreateTemplate/>}
            />
            <Route
                path={'/useTemplate'}
                element={<UseTemplate />}
            />
        </Routes>
    );
};
