import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import axios from "axios";



const Main = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      console.log(response.data); // Check the response
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []); // Empty dependency array ensures it runs only once on mount

  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full  ">
      <div className="p-10 flex items-center justify-between fixed top-0 left-0 w-full z-50 ">
        <h1 className="text-4xl text-zinc-400 font-secondary">POSTIFY</h1>
        <div className="flex justify-center items-center  gap-20 border-2 border-zinc-600 p-7 rounded-4xl ">
          <a href="">
            <h1 className="text-2xl text-zinc-100 font-semibold">Home</h1>
          </a>
          <a href="#post">
            <h1 className="text-2xl text-zinc-100 font-semibold">Post</h1>
          </a>
          <a href="#contact">
            <h1 className="text-2xl text-zinc-100 font-semibold">Contact Us</h1>
          </a>
        </div>
        <div className="flex items-center  px-5 rounded-md">
          
          <div className="w-[50px] h-[50px] bg-emerald-500 rounded-full ">
            <div onClick={toggleProfile} className="cursor-pointer">
              <h1 className="text-center mt-[6px] font-bold text-3xl">R</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Home section */}
      <div id="#home" className="pt-[150px]">
        <div className="flex items-center justify-center ">
          <h1
            className="text-[whitesmoke] font-bold font-serif text-center h-8 border-[1px] border-t-amber-500 border-l-amber-200 border-b-amber-200 border-r-amber-500 rounded-full w-[200px] mt-16"
            
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
          <p className="text-red-200 text-center">
            Best platform to interact 
            A version of instagram...🤯🤯🤯
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
            <Link to="/createpost">Create Post <span className="text-[26px]">›</span></Link>
          </button>
        </div>
      </div>

      {/* post section */}
      <div id="post" className=" w-full bg-[#060606]">
        <div className="text-center text-cyan-200 mt-[117px] ml-10 text-4xl mb-10 font-dyna">
          Entertain Yourself with some post🤩🥳
        </div>

        {/* Post Cards */}
        <div className="flex flex-wrap justify-start gap-6 p-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="border-2 border-zinc-700 w-[470px] mr-32 rounded-xl "
            >
              {/* Image Section */}
              <div className="h-[350px] w-[450px] bg-[lightblue] rounded-3xl mx-auto">
                <img
                  src={post.image} // Use the image URL from the backend
                  className="w-full h-full object-cover rounded-3xl"
                  alt=""
                />
              </div>

              {/* Text Section */}
              <div className="h-[150px] w-[450px] text-[lightblue] mx-auto p-4">
                <p>{post.content}</p> {/* Display post content */}
              </div>

              {/* User Info & Date */}
              <div className="flex items-center gap-3 p-4">
                {/* Profile Icon */}
                <div className="flex justify-center items-center bg-emerald-500 h-[40px] w-[40px] rounded-full">
                  <h1 className="text-white text-lg font-bold">R</h1>
                </div>

                {/* Post Info */}
                <div className="text-white text-sm">
                  <h1 className="font-semibold">Posted by </h1>
                  <h1 className="text-gray-300">{new Date(post.createdAt).toLocaleString()}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* end of post */}

      {/* remarks page  */}
     <div className="w-full h-[70%] bg-[#060606] flex flex-col">
  {/* Names Array */}
  {['Karl', 'Max', 'Henry', 'Alice', 'Bob', 'Eve', 'John'].map((name, index) => (
    <div key={index} className="w-full border-t border-zinc-400 py-7 flex items-center">
      <img src="https://i.pravatar.cc/300" className="w-[50px] h-[50px] rounded-full ml-10" alt="" />
      <h1 className="text-4xl text-zinc-400 font-bold font-dancing ml-10">{name}</h1>
    </div>
  ))}

  {/* Last Border */}
  <div className="w-full border-t border-zinc-400 py-4 flex items-center"></div>
</div>





      {/* contact section */}
      <div className="w-full bg-[#060606] overflow-hidden">
        <div id="contact" className="w-[98%] ml-5 rounded-t-4xl h-[400px]  bg-zinc-800 text-amber-200 py-10 border-t border-zinc-700">
        <h1 className="text-4xl text-zinc-400 font-secondary  ml-6">POSTIFY</h1>
      <div className="max-w-4xl mt-44 flex flex-col items-center">
        
        <div className="flex gap-6">
          <a href="#" className="flex items-center gap-2 text-emerald-200 hover:text-emerald-400 transition">
            <Instagram size={24} /> Instagram
          </a>
          <a href="#" className="flex items-center gap-2 text-emerald-200 hover:text-emerald-400 transition">
            <Twitter size={24} /> Twitter
          </a>
          <a href="#" className="flex items-center gap-2 text-emerald-200 hover:text-emerald-400 transition">
            <Facebook size={24} /> Facebook
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-lg"> Phone No: <span className="text-emerald-300">7777777777</span></p>
          <p className="text-lg"> Email: <span className="text-emerald-300">abc@gmail.com</span></p>
        </div>
      </div>
    </div>
      </div>

      {/* profile  */}
      <div
  className={`fixed top-0 right-0 h-full bg-zinc-700 w-[400px] z-200 transition-transform ${
    isProfileOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <button className="absolute top-5 right-5 text-xl font-bold" onClick={toggleProfile}>
    ✖
        </button>
        <div className="flex flex-col items-center mt-20 space-y-4">
          <h1 className="text-center mt-20 text-2xl font-semibold text--500"><button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110">My Post</button></h1>
        <h1 className="text-center mt-4 text-2xl font-semibold text--500"><button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110" onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/login');
        }}>Logout</button> </h1>
          <h1 className="text-center mt-4 text-2xl font-semibold text--500">
            <button className="px-9 py-3 rounded-full bg-red-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-red-500 hover:shadow-[0_0_10px_5px_rgba(255,0,0,0.7)] transform transition-all hover:scale-110 " >Delete</button>
       </h1>
        </div>
  
</div>

    </div>
  );
};

export default Main;
