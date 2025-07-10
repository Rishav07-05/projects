import React, { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import Navbar from "./UI/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteMenu from "./UI/InfiniteMenu";

interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  userName: string;
  postedAt: string;
  likes: string[];
  userId: string;
}



const Mypost: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchPosts = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Post[]>(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${user.id}/posts`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load your posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?.id]);

  const handleDelete = async (postId: string) => {
    if (!user) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/${postId}`, {
        data: { userId: user.id },
      });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const formatItems = () => {
    return posts.map((post) => ({
      _id: post._id, 
      image: post.imageUrl,
      link: `/post/${post._id}`,
      title: post.caption || "Your Post",
      description: (
        <div className="text-xs">
          <span className="font-medium">{post.userName}</span> •{" "}
          {post.likes.length} likes •{" "}
          {new Date(post.postedAt).toLocaleDateString()}
        </div>
      ),
      actionButton: (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(post._id);
          }}
          className="p-1 text-gray-300 hover:text-white hover:bg-red-500/30 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ),
    }));
  };

  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <SignedIn>
      <div className="min-h-screen w-full bg-black text-white font-michroma overflow-hidden">
        <Navbar activePath="/mypost" />

        <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-5xl font-bold font-bitcount text-[#ff7300]">Your Posts</h2>
            <Link
              to="/share"
              className="flex items-center px-4 py-2 bg-[#cfbfa0] hover:bg-[#e65c00] text-black font-bold rounded-lg transition-colors duration-200 hover:scale-105 "
            >
              <PlusIcon />
              <span className="ml-2">New Post</span>
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7300]"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 p-4 rounded-lg mb-6">
              {error}
              <button
                onClick={fetchPosts}
                className="mt-2 text-[#ff7300] hover:text-[#e65c00] font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && posts.length === 0 && !error && (
            <div className="text-center py-20 border border-gray-800 rounded-lg">
              <p className="text-gray-400 text-xl mb-6">
                You haven't posted anything yet.
              </p>
              <Link
                to="/share"
                className="inline-flex items-center px-6 py-3 bg-[#ff7300] hover:bg-[#e65c00] text-black font-bold rounded-lg transition-colors"
              >
                <PlusIcon />
                <span className="ml-2">Create Your First Post</span>
              </Link>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="w-full h-[70vh] min-h-[500px] relative">
              <InfiniteMenu items={formatItems()}  onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>
    </SignedIn>
  );
};

export default Mypost;
