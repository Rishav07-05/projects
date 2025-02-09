import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
     

      <div className="flex justify-between items-center p-10 relative z-10">
  <div className="flex items-center gap-3">
    <img
      src="https://i.pinimg.com/236x/41/2b/8e/412b8ed68cdef05482ffe94a59fbbeb3.jpg"
      height={50}
      width={50}
      alt="Postify Logo"
    />
    <h1
      className="text-4xl text-zinc-400 font-secondary"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/ca/44/da/ca44da91bc6b31232d8c6a097cc948dc.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      POSTIFY
    </h1>
  </div>
  <button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110">
    <Link to="/login">
      Get Started <span className="text-xl">›</span>
    </Link>
  </button>
</div>


      <div className="p-10 mt-10 relative z-10">
        <h1 className="text-5xl mb-10 font-dyna text-[lightgoldenrodyellow] leading-none ">
          Show the world
        </h1>
        <h1 className="text-9xl font-dyna font-bold text-[lightgoldenrodyellow] mb-10 leading-none" style={{
          backgroundImage: "url('https://i.pinimg.com/236x/cd/25/27/cd252739c86d74cb79cb37bae6e9736c.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
  }}>
          through your lens
        </h1>
        <h1 className="text-4xl font-dyna  text-zinc-400 "
        >
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
