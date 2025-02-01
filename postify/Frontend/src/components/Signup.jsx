import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="h-screen w-full text-white flex items-center justify-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/6e/87/83/6e878370bf4f9a76cf911e141badd36b.jpg')",
        }}
      ></div>

      {/* Signup Form */}
      <div className="w-[30%] h-[50%] bg-transparent p-8 border-[1px] rounded-4xl border-t-green-400 border-l-green-400 border-b-blue-400 border-r-blue-400 shadow-[0_0_40px_5px_rgba(155,77,255,0.7),0_0_40px_5px_rgba(0,0,255,0.7)] transition-all relative z-10">
        <h1 className="text-4xl text-center m-8 font-secondary text-blue-400">
          SIGNUP
        </h1>
        <div className="flex justify-center items-center">
          <form className="m-6">
            <input
              required
              type="text"
              className="w-full bg-transparent border-[1px] rounded-full p-4 mb-5 placeholder:text-zinc-400"
              placeholder="Username"
            />
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
            <div className="flex justify-center mt-6">
              <button className="border-[3px] font-semibold rounded-full px-9 py-3 mb-5 bg-green-500 border-green-500 hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)]">
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Home Button */}
      <button className="absolute top-10 right-10 bg-transparent border-[3px] font-semibold rounded-full px-6 py-3 border-green-500 hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)]">
        <Link to="/home">Home</Link>
      </button>
    </div>
  );
};

export default Signup;
