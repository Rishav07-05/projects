import { Link } from "react-router-dom";

const main = () => {
  return (
    <div className="h-screen w-full">
      <div className="p-10 flex items-center justify-between fixed top-0 left-0 w-full z-50 ">
        <h1 className="text-4xl text-[lightblue] font-bold font-serif">AUTH</h1>
        <div className="flex justify-center items-center  gap-20 border-2 border-zinc-600 p-7 rounded-4xl ">
          <a href="">
            <h1 className="text-2xl text-zinc-100 font-semibold">Home</h1>
          </a>
          <a href="#post">
            <h1 className="text-2xl text-zinc-100 font-semibold">Post</h1>
          </a>
          <a href="">
            <h1 className="text-2xl text-zinc-100 font-semibold">Contact Us</h1>
          </a>
        </div>
        <div className="flex items-center  px-5 rounded-md">
          <span className="text-2xl text-white mr-4 font-bold">My Profile</span>
          <div className="w-[50px] h-[50px] bg-emerald-500 rounded-full ">
            <a href="">
              <h1 className="text-center mt-[6px] font-bold text-3xl">R</h1>
            </a>
          </div>
        </div>
      </div>
      {/* Home section */}
      <div id="#home" className="pt-[150px]">
        <div className="flex items-center justify-center ">
          <h1
            className="text-[whitesmoke] font-bold font-serif text-center h-8 border-[1px] border-t-amber-500 border-l-amber-200 border-b-amber-200 border-r-amber-500 rounded-full w-[200px] mt-16"
            style={{}}
          >
            Post & Beautify
          </h1>
        </div>

        <div className="text-center">
          <h1 className="text-center text-5xl mt-10 mb-1 leading-none text-[whitesmoke] font-bold font-serif">
            hello how are u !!!
          </h1>
          <h1 className="text-center text-5xl mb-8 text-[whitesmoke] font-bold font-serif">
            Want to share something about yourself
          </h1>
          <p className="text-red-100 text-center">
            Best platform to interact with people of your nearby with a modified
            version of instagram...🤯🤯🤯
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://imgs.search.brave.com/Ka8vXqMHQZEt00vAip6nXDmxq1zSJHh99OYvI4bFWhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5tYWNwaHVuLmNv/bS9pbWcvdXBsb2Fk/cy9jdXN0b21lci9i/bG9nLzY4Mi8xNjg3/MjUzOTI2NjQ5MTcz/YTYzYjNiNDEuMjQz/NDg5NjMuanBlZz9x/PTg1Jnc9ODQw"
            alt=""
          />
          <h1 className="text-5xl mx-10 w-[400px] leading-none text-[whitesmoke] font-bold font-serif">
            Define Your Thoughts through Your Post 💬
          </h1>
          <button className="ml-48 py-5 px-10 rounded-full text-2xl bg-green-500 font-bold text-zinc-900 hover:border-green-500 hover:shadow-[0_0_40px_5px_rgba(255,255,0,0.7)] transform translate-all hover:scale-110">
            <Link to="/createpost">Create Post</Link>
          </button>
        </div>
      </div>

      {/* post section */}
      <div id="post" className=" w-full bg-[#060606]">
        <div className="text-center text-cyan-400 font-bold mt-[117px] ml-10 text-4xl mb-10">
          Entertain Yourself with some post🤩🥳
        </div>
        {/* post image and text  */}

        <div className="flex flex-wrap justify-start gap-6 p-6">
  {/* Post Card */}
  {[...Array(7)].map((_, index) => (
    <div key={index} className="border-2 border-zinc-700 w-[470px] mr-32">
      {/* Image Section */}
      <div className="h-[350px] w-[450px] bg-[lightblue] rounded-3xl mx-auto">
        <img
          src="https://imgs.search.brave.com/-8z2ISKGj0hp7rQV8I0CK9PASaEvw8AdKoigpM-nKKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWJsb2cuY2RucGsu/bmV0L3NpdGVzLzkv/MjAyMi8wNi9Xb3Js/ZC1QcmVzcy1QaG90/by1Db3Zlci5wbmc"
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        />
      </div>

      {/* Text Section */}
      <div className="h-[150px] w-[450px] text-[lightblue] mx-auto p-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          praesentium quisquam vero provident corrupti id, repellat non facere
          sequi dolorum!
        </p>
      </div>

      {/* User Info & Date */}
      <div className="flex items-center gap-3 p-4">
        {/* Profile Icon */}
        <div className="flex justify-center items-center bg-emerald-500 h-[40px] w-[40px] rounded-full">
          <h1 className="text-white text-lg font-bold">R</h1>
        </div>

        {/* Post Info */}
        <div className="text-white text-sm">
          <h1 className="font-semibold">Posted by Rishav</h1>
          <h1 className="text-gray-300">{new Date().toLocaleString()}</h1>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
      {/* end of post */}
    </div>
  );
};

export default main;
