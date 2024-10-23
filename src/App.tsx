import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Admin from './admin/Admin';
import Reviewer from './reviewer/Reviewer';
import Builder from './builder/Builder';
import LandingPage from './LandingPage';
import { TaskProvider } from './TaskContext'; // Import TaskProvider để quản lý trạng thái tác vụ

function App() {
  return (
    <TaskProvider> {/* Bọc ứng dụng với TaskProvider để cung cấp trạng thái chung */}
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <header className="bg-light text-center py-3">
          <h1>Welcome to My Application</h1>
        </header>

        {/* Main */}
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="/landingpage" replace />} /> {/* Chuyển hướng về LandingPage */}
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reviewer" element={<Reviewer />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light text-center py-3">
          <p>&copy; 2024 My Application. All rights reserved.</p>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
