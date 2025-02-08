import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const Createpost = () => {
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  // const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  // };

  const handleSubmit = async () => {

  //   const userId = localStorage.getItem("userId");
  //    if (!userId) {
  //   console.error("User not logged in");
  //   return;
  // }

    // const formData = new FormData();
    // formData.append("data", content);
    // if (image) formData.append("image", image);
    // formData.append("postedBy", userId); 

    try {
      await axios.post("http://localhost:5000/api/posts", {content:content , image: image , user:user} );
     
      
      navigate("/main");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-10">
        <h1 className="text-4xl font-bold text-emerald-500">
          You can create your post here
        </h1>

        <div>
           <p className=" text-2xl text-zinc-100">Your text goes here </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-[whitesmoke] mt-7 px-5 py-[1px] border-[1px] border-amber-100 placeholder:text-zinc-700 rounded-xl"
          placeholder="Write your thoughts here"
        ></textarea>
       </div>
        <div>
           <p className=" text-2xl text-zinc-100">Your image url goes here </p>
        <textarea
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="text-[whitesmoke] mt-7 px-5 py-[1px] border-[1px] border-amber-100 placeholder:text-zinc-700 rounded-xl"
          placeholder="Image Url "
        ></textarea>
       </div>
        <div>
           <p className=" text-2xl text-zinc-100">Author name goes here</p>
        <textarea
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="text-[whitesmoke] mt-7 px-5 py-[1px] border-[1px] border-amber-100 placeholder:text-zinc-700 rounded-xl"
          placeholder="Author Name"
        ></textarea>
       </div>

        {/* <img
          onClick={handleClick}
          className="w-[50px] h-[50px] cursor-pointer transition-all"
          src="https://www.svgrepo.com/show/13691/plus.svg"
          alt="Upload"
        /> */}
        
        <button
          onClick={handleSubmit}
          className="px-6 py-1 mt-12 mr-10 border-[2px] border-green-500 bg-green-500 hover:shadow-[0_0_40px_5px_rgba(255,255,0,0.7)] rounded-full text-2xl text-white"
        >
          Post
        </button>

        {/* <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} /> */}
      </div>
    </div>
  );
};

export default Createpost;
