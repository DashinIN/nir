import { Navbar } from '@/widgets/Navbar/Navbar';
import './styles/index.scss';
import { AppRouter } from './providers/router/AppRouter';

function App() {

    return (
        <div className="App">
            <Navbar/>
            <AppRouter />
        </div>
    );
}

export default App;