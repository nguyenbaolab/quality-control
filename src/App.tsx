import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Admin from './admin/Admin';
import Reviewer from './reviewer/Reviewer';
import Builder from './builder/Builder';
import { TaskProvider } from './TaskContext'; // Import TaskProvider để quản lý trạng thái tác vụ

// Định nghĩa kiểu User
interface User {
  Name: string;
  Username: string;
  Password: string;
}

function App() {
  const [data, setData] = useState<User[]>([]); // Sử dụng kiểu User

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => {
        console.log('Response status:', res.status); // Log status response
        return res.json();
      })
      .then(data => {
        console.log('Data fetched:', data); // Log dữ liệu nhận được
        setData(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <TaskProvider> {/* Bọc ứng dụng với TaskProvider để cung cấp trạng thái chung */}
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <header className="bg-light text-center py-3">
          <h1>Welcome to My Application</h1>
        </header>

        {/* Bảng UsersDatabase */}
        <div>
          <table>
            <thead>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.Name}</td>
                  <td>{d.Username}</td>
                  <td>{d.Password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Main */}
        <main className="flex-fill">
          <Routes>
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
