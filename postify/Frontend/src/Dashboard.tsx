import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DashFirst from "./components/DashFirst";

const Dashboard = () => {
  const [showContent, setShowContent] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 1200); // delay dashboard render
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showContent && textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [showContent]);

  return showContent ? (
    <DashFirst />
  ) : (
    <div
      ref={textRef}
      className="min-h-screen w-full bg-black text-[#ff7300] flex items-center justify-center text-3xl font-bold font-michroma"
    >
      Welcome back...
    </div>
  );
};

export default Dashboard;
