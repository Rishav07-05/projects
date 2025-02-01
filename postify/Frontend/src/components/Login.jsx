import { Link } from "react-router-dom";

// import React from 'react'


const Login = () => {
  return (
    <div className="h-screen w-full text-white flex items-center justify-center   ">
        <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/ee/d5/ee/eed5ee0d409673292d5c3cfdc26cf237.jpg')",
        }}
      ></div>
      <div className="w-[30%] h-[50%] bg-transparent p-8 border-[1px] rounded-4xl border-t-green-400 border-l-green-400 border-b-blue-400 border-r-blue-400 shadow-[0_0_40px_5px_rgba(155,77,255,0.7),0_0_40px_5px_rgba(0,0,255,0.7)] transition-all relative z-10">
        <h1 className="text-4xl text-center m-8 font-secondary bg-gradient-to-b from-zinc-500 to-blue-500 bg-clip-text text-transparent">
          LOGIN
        </h1>
        <div className="flex justify-center items-center">
          <form className="m-6">
            <input
              required
              type="email"
              className="w-full bg-transparent border-[1px] rounded-full p-4 mb-5 placeholder:text-zinc-400"
              placeholder="Email"
            />
            <input
              required
              type="password"
              className="w-full bg-transparent border-[1px] rounded-full p-4 mb-5 placeholder:text-zinc-400"
              placeholder="Password"
            />
            <div className="flex justify-between items-center mt-6">
              <button className=" bg-transparent border-[3px] align-center font-semibold rounded-full px-9 py-3 mb-5 border-green-500 hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)]">
                Login
              </button>
              <p className="mb-5 text-zinc-100">
                Don't have an account?
                <a href="/src/components/Signup.jsx" className="text-blue-400 font-bold underline">
                  <Link to= "/signup" className="text-blue-400 font-bold underline">Signup</Link>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


