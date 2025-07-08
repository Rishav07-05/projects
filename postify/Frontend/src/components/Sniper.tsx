import { useEffect, useRef } from "react";
import gsap from "gsap";
import cursorImg from "../assets/crosshair-removebg-preview.png";
import explosionGif from "../assets/explosion-explode.gif";
import "./Sniper.css";

type GSAPAnimation = gsap.core.Tween;

const Sniper = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>(Array(23).fill(null));
  const previousGifRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<GSAPAnimation | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const img = new Image();
    img.src = explosionGif;
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;
    const gallery = galleryRef.current;

    const onMouseMove = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          duration: 0.3,
          x: e.clientX - cursor.offsetWidth / 2,
          y: e.clientY - cursor.offsetHeight / 2,
        });
      }
      if (gallery) {
         const x = e.clientX / window.innerWidth - 0.5;
         const y = e.clientY / window.innerHeight - 0.5;
         gsap.to(gallery, {
           duration: 1,
           rotationY: x * 20,
           rotationX: -y * 20,
           ease: "power1.out",
         });
       }
    };

    const onMouseEnter = () => {
      if (cursor) gsap.to(cursor, { duration: 0.3, autoAlpha: 1 });
    };

    const onMouseLeave = () => {
      if (cursor) gsap.to(cursor, { duration: 0.3, autoAlpha: 0 });
    };

    if (container) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }


    const timeout = setTimeout(() => {
      const validBlocks = blocksRef.current.filter(Boolean) as HTMLDivElement[];

      if (validBlocks.length > 0) {
        const duration = 0.25;
        const repeatDelay = 0.0045 * (validBlocks.length - 1);

        animationRef.current = gsap.from(validBlocks, {
          scale: 0,
          top: "50%",
          left: "50%",
          transform: "translateZ(-200px)",
          duration: 5,
          stagger: {
            each: duration,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        });

        if (textRef.current) {
          gsap.to(textRef.current, {
            pointerEvents: "none",
            delay: 2,
          });
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeout);
      animationRef.current?.kill();
    };
  }, []);

  const handleBlockClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    block: HTMLDivElement | null
  ) => {
    if (!block) return;

    e.preventDefault();
    e.stopPropagation();

    const x = e.clientX;
    const y = e.clientY;

    previousGifRef.current?.remove();

    const gif = new Image();
    gif.src = explosionGif;
    gif.style.position = "fixed";
    gif.style.top = `${y - 25}px`;
    gif.style.left = `${x - 25}px`;
    gif.style.width = "50px";
    gif.style.height = "50px";
    gif.style.pointerEvents = "none";
    gif.style.zIndex = "100001";
    gif.style.height = "200px";
    gif.style.width = "200px";

    document.body.appendChild(gif);
    previousGifRef.current = gif;

    block.style.visibility = "hidden";

    setTimeout(() => gif.remove(), 500);
    setTimeout(() => {
      block.style.visibility = "visible";
    }, 5000);
  };

  return (
    <section
      ref={containerRef}
      className="sniper-section h-screen w-full relative overflow-hidden"
    >
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-auto"
      >
        <h1 className="text-4xl md:text-8xl font-black font-bitcount text-[#fd4800] text-center mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Your Digital Playground
        </h1>
        <p className="text-lg md:text-2xl font-josefin text-[#cfbfa0] text-center max-w-2xl px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Share memes, moments, and everything in between with caption
        </p>
      </div>

      <div className="cursor" ref={cursorRef}>
        <img src={cursorImg} alt="cursor" />
      </div>

      <div className="gallery">
        {[...Array(23)].map((_, index) => (
          <div
            key={index}
            className={`block block-${index + 1}`}
            ref={(el) => {
              if (el) blocksRef.current[index] = el;
            }}
            onClick={(e) => handleBlockClick(e, blocksRef.current[index])}
          />
        ))}
      </div>
    </section>
  );
};

export default Sniper;
