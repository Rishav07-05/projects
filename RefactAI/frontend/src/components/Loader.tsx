"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate percentage from 0 to 100
    const counter = { val: 0 };

    gsap.to(counter, {
      val: 100,
      duration: 3,
      ease: "power1.inOut",
      onUpdate: () => setPercent(Math.floor(counter.val)),
      onComplete: () => {
        // Fade out loader after count ends
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: onComplete,
        });
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-screen h-screen bg-black text-white flex items-center justify-center z-50 text-5xl font-bold"
    >
      {percent}%
    </div>
  );
};

export default Loader;
