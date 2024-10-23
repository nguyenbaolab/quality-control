import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [user, setUser] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Hardcoded admin credentials for demonstration purposes
    const adminUser = 'admin';
    const adminPassword = 'admin123';

    // Check if the email and password match the hardcoded credentials
    if (user === adminUser && password === adminPassword) 
    {
      alert('Logging in...');
      navigate('/admin'); 
    } 
    else 
    {
      alert('Invalid user or password');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Header">
          <h2>Please Log in</h2>
        </div>
        <div className="form-group">
          <label htmlFor="InputUser">User Name</label>
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
