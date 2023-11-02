/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import './styles/index.scss';
import CreateTemplate from '@/pages/CreateTemplate/CreateTemplate';
import UseTemplate from '@/pages/UseTemplate/UseTemplate';

function App() {
    const [items, setItems] = useState([]);

    return (
        <div className="App">
            <CreateTemplate 
                items={items}
                setItems={setItems}
            />
            <UseTemplate
                items={items}
            />
        </div>
    );
}

export default App;