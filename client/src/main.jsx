import ReactDOM from 'react-dom/client';
import App from './app/App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render( 
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
