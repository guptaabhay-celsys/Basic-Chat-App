import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMessages from './components/AdminMessages';
import UserMessages from './components/UserMessages';
import { useEffect } from 'react';
import TextWindow from './components/TextWindow';

function App() {
  const [adminMessages, setAdminMessages] = React.useState([]);
  const [userMessages, setUserMessages] = React.useState([]);

  useEffect(() => {
    const storedAdminMessages = JSON.parse(localStorage.getItem('adminMessages')) || [];
    const storedUserMessages = JSON.parse(localStorage.getItem('userMessages')) || [];    

    setAdminMessages(storedAdminMessages); 
    setUserMessages(storedUserMessages);
  }, [])

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route index = {true} element={<AdminMessages adminMessages={adminMessages} setUserMessages={setUserMessages} userMessages={userMessages} />} />
          <Route path="/user" element={<UserMessages userMessages={userMessages} setAdminMessages={setAdminMessages} adminMessages={adminMessages} />} />
        </Routes>
      </BrowserRouter> */}

      {/* <AdminMessages adminMessages={adminMessages} setUserMessages={setUserMessages} userMessages={userMessages} />
      <UserMessages userMessages={userMessages} setAdminMessages={setAdminMessages} adminMessages={adminMessages} /> */}
      <TextWindow />
    </>

    
  )
}

export default App
