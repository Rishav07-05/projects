import { useState, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const Createpost = () => {
  const [content, setContent] = useState("this is ");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    formData.append("postedBy", "Rishav"); // Replace with actual username

    try {
      await axios.post("http://localhost:5000/api/posts", formData);
      console.log(Response.data);
      
      navigate("/main"); // Redirect after posting
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

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-[whitesmoke] px-5 py-[1px] border-[1px] border-amber-100 placeholder:text-zinc-700 rounded-xl"
          placeholder="Write your thoughts here"
        ></textarea>

        <img
          onClick={handleClick}
          className="w-[50px] h-[50px] cursor-pointer transition-all"
          src="https://www.svgrepo.com/show/13691/plus.svg"
          alt="Upload"
        />
        
        <button
          onClick={handleSubmit}
          className="px-6 py-1 mr-10 border-[2px] border-green-500 bg-green-500 hover:shadow-[0_0_40px_5px_rgba(255,255,0,0.7)] rounded-full text-2xl text-white"
        >
          Send
        </button>

        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Createpost;
