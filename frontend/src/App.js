import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Context} from './Context';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <Context.Provider value={{userId, setUserId, token, setToken}}>
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
