import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          axios.get(`http://localhost:3001/user/${email}`)
            .then(userResult => {
              localStorage.setItem('userName', userResult.data.name);
              navigate('/home');
            })
            .catch(err => console.log(err));
        } else {
          console.log(result.data);  // Handle other responses
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register?</a>
      </p>
    </form>
  );
}
