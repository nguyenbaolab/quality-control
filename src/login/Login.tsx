import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Hardcoded admin credentials for demonstration purposes
    const adminEmail = 'admin';
    const adminPassword = 'admin123';

    // Check if the email and password match the hardcoded credentials
    if (email === adminEmail && password === adminPassword) {
      alert('Logging in...');
      navigate('/admin'); 
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Header">
          <h2>Please sign in</h2>
        </div>
        <div className="form-group">
          <label htmlFor="InputUser">Email address</label>
          <input
            type="user"
            className="form-control" 
            id="InputUser"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
