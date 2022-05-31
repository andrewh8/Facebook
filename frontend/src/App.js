import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Friends from './components/Friends/Friends';
import Profile from './components/Profile/Profile';
import Notifications from './components/Notifications/Notifications';
import './App.css';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/friends' element={<Friends />}/>
            <Route path='/profile/:id' element={<Profile />}/>
            <Route path='/notifications' element={<Notifications />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
