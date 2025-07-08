import { useState, useEffect } from "react";
import { SignedIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/swiper-bundle.css";

// Assets


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

  
import Navbar from "./UI/Navbar";
import Preview from "./UI/cursor-attractor-and-gravity-demo";
import Footer from "../components/Footer";
import { LoadingWrapper } from "./UI/LoadingWrapper";

interface Post {
  _id: string;
  imageUrl: string;
  caption: string;
  userName: string;
  postedAt: string;
}

const SWIPER_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image1,
  image2,
  image3,
  image4,
  image5,
] as const;

const DashFirst = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<Post[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/posts`);
        setPosts(res.data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
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
    <LoadingWrapper isLoading={isLoading}>
      <SignedIn>
        <div className="min-h-screen w-full bg-black font-michroma overflow-x-hidden">
          <Footer />
          <Navbar activePath="/dashboard" />

          {/* Swiper Section - Responsive Carousel */}
          <div className="w-full mt-24 px-4 md:px-10">
            <Swiper
              modules={[FreeMode, Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              loop={SWIPER_IMAGES.length >= 6} 
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={3000}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.5,
                momentumBounce: false,
              }}
              grabCursor={true}
              className="!overflow-visible"
              breakpoints={{
                640: {
                  spaceBetween: 30,
                },
                1024: {
                  spaceBetween: 50,
                },
              }}
            >
              {SWIPER_IMAGES.map((img, index) => (
                <SwiperSlide
                  key={`swiper-image-${index}`}
                  className="!w-[70vw] sm:!w-[40vw] md:!w-[30vw] lg:!w-[20vw] !h-[200px] md:!h-[300px]"
                >
                  <img
                    src={img}
                    alt={`Featured content ${index + 1}`}
                    className="rounded-xl object-cover h-full w-full"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Hero Section */}
          <section className="mt-32 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 px-4 md:px-10 pb-20">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={showcase}
                alt="Post.net showcase"
                className="rounded-2xl w-full max-w-[500px] aspect-video shadow-2xl"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 max-w-xl mt-8 md:mt-0">
              <p className="text-xl text-[#cfbfa0] mb-2">POST.NET</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#ff7300] font-extrabold leading-snug mb-4">
                Create with all impulsive thought
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                A platform designed to turn spontaneous moments into inspiring
                visuals. Share your creativity instantly.
              </p>
              <Link to="/share" className="inline-block">
                <button
                  aria-label="Share your creation"
                  className="px-4 md:px-6 py-2 w-full sm:w-auto bg-[#f1e2c3] text-black font-bold text-sm md:text-base rounded-xl shadow-lg transition-all duration-300 hover:bg-[#ff7300] hover:-rotate-3 hover:scale-105 hover:shadow-xl"
                >
                  Share <span className="ml-1">→</span>
                </button>
              </Link>
            </div>
          </section>

          {/* Recent Posts Section */}
          <section className="px-4 md:px-10 mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
              Recent Posts
            </h2>

            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {posts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-[#1c1c1c] rounded-xl shadow-lg overflow-hidden border border-[#333] hover:border-[#ff7300] transition-colors duration-300"
                    >
                      <img
                        src={post.imageUrl}
                        alt={`Post by ${post.userName}`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <p className="text-[#cfbfa0] text-lg mb-1 font-josefin">
                          {post.userName}
                        </p>
                        <p className="text-[#cfbfa0] text-xs mb-2 font-josefin">
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
                    aria-label="View all posts"
                    className="px-6 py-3 bg-[#ff7300] text-black rounded-xl font-bold text-sm hover:bg-[#e65c00] hover:scale-105 transition-all"
                  >
                    View All Posts →
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-center py-10">
                No posts available yet.
              </p>
            )}
          </section>

          {/* Interactive Community Section */}
          <section className="h-[85vh] w-full relative z-10 border-none">
            <div className="absolute inset-0 overflow-hidden border-none">
              <Preview />
            </div>
          </section>
        </div>
      </SignedIn>
    </LoadingWrapper>
  );
};

export default DashFirst;
