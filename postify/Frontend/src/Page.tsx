import { useEffect, useState } from "react";
import PostifyLoader from "../src/components/UI/PostifyLoader"; 
import HorizontalPage from "./components/HorizontalPage";
import Sniper from "./components/Sniper";
import FlipCard from "./components/FlipCard";
import Footer from "./components/Footer";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can use any logic here)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <PostifyLoader />
      ) : (
        <>
          <Footer />
          <Sniper />
          <HorizontalPage />
          <FlipCard />
        </>
      )}
    </>
  );
};

export default Page;
