import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Admin from './admin/Admin';
import Reviewer from './reviewer/Reviewer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
    {/* Header */}
    <header className="bg-light text-center py-3">
      <h1>Welcome to My Application</h1>
    </header>

    {/* Main */}
    <main className="flex-fill">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reviewer" element={<Reviewer />} />
      </Routes>
    </main>

    {/* Footer */}
    <footer className="bg-light text-center py-3">
      <p>&copy; 2024 My Application. All rights reserved.</p>
    </footer>
  </div>
  );
}

export default App;
