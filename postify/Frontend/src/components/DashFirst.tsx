import { useState, useEffect, Suspense , lazy } from "react";
import { SignedIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/swiper-bundle.css";

import Navbar from "./UI/Navbar";
import Footer from "../components/Footer";

const Preview = lazy(() =>
  import("./UI/cursor-attractor-and-gravity-demo")
);

interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  userName: string;
  postedAt: string;
}

const image1 =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/11_zg9qqd.jpg";
const image2 =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/14_fhjgog.jpg";
const image3 =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/18_pui4lh.jpg";
const image4 =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/16_xsjy6l.jpg";
const image5 =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/12_ikdaq4.jpg";

const showcase =
  "https://res.cloudinary.com/dzcdallla/image/upload/b464d340dd249d092baf4aead465d1a7_y146ij.gif";

const SWIPER_IMAGES = [image1, image2, image3, image4, image5];

const PostsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#1c1c1c] rounded-xl border border-[#333] animate-pulse"
        >
          <div className="w-full h-48 bg-gray-700"></div>

          <div className="p-4 space-y-2">
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-3 w-32 bg-gray-700 rounded"></div>
            <div className="h-3 w-full bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DashFirst = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(
          "https://postify-be.onrender.com/api/posts"
        );
        setPosts(res.data.slice(0, 8));
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      }
    };

    fetchPosts();
  }, []);

  const handleSeeAllPosts = () => {
    navigate("/interact");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="min-h-screen w-full bg-black font-michroma overflow-x-hidden">
        <Navbar activePath="/dashboard" />

        {/* Swiper */}
        <div className="w-full mt-24 px-4 md:px-10">
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            freeMode
            grabCursor
          >
            {SWIPER_IMAGES.map((img, index) => (
              <SwiperSlide
                key={index}
                className="!w-[70vw] sm:!w-[40vw] md:!w-[30vw] lg:!w-[20vw] !h-[200px] md:!h-[300px]"
              >
                <img
                  src={img}
                  alt="featured"
                  className="rounded-xl object-cover h-full w-full"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Showcase Section */}
        <section className="mt-32 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 px-4 md:px-10 pb-20">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={showcase}
              alt="showcase"
              className="rounded-2xl w-full max-w-[500px] aspect-video shadow-2xl"
            />
          </div>

          <div className="w-full md:w-1/2 max-w-xl">
            <p className="text-xl text-[#cfbfa0] mb-2">POST.NET</p>

            <h1 className="text-4xl text-[#ff7300] font-extrabold mb-4">
              Create with all impulsive thought
            </h1>

            <p className="text-gray-400 mb-6">
              Share spontaneous creativity and inspire the community instantly.
            </p>

            <Link to="/share">
              <button className="px-6 py-2 bg-[#f1e2c3] text-black font-bold rounded-xl hover:bg-[#ff7300] hover:scale-105 transition">
                Share →
              </button>
            </Link>
          </div>
        </section>

        {/* Posts Section */}
        <section className="px-4 md:px-10 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Recent Posts</h2>

          {posts.length === 0 ? (
            <PostsSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-[#1c1c1c] rounded-xl border border-[#333]"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.userName}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <p className="text-[#cfbfa0] text-lg">{post.userName}</p>

                      <p className="text-[#cfbfa0] text-xs">
                        {new Date(post.postedAt).toLocaleString()}
                      </p>

                      <p className="text-white text-sm line-clamp-2">
                        {post.caption}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <button
                  onClick={handleSeeAllPosts}
                  className="px-6 py-3 bg-[#ff7300] text-black rounded-xl font-bold hover:scale-105 transition"
                >
                  View All Posts →
                </button>
              </div>
            </>
          )}
        </section>

        {/* Lazy GSAP Section */}
        <section className="h-[85vh] w-full relative">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <Preview />
          </Suspense>
        </section>

        <Footer />
      </div>
    </SignedIn>
  );
};

export default DashFirst;