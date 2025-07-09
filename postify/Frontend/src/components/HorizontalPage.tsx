import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignInButton } from "@clerk/clerk-react";


gsap.registerPlugin(ScrollTrigger);


const auto =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/auto_qkxiyk.jpg";
const kid =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/kid_sv8viw.jpg";
const dump =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/dump_p72sou.jpg";
const video =
  "https://res.cloudinary.com/dzcdallla/video/upload/video_xyzjgv.mp4";
const likes =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/likes_mgetou.jpg";
const poloroaid =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/poloroaid_mamrgp.jpg";
const post =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/post_cp08se.jpg";
const camera =
  "https://res.cloudinary.com/dzcdallla/image/upload/q_auto,f_auto/camera_txj1ss.jpg";



const HorizontalPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const postedTextRef = useRef<HTMLParagraphElement>(null);
  const targetImageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const particleData = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      width: gsap.utils.random(2, 6),
      height: gsap.utils.random(2, 6),
      background: `hsl(${gsap.utils.random(20, 40)}, 100%, 60%)`,
      top: `${gsap.utils.random(5, 95)}%`,
      left: `${gsap.utils.random(5, 95)}%`,
    }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".slide");
      if (slides.length === 0) return;

      const totalWidth = slides.reduce(
        (acc, slide) => acc + slide.offsetWidth,
        0
      );
      gsap.set(sliderRef.current, { width: totalWidth });

      // Main horizontal scroll animation
      const horizontalScroll = gsap.to(sliderRef.current, {
        x: () => -(sliderRef.current!.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.5,
          end: () => `+=${sliderRef.current!.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".slide-1 img", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          containerAnimation: horizontalScroll,
          trigger: ".slide-1",
          start: "left center",
          end: "left 20%",
          scrub: true,
        },
      });

      gsap.from(".slide-1 .text-reveal", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          containerAnimation: horizontalScroll,
          trigger: ".slide-1",
          start: "left 80%",
          end: "left 20%",
          scrub: true,
        },
      });

      
      gsap.from(".slide-2 h1", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1)",
        scrollTrigger: {
          containerAnimation: horizontalScroll,
          trigger: ".slide-2",
          start: "left 80%",
          end: "left 50%",
          scrub: true,
        },
      });

      gsap.from(".slide-2 video", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          containerAnimation: horizontalScroll,
          trigger: ".slide-2",
          start: "left 70%",
          end: "left 30%",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: ".slide-2",
        start: "left center",
        end: "left 10%",
        containerAnimation: horizontalScroll,
        onEnter: () => videoRef.current?.play(),
        onLeaveBack: () => videoRef.current?.pause(),
      });

      gsap.from(".slide-3 img", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1)",
        scrollTrigger: {
          containerAnimation: horizontalScroll,
          trigger: ".slide-3",
          start: "left 80%",
          end: "left 30%",
          scrub: true,
        },
      });

      if (targetImageRef.current) {
        gsap.to(targetImageRef.current, {
          scale: 1.05,
          boxShadow: "0 0 20px rgba(255,115,0,0.8)",
          duration: 0.5,
          scrollTrigger: {
            containerAnimation: horizontalScroll,
            trigger: targetImageRef.current,
            start: "left 70%",
            end: "left 30%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [particleData]);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden bg-black relative"
      aria-label="Features Showcase"
    >
      <div
        ref={sliderRef}
        className="h-full flex items-center absolute will-change-transform"
      >
        {/* Slide 1 */}
        <div className="slide slide-1 h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-around gap-10 md:gap-16 px-4 md:px-20 min-w-[90vw] relative bg-black">
          <div className="relative z-10 max-w-md flex flex-col items-start gap-6 md:gap-8 text-center md:text-left">
            <span className="text-[#cfbfa0] font-extralight font-josefin text-2xl md:text-7xl tracking-tight text-reveal">
              "Articulate Without Restraint"
            </span>
            <span className="inline-block font-michroma text-[#ff7300] font-semibold text-base md:text-2xl text-reveal tracking-wide">
              From fleeting absurdities to profound introspection.
            </span>
            <p className="text-[#cfbfa0] font-josefin text-sm md:text-lg font-light leading-relaxed text-reveal">
              Every idea deserves a place — whether it's a joke, a deep thought,
              or something random. Share it. Shape it. Start something.
            </p>
            <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
              <button className=" w-1/2 md:w-1/3 h-10 bg-[#ff7300] cursor-pointer text-[#000000] font-bold text-sm md:text-base rounded-xl shadow-lg transition-all duration-300 transform hover:bg-[#f1e2c3] hover:-rotate-3 hover:scale-105 hover:shadow-xl">
                Get Started<span className="ml-1">→</span>
              </button>
            </SignInButton>
          </div>

          <div className="relative w-full md:w-[400px] h-[200px] flex items-center justify-center mt-6 md:mt-0">
            <img
              src={auto}
              alt="Abstract art"
              className="absolute w-40 h-28 md:w-64 md:h-44 rounded-xl object-cover shadow-lg"
              style={{
                transform: "rotate(-20deg) translateX(-120%) translateY(20%)",
                zIndex: 1,
              }}
            />
            <img
              src={dump}
              alt="Graffiti"
              className="absolute w-40 h-28 md:w-64 md:h-44 rounded-xl object-cover shadow-lg"
              style={{
                transform: "rotate(20deg) translateX(120%) translateY(20%)",
                zIndex: 1,
              }}
            />
            <img
              src={kid}
              alt="Creative kid"
              className="absolute w-40 h-28 md:w-64 md:h-44 rounded-xl object-cover shadow-2xl"
              style={{
                transform: "rotate(-5deg)",
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="slide slide-2 h-full flex items-center justify-center px-4 md:px-20 min-w-[80vw] relative overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-4xl">
            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-bitcount font-bold text-[#cfbfa0] text-center mb-2">
              Interact Like Never Before
            </h1>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full md:w-1/2 h-auto rounded-xl"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <p
                ref={postedTextRef}
                className="text-[#ff7300] text-center font-extralight font-michroma text-lg md:text-3xl p-2 w-full md:w-1/2"
              >
                Everything is meant to be posted
              </p>
            </div>

            <p className="text-[#cfbfa0] text-center text-base md:text-xl font-light font-josefin max-w-2xl mt-2">
              Experience seamless connection through intuitive gestures and
              responsive design.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide slide-3 h-auto min-h-screen flex flex-col md:flex-row items-center justify-around px-4 md:px-20 min-w-[70vw] relative">
          <div className="relative z-10 max-w-md flex flex-col items-start gap-4 text-center md:text-left">
            <p className="text-reveal text-[#cfbfa0] font-josefin text-xl md:text-3xl font-light leading-relaxed">
              “Collect ideas, showcase moments, and build a visual diary
              that&apos;s uniquely yours. Your space, your rules.” —{" "}
              <span className="bg-[#ff0000] text-[#f1d2ca] font-medium">
                Artistic Freedom
              </span>
            </p>
          </div>

          <div className="z-10 grid grid-cols-2 gap-3 md:gap-4 ">
            <img
              src={camera}
              alt="Camera"
              className="rounded-lg object-cover w-28 h-28 md:w-[200px] md:h-[200px]"
            />
            <img
              ref={targetImageRef}
              src={post}
              alt="Post"
              className="rounded-lg object-cover w-28 h-28 md:w-[200px] md:h-[200px]"
            />
            <img
              src={poloroaid}
              alt="Polaroid"
              className="rounded-lg object-cover w-28 h-28 md:w-[200px] md:h-[200px]"
            />
            <img
              src={likes}
              alt="Likes"
              className="rounded-lg object-cover w-28 h-28 md:w-[200px] md:h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalPage;
