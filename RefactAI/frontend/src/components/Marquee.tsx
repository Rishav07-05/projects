
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -100,
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <div className="w-full py-16 bg-gradient-to-b from-black via-pink-600 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
      
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap items-center"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center px-4">
            <h1 className="text-[8vw] md:text-[6vw] font-bold uppercase bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent tracking-tight">
              Refactor · Reimagine · Rebuild ·
            </h1>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-full flex items-center justify-center ml-4">
              <span className="text-black text-2xl font-bold">⚡</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;