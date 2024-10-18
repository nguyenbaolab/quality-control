import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Admin from './admin/Admin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} /> {/* Admin route */}
    </Routes>
  );
}

export default App;
