import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Home from './components/Home';
import About from './components/About';



function App() {
  return (
    <NoteState>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
    </NoteState>
  );
}

// const Home = () => <div className="p-4">Home Page</div>;
// const About = () => <div className="p-4">About Page</div>;

export default App;
