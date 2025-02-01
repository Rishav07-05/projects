import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2014/11/29/19/21/face-550768_960_720.jpg')",
        }}
      ></div>

      <div className="flex justify-between items-center p-10 relative z-10">
        <h1 className="text-4xl text-zinc-400 font-secondary">POSTIFY</h1>
        <button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110">
          <Link to="/login">
            Get Started <span className="text-xl">›</span>
          </Link>
        </button>
      </div>

      <div className="p-10 mt-10 relative z-10">
        <h1 className="text-9xl mb-10 font-dyna font-bold text-[lightblue]">
          Show the world
        </h1>
        <h1 className="text-9xl font-dyna font-bold text-[lightgoldenrodyellow] mb-10">
          through your lens.
        </h1>
        <h1 className="text-9xl font-dyna font-bold bg-gradient-to-r from-green-300 to-blue-600 bg-clip-text text-transparent">
         - Postify
        </h1>
      </div>
    </div>
  );
};

export default Home;
