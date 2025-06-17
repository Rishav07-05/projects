"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - wire.json";

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { val: 0 };

    const tl = gsap.timeline();

    // Animation timeline
    tl.to(counter, {
      val: 100,
      duration: 5,
      ease: "power1.inOut",
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
        gsap.to(progressRef.current, {
          width: `${Math.floor(counter.val)}%`,
          duration: 0.2,
          ease: "power1.out",
        });
      },
    }).to(contentRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (loaderRef.current) {
          gsap.set(loaderRef.current, {
            opacity: 0,
            display: "none",
            onComplete: onComplete,
          });
        }
      },
    });

    // Lottie animation scaling effect
    gsap.to(lottieRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill(); // Clean up animations on unmount
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-screen h-screen bg-black flex flex-col items-center justify-center gap-4 z-50"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center gap-4 w-full max-w-md px-4"
      >
        {/* Lottie Animation */}
        <div
          ref={lottieRef}
          className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center"
        >
          <Lottie
            animationData={animationData}
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600 font-pixelify md:text-6xl font-bold tracking-widest">
          {percent}%
        </div>

        {/* Loading Bar */}
        <div className="w-44 h-2 font-pixelify mt-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full transition-all"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
