import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {/* Background Image */}
     

      <div className="flex justify-between items-center p-10 relative z-10">
        <h1 className="text-4xl text-zinc-400 font-secondary">POSTIFY</h1>
        <button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110">
          <Link to="/login">
            Get Started <span className="text-xl">›</span>
          </Link>
        </button>
      </div>

      <div className="p-10 mt-10 relative z-10">
        <h1 className="text-5xl mb-10 font-dyna text-[lightblue] leading-none ">
          Show the world
        </h1>
        <h1 className="text-9xl font-dyna font-bold text-[lightgoldenrodyellow] mb-10 leading-none">
          through your lens
        </h1>
        <h1 className="text-4xl font-dyna  text-zinc-400 ">
         - POSTIFY
        </h1>
      </div>
      <div className="w-[45%]  h-[45%] ml-10 absolute right-10 mr-48 group ">
        <img className="object-cover rounded-3xl mt-[-64px] transform translate-y-10 duration-300 hover:scale-105 " src="https://imgs.search.brave.com/62w1S3ru4eu8x-3bXMz_jsss6q7yDEkQ1Jvx4E5RdNU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c3RhdGljb250Lm5l/dC9wcm9kdWN0cy8w/MDIzLzU1L2QwZjQ1/OTc5YTYyNGJmZTU4/OGQwMDc1NzA3ZTNi/NzllN2Y5Y2IyMjAu/d2VicA" alt="" />
      </div>
      <div className="w-[25%]  h-[45%] mt-32 ml-20">
        <img className="object-cover rounded-2xl mt-[-64px] transform translate-y-10 duration-300 hover:scale-105 " src="https://images.pexels.com/photos/1795560/pexels-photo-1795560.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
    </div>
  );
};

export default Home;
