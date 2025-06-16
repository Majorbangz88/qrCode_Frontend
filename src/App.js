import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QrPage from './components/qrPage';
import MoviesPage from './components/moviesPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<QrPage />} />
          <Route path="/movies/:uuid" element={<MoviesPage />} />
        </Routes>
      </Router>
  );
}

export default App;
