import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss';

function App() {

    return (
        <>
            <Navbar/>
            <AppRouter />
        </>
    );
}

export default App;