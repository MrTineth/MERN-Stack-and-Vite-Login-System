import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {console.log(result)
      navigate('/login')
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
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
          Register
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Log In ?</a>
      </p>
    </form>
  );
}
