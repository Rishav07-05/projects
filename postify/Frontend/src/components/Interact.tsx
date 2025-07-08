import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import axios, { AxiosError } from "axios";
import Navbar from "./UI/Navbar";
import { Link } from "react-router-dom";
import { LoadingWrapper } from "./UI/LoadingWrapper";

export interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  userId: string;
  userName: string;
  likes: string[];
  postedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

const Interact = () => {
  const { user } = useUser();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Post[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/posts`
        );
        setAllPosts(res.data);

        if (user) {
          try {
            const likesRes = await axios.get<string[]>(
              `${import.meta.env.VITE_API_BASE_URL}/api/user/${user.id}/likes`
            );
            setLikedPosts(new Set(likesRes.data));
          } catch (err) {
            console.error("Error fetching user likes:", err);
          }
        }
      } catch (err) {
        const error = err as AxiosError;
        setError(
          error.response?.data?.toString() ||
            "Failed to load community posts. Please try again later."
        );
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [user]);

  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      const isLiked = likedPosts.has(postId);
      const newLikedPosts = new Set(likedPosts);

      if (isLiked) {
        await axios.post<Post>(
          `${import.meta.env.VITE_API_BASE_URL}/api/posts/${postId}/unlike`,
          { userId: user.id }
        );
        newLikedPosts.delete(postId);
      } else {
        await axios.post<Post>(
          `${import.meta.env.VITE_API_BASE_URL}/api/posts/${postId}/like`,
          { userId: user.id }
        );
        newLikedPosts.add(postId);
      }

      setLikedPosts(newLikedPosts);

      setAllPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              likes: isLiked
                ? post.likes.filter((id) => id !== user.id)
                : [...post.likes, user.id],
            };
          }
          return post;
        })
      );
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating like:", error);
      alert(error.response?.data?.toString() || "Failed to update like");
    }
  };

  if (loading) {
    return (
      <SignedIn>
        <div className="min-h-screen w-full bg-black font-michroma">
          <Navbar activePath="/interact" />
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7300]"></div>
          </div>
        </div>
      </SignedIn>
    );
  }

  if (error) {
    return (
      <SignedIn>
        <div className="min-h-screen w-full bg-black font-michroma">
          <Navbar activePath="/interact" />
          <div className="text-center py-20 text-red-500 px-4">{error}</div>
        </div>
      </SignedIn>
    );
  }

  return (
    <LoadingWrapper>
      <SignedIn>
        <div className="min-h-screen w-full bg-black font-michroma">
          <Navbar activePath="/interact" />

          <div className="px-4 sm:px-6 md:px-10 py-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff7300]">
                  Community Post
                </h1>
                <Link
                  to="/share"
                  className="px-4 py-2 bg-[#cfbfa0] text-black text-sm sm:text-base font-bold rounded-lg hover:bg-[#ff7300] transition-colors"
                >
                  + New Post
                </Link>
              </div>

              {allPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg sm:text-xl mb-6">
                    No posts yet. Be the first to share!
                  </p>
                  <Link
                    to="/share"
                    className="inline-block px-6 py-3 bg-[#ff7300] text-black font-bold rounded-lg hover:bg-[#e65c00] transition-colors text-sm sm:text-base"
                  >
                    Create Your First Post
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {allPosts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-square">
                        <img
                          src={post.imageUrl}
                          alt={post.caption || "Community post"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                          <p className="text-white text-sm line-clamp-2">
                            {post.caption}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[#cfbfa0] text-sm sm:text-base font-medium">
                            @{post.userName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(post.postedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLike(post._id)}
                          className="flex items-center gap-1 transition-colors"
                          disabled={!user}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={likedPosts.has(post._id) ? "#ff0000" : "none"}
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          <span
                            className={`text-xs ${
                              likedPosts.has(post._id)
                                ? "text-[#ff0000]"
                                : "text-gray-400"
                            }`}
                          >
                            {post.likes?.length || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SignedIn>
    </LoadingWrapper>
  );
};

export default Interact;
