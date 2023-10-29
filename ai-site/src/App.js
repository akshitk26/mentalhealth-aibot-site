import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import OpenAIComponent from './OpenAIComponent';
import AboutPage from './AboutPage';
import Login from './Login';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/" element={<OpenAIComponent />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;