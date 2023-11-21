import { Suspense } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss';

function App() {

    return (
        <div className='app'>
            <Suspense fallback="">
                <Navbar />
                <AppRouter />
            </Suspense>
        </div>
    );
}

export default App;