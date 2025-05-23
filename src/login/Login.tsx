import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Tạo hàm điều hướng
  const [user, setUser] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    try {
      const response = await axios.post('http://localhost:8081/login', { //Gửi thông tin đăng nhập đến backend
        username: user, 
        password: password 
      });

      // Nếu đăng nhập thành công, điều hướng đến trang dựa trên vai trò
      const { Name } = response.data; // Lấy tên người dùng từ phản hồi rồi so sánh để đăng nhập
        if (Name === 'Admin') {
            alert('Logging in as Admin...');
            navigate('/admin');
        } else if (Name === 'Builder') {
            alert('Logging in as Builder...');
            navigate('/builder');
        } else if (Name === 'Reviewer') {
            alert('Logging in as Reviewer...');
            navigate('/reviewer');
        } else {
            alert('Invalid username or password');
        }
    } catch (err) {
        alert('Invalid username or password');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Header">
          <h2>Please Log in</h2>
        </div>
        <div className="form-group">
          <label htmlFor="InputUser">Username</label>
          <input
            type="user"
            className="form-control" 
            id="InputUser"
            aria-describedby="emailHelp"
            placeholder="Enter User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            className="form-control" 
            id="InputPassword"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input" 
            id="Check"
          />
          <label className="form-check-label" htmlFor="Check">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    </div>
  );
}

export default Login;
