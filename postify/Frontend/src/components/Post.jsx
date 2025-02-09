import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../config";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="bg-black w-full p-16">
      <h1 className="text-4xl text-white text-center font-dyna font-bold mb-8">
        All Posts
      </h1>
      <div className="grid grid-cols-3 gap-8 px-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="border-2 border-zinc-700 rounded-xl p-4 bg-transparent"
          >
            <div className="h-[350px] w-full bg-[#4b6269] rounded-3xl overflow-hidden">
              <img
                src={post.image}
                className="w-full h-full object-cover rounded-3xl"
                alt=""
              />
            </div>
            <div className="text-[lightblue] mx-auto p-4">
              <p>{post.content}</p>
            </div>
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
    </div>
  );
};

export default Post;
