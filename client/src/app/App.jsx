/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import './styles/index.scss';
import CreateTemplate from '@/pages/CreateTemplate/CreateTemplate';
import UseTemplate from '@/pages/UseTemplate/UseTemplate';


function App() {
    const [items, setItems] = useState([]);

    return (
        <div className="App">
            <NavLink
                to="/CreateTemplate"
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                CreateTemplate
            </NavLink>
            <NavLink
                to="/UseTemplate"
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                UseTemplate
            </NavLink>
            <Routes>
                <Route
                    path={'/CreateTemplate'}
                    element={<CreateTemplate items={items} setItems={setItems}/>}
                />
                <Route
                    path={'/UseTemplate'}
                    element={<UseTemplate items={items}/>}
                />
            </Routes>
        </div>
    );
}

export default App;