"use client";
import gsap from "gsap";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - wire.json";
import { useEffect, useRef } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Initialize lettersRef with empty array
  useEffect(() => {
    lettersRef.current = lettersRef.current.slice(0, "CHANGE THE WORLD".length);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Filter out null values safely
    const validLetters = lettersRef.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );
    const validLottie = lottieRef.current;
    const validLoader = loaderRef.current;

    if (!validLottie || !validLoader || validLetters.length === 0) return;

    // Initial state
    gsap.set([validLottie, ...validLetters], {
      opacity: 0,
      y: 15,
    });

    // Animation sequence
    tl.to(validLottie, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .to(
        validLetters,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            each: 0.05,
            from: "center",
          },
          ease: "back.out(1.5)",
        },
        "-=0.3"
      )
      .to(
        validLetters,
        {
          color: "#14bedc",
          duration: 0.2,
          stagger: 0.02,
        },
        "+=0.3"
      )
      .to({}, { duration: 0.8 }) // Display duration
      .to(
        [validLottie, ...validLetters],
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.in",
        },
        "start"
      )
      .to(
        validLoader,
        {
          opacity: 0,
          duration: 0,
          onComplete,
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-3 z-[9999]"
    >
      <div ref={lottieRef} className="w-32 h-32 md:w-48 md:h-48">
        <Lottie animationData={animationData} loop />
      </div>

      <div className="flex text-xl md:text-2xl font-bold tracking-wider font-doto">
        {"CHANGE THE WORLD".split("").map((letter, i) => (
          <span
            key={i}
            ref={(el: HTMLSpanElement | null) => {
              lettersRef.current[i] = el;
            }}
            className="inline-block opacity-0 text-[#dc1414]"
            style={{ textShadow: "0 0 6px rgba(255,0,0,0.5)" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
