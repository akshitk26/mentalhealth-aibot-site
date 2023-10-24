import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import OpenAIComponent from './OpenAIComponent';
import AboutPage from './AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/" element={<OpenAIComponent />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;