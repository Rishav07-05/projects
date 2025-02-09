import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import axios from "axios";
import { SERVER } from "../config";

const Main = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/posts`);
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
    if (storedUser && storedUser.name) {
      setUserInitial(storedUser.name.charAt(0).toUpperCase()); // Extract first letter
    }
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // useEffect(() => {
  // console.log(posts)
  // }, [posts])

  return (
    <div className="h-screen w-full bg-black">
      {/* Header Section */}
      <div className="p-10 flex items-center justify-between fixed top-0 left-0 w-full z-50">
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
        <div className="relative p-[5px] rounded-[20px]">
          {/* Border Animation Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[lightblue] via-orange-500 to-[crimson] animate-spin-slow rounded-[20px]"></div>

          {/* Navigation Links */}
          <div className="relative flex justify-center items-center gap-20 bg-[#060606] p-5 rounded-[12px] border-[1px] border-transparent">
            <a href="#home">
              <h1 className="text-2xl text-zinc-100 font-semibold">Home</h1>
            </a>
            <a href="#post">
              <h1 className="text-2xl text-zinc-100 font-semibold">Post</h1>
            </a>
            <a href="#contact">
              <h1 className="text-2xl text-zinc-100 font-semibold">
                Contact Us
              </h1>
            </a>
          </div>
        </div>

        <div className="flex items-center px-5 rounded-md">
          <div className="w-[50px] h-[50px] bg-emerald-500 rounded-full">
            <div onClick={toggleProfile} className="cursor-pointer">
              <h1 className="text-center mt-[6px] font-bold text-3xl">
                {userInitial}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Home Section */}
      <div id="home" className="pt-[150px]">
        <div className="flex items-center justify-center">
          <h1 className="text-[whitesmoke] font-bold font-serif text-center h-8 border-[1px] border-t-amber-500 border-l-amber-200 border-b-amber-200 border-r-amber-500 rounded-full w-[200px] mt-16">
            Post & Beautify
          </h1>
        </div>

        <div className="text-center">
          <h1
            className="text-center text-5xl mt-10 mb-1 leading-none text-[whitesmoke] font-bold font-serif"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/236x/50/73/3f/50733fe26945d10e7ae1942ffb566aae.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            hello how are u !!!
          </h1>
          <h1
            className="text-center text-5xl mb-8 text-[whitesmoke] font-bold font-serif"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/236x/50/73/3f/50733fe26945d10e7ae1942ffb566aae.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Want to share something about yourself
          </h1>
          <p className="text-cyan-200 text-center">
            Best platform to interact A version of instagram...🤯🤯🤯
          </p>
        </div>
        <div className="flex justify-center items-center rounded-2xl">
          <img
            src="https://imgs.search.brave.com/Ka8vXqMHQZEt00vAip6nXDmxq1zSJHh99OYvI4bFWhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5tYWNwaHVuLmNv/bS9pbWcvdXBsb2Fk/cy9jdXN0b21lci9i/bG9nLzY4Mi8xNjg3/MjUzOTI2NjQ5MTcz/YTYzYjNiNDEuMjQz/NDg5NjMuanBlZz9x/PTg1Jnc9ODQw"
            alt=""
          />
          <h1
            className="text-5xl mx-10 w-[400px] leading-none text-[whitesmoke] font-bold font-serif"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/53/55/00/535500922fb6b26f93d87d4a12aeb6ea.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Define Your Thoughts through Your Post . . .
          </h1>
          <button className="ml-48 py-5 px-10 rounded-full text-2xl bg-green-500 font-bold text-zinc-900 hover:border-green-500 hover:shadow-[0_0_40px_5px_rgba(255,255,0,0.7)] transform translate-all hover:scale-110">
            <Link to="/createpost">
              Create Post <span className="text-[26px]">›</span>
            </Link>
          </button>
        </div>
      </div>

      {/* animated section */}

      <div className="w-full mt-10 bg-black py-24 overflow-hidden">
        <div className="w-full h-[400px] bg-[lightblue] rounded-t-4xl">
          <h1 className="text-center text-[crimson] py-24 font-silkscreen font-extrabold text-[116px] leading-none">UNLEASH YOUR THOUGHTS</h1>
        </div>
      </div>

      {/* Post Section */}
      <div id="post" className="w-full bg-[#060606]">
        <div
          className="text-center font-dancing  font-extrabold text-5xl py-14  ml-10 mb-10  "
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/d2/4c/45/d24c45c2f757b974f3008d171cd2608f.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Entertain Yourself with some post
        </div>

        {/* Post Cards */}
        <div className="flex flex-wrap justify-start gap-6 p-6">
          {posts.slice(0, 5).map((post, index) => (
            <div
              key={index}
              className="border-2 border-zinc-700 w-[470px] mr-32 rounded-xl"
            >
              {/* Image Section */}
              <div className="h-[350px] w-[450px] bg-[#4b6269] rounded-3xl mt-3 ml-2">
                <img
                  src={post.image}
                  className="w-full h-full object-cover rounded-3xl"
                  alt="uploaded image"
                />
              </div>

              {/* Text Section */}
              <div className=" text-[lightblue] mx-auto p-4">
                <p>{post.content}</p>
              </div>

              {/* User Info & Date */}
              <div className="flex items-center gap-3 p-4">
                <div className="flex justify-center items-center bg-emerald-500 h-[40px] w-[40px] rounded-full">
                  <h1 className="text-white text-lg font-bold">
                    {post.user?.charAt(0).toUpperCase()}
                  </h1>
                </div>
                <div className="text-white text-sm">
                  <h1 className="font-semibold">Posted by: {post.user}</h1>
                  <h1 className="text-gray-300">
                    {new Date(post.createdAt).toLocaleString()}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        {posts.length > 5 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/posts")}
              className="px-6 py-3 mb-20 bg-green-500 text-white font-bold rounded-full hover:bg-green-700 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Remarks Page */}
      <div className="w-full h-[70%] bg-[#060606] flex flex-col">
        {[
          {
            name: "Karl",
            img: "https://i.pinimg.com/474x/22/b8/8d/22b88d4ace6013b2dda0202b43972a5b.jpg",
            work: "Finance",
          },
          {
            name: "Max",
            img: "https://i.pinimg.com/236x/67/b1/d9/67b1d9b1f0f0001f99bba671c0c19a5e.jpg",
            work: "Designing",
          },
          {
            name: "Henry",
            img: "https://i.pinimg.com/236x/f2/91/dd/f291dd33b9eccc32dfbe8d3407ad59fa.jpg",
            work: "Craft",
          },
          {
            name: "Elie",
            img: "https://i.pinimg.com/474x/79/4a/a1/794aa105a40a039cf9fb3d222de9f85d.jpg",
            work: "Login",
          },
          {
            name: "Rockzz",
            img: "https://i.pinimg.com/736x/64/d2/51/64d251e8d1a9dc544cefe64b51b6b4c3.jpg",
            work: "Logout",
          },
          {
            name: "Elizabeth",
            img: "https://i.pinimg.com/474x/cc/ed/40/cced40902dd7ce25f0e74ceb8521eaa4.jpg",
            work: "Pictures craft",
          },
          {
            name: "Weekend",
            img: "https://i.pinimg.com/236x/99/94/ec/9994ec6ed29ef0ec854a59d9f6413159.jpg",
            work: "Social access",
          },
        ].map((person, index) => (
          <div
            key={index}
            className="w-full border-t border-zinc-400 py-7 flex items-center"
          >
            {/* Profile Image */}
            <img
              src={person.img}
              className="w-[50px] h-[50px] rounded-full ml-10"
              alt=""
            />

            {/* Name */}
            <h1 className="text-4xl text-[#eb5f35] font-bold font-dancing ml-10">
              <span
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/236x/9e/18/0f/9e180f8d8d60107bd9a4b4aea2e965f4.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {person.name}
              </span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <span className="text-[lightblue]">
                work ideas by: <span className="text-white">{person.work}</span>
              </span>
            </h1>
          </div>
        ))}

        <div className="w-full border-t border-zinc-400 py-4 flex items-center"></div>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-[#060606] overflow-hidden">
        <div
          id="contact"
          className="w-[98%] ml-5 rounded-t-4xl h-[400px] bg-orange-800 text-amber-200 py-10 border-t border-zinc-700"
        >
          <h1 className="text-4xl text-black font-secondary ml-6 absolute z-100">
            POSTIFY
          </h1>
          <div className="max-w-4xl mt-44 flex flex-col items-center ">
            <div className="flex gap-6 z-100">
              <a
                href="#"
                className="flex items-center gap-2 text-black hover:text-zinc-700 transition"
              >
                <Instagram size={24} /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-black hover:text-zinc-700 transition"
              >
                <Twitter size={24} /> Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-black hover:text-zinc-700 transition"
              >
                <Facebook size={24} /> Facebook
              </a>
            </div>
            <div className="mt-4 text-center z-100">
              <p className="text-lg text-[#111] ">
                Phone No: <span className="text-black">7777777777</span>
              </p>
              <p className="text-lg text-[#111]">
                Email: <span className="text-black">abc@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end relative">
            <div className="absolute bottom-10 mb-[-100px] z-1 left-20 h-[720px] w-[720px] rounded-full bg-blue-400"></div>
            <div className="absolute bottom-10 mr-[700px] mb-3 h-[190px] w-[190px] rounded-full bg-blue-500"></div>
            <div className="absolute bottom-10 mr-[500px] mb-7 h-[120px] w-[120px] rounded-full bg-blue-500"></div>
            <div className="absolute bottom-10 mb-16 mr-[300px] h-[100px] w-[100px] rounded-full bg-blue-500"></div>
            <div className="absolute bottom-10 mb-24 mr-[170px] h-[80px] w-[80px] rounded-full bg-blue-500"></div>
            <div className="absolute bottom-10 mb-32 mr-[50px]  h-[50px] w-[50px] rounded-full bg-blue-500"></div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div
        className={`fixed top-0 right-0 h-full bg-zinc-700 w-[400px] z-200 transition-transform ${
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 text-xl font-bold"
          onClick={toggleProfile}
        >
          ✖
        </button>
        <div className="flex flex-col items-center mt-20 space-y-4">
          <div className="h-[100px] w-[100px] rounded-full bg-emerald-500 mt-14">
            <h1 className="text-center mt-[26px] font-extrabold text-5xl">
              {userInitial}
            </h1>
          </div>
          <h1 className="text-center mt-20 text-2xl font-semibold">
            <button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110">
              My Post
            </button>
          </h1>
          <h1 className="text-center mt-4 text-2xl font-semibold">
            <button
              className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform transition-all hover:scale-110"
              onClick={handleLogout}
            >
              Logout
            </button>
          </h1>
          <h1 className="text-center mt-4 text-2xl font-semibold">
            <button className="px-9 py-3 rounded-full bg-red-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-red-500 hover:shadow-[0_0_10px_5px_rgba(255,0,0,0.7)] transform transition-all hover:scale-110">
              Delete
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
