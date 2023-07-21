import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';



import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss'

export const SearContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('')



  return (
    <div className="wrapper"> 
      <SearContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className="content">
            <Routes>
              <Route path="" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
      </SearContext.Provider>
  </div>
  );
}

export default App;
