import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

interface PostifyLoaderProps {
  onComplete?: () => void;
}

const PostifyLoader: React.FC<PostifyLoaderProps> = ({ onComplete }) => {
  const letters = ["P", "O", "S", "T", "I", "F", "Y"];
  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getFinalX = (i: number) => {
    const spacing = window.innerWidth < 600 ? 30 : 80;
    const offset = ((letters.length - 1) * spacing) / 2;
    return i * spacing - offset;
  };

  useEffect(() => {
    const candyColors = [
      "#FF3CAC",
      "#784BA0",
      "#2B86C5",
      "#42E695",
      "#F6D365",
      "#FFA17F",
      "#FF5E7E",
    ];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (onComplete) onComplete();
        else navigate("/");
      },
    });

    gsap.set(letterRefs.current, {
      opacity: 0,
      y: 0,
      x: 0,
      scale: 0.8,
      filter: "blur(2px)",
      color: "#ffffff",
    });

    tl.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: { amount: 0.4, from: "center" },
    })
      .to(
        letterRefs.current,
        {
          color: (i: number) => candyColors[i % candyColors.length],
          textShadow: (i: number) => {
            const c = candyColors[i % candyColors.length];
            return `0 0 12px ${c}, 0 0 24px ${c}`;
          },
          duration: 0.6,
          ease: "sine.inOut",
        },
        "-=0.4"
      )
      .to(
        letterRefs.current,
        {
          y: (i: number) => (i % 2 === 0 ? -5 : 5),
          duration: 1,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          stagger: 0.05,
        },
        "-=0.5"
      )
      .to(
        letterRefs.current,
        {
          opacity: 0.9,
          scale: 1.05,
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.3"
      )
      .to(
        letterRefs.current,
        {
          x: (i: number) => getFinalX(i),
          duration: 0.5,
          ease: "expo.out",
          stagger: { each: 0.03, from: "center" },
        },
        "-=0.3"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          delay: 0.4,
        },
        "+=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [navigate, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {letters.map((letter, index) => (
        <div
          key={index}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          style={{
            position: "absolute",
            display: "inline-block",
            willChange: "transform, opacity, color, text-shadow",
            fontFamily: "'michroma', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 8vw, 5rem)",
            letterSpacing: "1px",
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default PostifyLoader;
