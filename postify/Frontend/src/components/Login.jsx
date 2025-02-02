import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token } = response.data;

      // Store the token in localStorage or react context
      localStorage.setItem('authToken', token);

      // Show success toast
      toast.success('Login successful! Redirecting to home...', {
        duration: 3000,
        position: 'top-right',
      });

      // Redirect to the home page
      navigate('/main');
    } catch (err) {
      // Show error toast
      toast.error('Invalid email or password', {
        duration: 2000,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="h-screen w-full bg-[#111] text-white flex items-center justify-center">
      <div className="w-[450px] bg-black p-12 pt-24 pb-28 rounded-xl shadow-lg relative z-10">
        <h1 className="text-3xl text-center text-green-500 mb-8 font-semibold">Login</h1>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            required
            type="email"
            className="w-full bg-transparent border-[1px] rounded-lg p-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="w-full bg-transparent border-[1px] rounded-lg p-2 mb-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Signup
          </Link>
        </p>
      </div>

      {/* Toaster component to display toasts */}
      <Toaster />
    </div>
  );
};

export default Login;
