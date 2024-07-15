import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import SignUp from  './components/SignUp';
import UserNotes from './components/UserNotes';
import Addnote from './components/Addnote';

function App() {
  
  return (
    <NoteState>

    <Router>
      <Navbar />
        
        <Routes>
          <Route path="/" element={<Addnote />} />
          <Route path='/usernotes' element={<UserNotes />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        

    </Router>
   

    </NoteState>

  );
}



export default App;
