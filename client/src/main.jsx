import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { StyleConfigProvider } from './app/providers/StyleConfigProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <BrowserRouter>
            <StyleConfigProvider>
                <App/>
            </StyleConfigProvider>
        </BrowserRouter>
    </StoreProvider>
);
