// import React from 'react'

const Login = () => {
  return (
    <div className="h-screen w-full text-white flex items-center justify-center ">
      <div className="w-[30%] h-[50%] bg-transparent p-8 border-[1px] rounded-xl border-t-green-400 border-l-green-400 border-b-blue-400 border-r-blue-400 shadow-[0_0_10px_5px_rgba(155,77,255,0.7),0_0_10px_5px_rgba(0,0,255,0.7)] transition-all">
        <h1 className="text-4xl text-center m-8 font-bold text-emerald-600" style={{ WebkitTextStroke: "1px lightblue"  , WebkitTextFillColor:"transparent" }}>
          LOGIN HERE
        </h1>
        <div className="flex justify-center items-center">
          <form className="m-6">
            <input
              type="email"
              className="w-full bg-transparent border-[1px] rounded-full p-4 mb-5 placeholder:text-zinc-400"
              placeholder="Email"
            />
            <input
              type="password"
              className="w-full bg-transparent border-[1px] rounded-full p-4 mb-5 placeholder:text-zinc-400"
              placeholder="Password"
            />
            <div className="flex justify-between items-center mt-6">
              <button className=" bg-transparent border-[3px] align-center font-semibold rounded-full px-9 py-3 mb-5 border-green-500 hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)]">
                Login
              </button>
              <p className="mb-5 text-zinc-100">
                Don't have an account?{" "}
                <a href="#" className="text-blue-400 font-bold underline">
                  SignUp
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
