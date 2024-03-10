import { Suspense } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from './providers/router/AppRouter';
import { useCheck } from '@/entities/User/api/userApi';
import './styles/index.scss';
import { Loader } from '@/shared/ui/Loader';

function App() {

    const {isLoading } = useCheck();

    if(isLoading) {
        return <Loader />;
    }

    return (
        <div className='app'>
            <Suspense fallback="">
                <h1>Приложение для работы с реестром организаций</h1>
                <Navbar />
                <AppRouter />
            </Suspense>
        </div>
    );
}

export default App;