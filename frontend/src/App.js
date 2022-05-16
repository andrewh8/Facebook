import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from './Context';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import './styles/App.css';

function App() {

  const [user, setUser] = useState('');

  return (
    <Context.Provider value={{user, setUser}}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/profile' element={<Profile />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
