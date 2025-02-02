import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const url = "http://localhost:5000/auth/signup";
    const response = await axios.post(url, { name, email, password });

    if (response.data.success) {
      toast.success(response.data.message || "Signup successful! Please login.", {
        position: "top-center",
        duration: 3000,
      });

      navigate("/login");
    }
  } catch (err) {
    // Extract error message
    const errorMessage = err.response?.data?.message || "Error signing up. Please try again.";
    
    toast.error(errorMessage, { position: "top-center", duration: 3000 });
  }
};


  return (
    <div className="h-screen w-full bg-[#111] text-white flex items-center justify-center">
      <div className="w-[450px] bg-black p-12 pt-24 pb-28 rounded-xl relative z-10 shadow-[0_10px_50px_rgba(0,0,0,0.8)] ">
        <h1 className="text-3xl text-center text-green-500 mb-8 font-semibold">Signup</h1>

        <form onSubmit={handleSignup}>
          <input
            required
            type="text"
            className="w-full bg-transparent border-[1px] rounded-lg p-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Signup
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
