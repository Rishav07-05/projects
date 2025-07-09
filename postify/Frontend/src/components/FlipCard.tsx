import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import BoxCarouselDemo from "./UI/BoxCarouselDemo";

import {  SignInButton } from "@clerk/clerk-react";
import "../index.css";


const creative =
  "https://res.cloudinary.com/dzcdallla/video/upload/creative_tuqwz1.mp4";


gsap.registerPlugin(ScrollTrigger);

const FlipCard = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const lastSectionRef = useRef<HTMLDivElement>(null);

  const cardsData = [
    {
      title: "Capture",
      frontColor: "bg-[#8e44ad]",
      backColor: "bg-[#FFD2F3]",
      frontText: "Ideation & Research",
      backText:
        "We dive deep into trends, insights, and audience behavior to shape meaningful ideas.",
    },
    {
      title: "Design",
      frontColor: "bg-[#e74c3c]",
      backColor: "bg-[#E5DAF6]",
      frontText: "User-Centric Interfaces",
      backText:
        "We transform concepts into elegant, intuitive experiences with thoughtful design.",
    },
    {
      title: "Share",
      frontColor: "bg-[#3498db]",
      backColor: "bg-[#FCDCA6]",
      frontText: "Launch & Optimize",
      backText:
        "From development to deployment, we ensure everything runs smoothly—then refine for impact.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const cardInners = cards.map((c) => c.querySelector(".flip-card-inner"));

      gsap.set(cards, {
        x: (i) => (i - 1) * 110 + "%",
        rotation: (i) => (i - 1) * 15,
        opacity: 1,
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          pin: cardsContainerRef.current,
          pinSpacing: false,
          start: "top top",
          end: "+=400%",
          scrub: 0.6,
          markers: false,
        },
      });

      masterTl.to(
        cards,
        {
          x: 0,
          rotation: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power2.inOut",
        },
        "stack"
      );

      masterTl.to(
        cards,
        {
          x: (i) => i * 120 - 180,
          y: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
        },
        "queue"
      );

      masterTl.to(
        cards,
        {
          opacity: 0.9,
          duration: 0.5,
        },
        "queue"
      );

      masterTl.to(
        cards,
        {
          x: (i) => `${(i - 1) * 320}px`,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "reveal"
      );

      masterTl.to(
        cardInners,
        {
          rotationY: 180,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.inOut",
        },
        "reveal+=2.3"
      );

      // Mobile-specific adjustments
      if (window.innerWidth <= 768) {
        // Adjust card sizes and positions for mobile
        gsap.set(cards, {
          scale: 0.7,
          x: (i) => (i - 1) * 80 + "%",
        });

        // Adjust the final position of cards for mobile
        masterTl.to(
          cards,
          {
            x: (i) => `${(i - 1) * 120}px`,
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut",
          },
          "reveal"
        );
      }
    }, componentRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className="relative w-full bg-[#f9f4eb] overflow-hidden"
    >
      <div
        ref={cardsContainerRef}
        className="cards-container h-screen w-full absolute top-0 left-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative md:w-[280px] md:h-[400px] w-[180px] h-[250px] md:perspective-[2000px] perspective-[1000px] transition-all duration-300">
          {cardsData.map((card, index) => (
            <div
              key={`card-${index}`}
              ref={(el) => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
              className={`card absolute w-full h-full pointer-events-auto ${
                index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
              }`}
            >
              <div className="flip-card-inner relative w-full h-full transform-style-preserve-3d transition-transform duration-500">
                <div
                  className={`flip-card-front absolute w-full h-full p-4 md:p-6 rounded-xl flex flex-col justify-between items-center backface-hidden overflow-hidden shadow-lg ${card.frontColor} text-white`}
                >
                  <div className="w-full flex justify-between items-start">
                    <span className="text-[8px] md:text-xs uppercase font-bold tracking-wider opacity-80">
                      Step {index + 1}
                    </span>
                    <span className="text-[8px] md:text-xs font-bold opacity-80">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="text-center px-2 md:px-4">
                    <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[8px] md:text-xs opacity-90 leading-tight">
                      {card.frontText}
                    </p>
                  </div>

                  <div className="w-full flex justify-between items-end">
                    <span className="text-[8px] uppercase tracking-wider opacity-60">
                      Scroll down
                    </span>
                    <span className="text-[8px] md:text-xs font-bold opacity-80">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <div
                  className={`flip-card-back absolute w-full h-full p-4 md:p-6 rounded-xl flex flex-col justify-between items-center backface-hidden overflow-hidden shadow-lg ${card.backColor} text-white transform-rotate-y-180`}
                >
                  <div className="w-full flex justify-around md:gap-44 items-start text-black">
                    <span className="text-[8px] md:text-xs uppercase tracking-wider opacity-80">
                      Step {index + 1}
                    </span>
                    <span className="text-[8px] md:text-xs font-bold opacity-80">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="text-center px-2 md:px-4 text-[#ff0040]">
                    <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-3 font-michroma">
                      {card.title}
                    </h3>
                    <p className="text-[8px] md:text-xl leading-tight font-josefin">
                      {card.backText}
                    </p>
                  </div>

                  <div className="w-full flex justify-around md:gap-32 items-start text-black">
                    <span className="text-[8px] uppercase tracking-wider opacity-60">
                      Our Process
                    </span>
                    <span className="text-[8px] md:text-xs font-bold opacity-80">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections after the cards */}
      <section className="h-screen w-full flex justify-center p-4 md:p-8 bg-black">
        <div className="text-center">
          <h1 className="text-3xl md:text-9xl font-bitcount font-bold mb-6 text-[#ff7300]">
            Vision in Motion
          </h1>
        </div>
      </section>

      <section className="h-screen w-full bg-[#000000] p-4 md:p-8 relative overflow-hidden flex flex-col items-center justify-center gap-4 md:gap-8">
        <h1 className="text-2xl md:text-6xl font-bitcount font-bold text-[#cfbfa0] opacity-90 text-center select-none leading-snug">
          Aesthetics{" "}
          <span className="relative inline-block px-2">
            <span className="absolute inset-0 bg-[#ff7300] rounded-sm rotate-[1deg] scale-102 -skew-y-6 z-0"></span>
            <span className="relative z-10 text-[#89ff02]">Embodied</span>
          </span>{" "}
          in Every Frame
        </h1>

        <div className="relative z-10 w-full max-w-5xl flex justify-center items-center">
          <BoxCarouselDemo />
        </div>

        <p className="text-center text-[#ff7300] text-sm md:text-xl font-medium mt-2 md:mt-4 font-michroma">
          Join us today for more such interaction
        </p>
        <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
          <button className=" w-1/2 md:w-1/12 h-10 bg-[#f1e2c3] text-[#000000] font-bold text-sm md:text-base rounded-xl shadow-lg transition-all duration-300 transform hover:bg-[#ff7300] hover:-rotate-3 hover:scale-105 hover:shadow-xl">
            Get Started<span className="ml-1">→</span>
          </button>
        </SignInButton>
      </section>

      {/* Last Section - Made Responsive */}
      <section
        ref={lastSectionRef}
        className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#000000] relative"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Text Content - Full width on mobile, 1/2 on desktop */}
          <div className="text-[#ff7300] flex flex-col gap-4 md:gap-10 w-full md:w-1/2">
            <h2 className="text-xl md:text-4xl font-bold font-michroma">
              Manifesting Your Vision
            </h2>
            <p className="text-sm md:text-lg font-light text-[#cfbfa0] font-josefin opacity-100 leading-relaxed">
              We specialize in creating immersive digital experiences that
              captivate audiences and leave a lasting impact—where every
              interaction feels meaningful and inspired.
            </p>
          </div>

          {/* Video Content - Full width on mobile, 1/2 on desktop */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <div className="w-full h-[300px] md:h-[445px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              >
                <source src={creative} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlipCard;
