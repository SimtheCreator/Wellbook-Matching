import React from 'react';
import { Routes, Route } from 'react-router';
import WellnistaAssessment from './pages/WellnistaAssessment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WellnistaAssessment />} />
    </Routes>
  );
}

export default App;
