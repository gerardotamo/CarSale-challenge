import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
