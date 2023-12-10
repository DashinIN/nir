import { Suspense } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss';

function App() {

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