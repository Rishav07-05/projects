import Navbar from "./components/Navbar";
import hero from "./assets/hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-black ">
      <Navbar />

      {/* first page  */}

      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-10 gap-10">
        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="hero"
            className="rotate-y-180 max-w-full h-auto rounded-xl shadow-xl"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Refactor. Reimagine. Rebuild{" "}
            <span className="text-transparent font-moon font-extralight bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600">
              ⚡Refact AI
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Your intelligent coding assistant – debug, refactor, and write
            better code with ease.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
              Get Started
            </button>
            <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* second page  */}

      <div className="min-h-screen w-full bg-black">
        {/*  moving scroller  */}

        <h1 className="text-white text-center p-5 mt-20 md:text-5xl font-extrabold leading-snug tracking-tight">
          Why Developer Trust{" "}
          <span className="text-transparent font-moon font-extralight bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600">
            ⚡Refact AI
          </span>
        </h1>
        <div className="flex flex-col md:flex-col justify-between items-center space-y-12">
          <div className="flex gap-10 ml-16 items-center justify-center">
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
          </div>
          <div className="flex gap-10 ml-16 items-center justify-center">
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
            <div className=" h-[30vh] w-[50vh] border-2 border-white rounded-2xl bg-transparent"></div>
          </div>
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default Home;
