import React, { useState } from 'react'; // Import React and useState
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Hardcoded admin credentials for demonstration purposes
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    // Check if the email and password match the hardcoded credentials
    if (email === adminEmail && password === adminPassword) {
      alert('Logging in...'); // Alert for logging in
      navigate('/admin'); // Navigate to the admin route
    } else {
      alert('Invalid email or password'); // Alert for invalid credentials
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Header">
          <h2>Please sign in</h2>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control" 
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control" 
            id="exampleInputPassword1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input" 
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
