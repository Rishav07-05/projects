import { useEffect, useRef } from "react";
import gsap from "gsap";

const LandingPage = () => {
  const textRefs = useRef([]); // Array of refs
  const imageRef = useRef(null); // Single ref for the image

  useEffect(() => {
    // Animate the text
    textRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 }, // Start state
          { opacity: 1, y: 0, delay: index * 0.3, duration: 1.2, ease: "power3.out" } // End state
        );
      }
    });

    // Animate the image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0, opacity: 0 }, // Start state
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.6)", delay: 0.9 } // End state
      );
    }
  }, []);

  return (
    <div className="h-screen bg-zinc-900 w-full pt-1">
      <div className="textstructure mt-60 px-20">
        {["We Create", "Eye-Opening", "Presentations"].map((item, index) => (
          <div className="masker" key={index}>
            <div className="w-fit flex">
              {index === 1 && (
                <div
                  ref={imageRef} // Assign ref to the image
                  className="w-[10vw] h-[6.5vw] mr-5 bg-[url('https://ochi.design/wp-content/uploads/2022/04/content-image01.jpg')] relative -bottom-[.7vw] -right-5"
                ></div>
              )}
              <h1
                ref={(el) => (textRefs.current[index] = el)} // Assign ref to each text element
                className={`uppercase text-[9vw] leading-[8vw] font-semibold tracking-tighter font-['founders grotesk'] ${
                  index === 0
                    ? "text-[lightblue]"
                    : index === 1
                    ? "text-[lightgoldenrodyellow]"
                    : "text-[palegreen]"
                }`}
              >
                {item}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-[1px] border-zinc-700 mt-36 flex justify-between items-center py-5 px-20">
        {["For public and private companies", "From the first pitch to IPO"].map(
          (item, index) => (
            <div className="masker" key={index}>
              <p
                className={`text-md font-light tracing-tight leading-none font-['Neue Montreal'] ${
                  index ? "text-[#e8ffe8]" : "text-[#e8ffe8]"
                }`}
              >
                {item}
              </p>
            </div>
          )
        )}
        <div className="start">
          <div className="px-4 py-2 border-[2px] rounded-full border-t-red-400 border-b-blue-400 border-l-red-400 border-r-blue-400 text-white font-bold text-lg bg-transparent transition-all duration-300 hover:text-green-400 hover:border-green-400 hover:shadow-[0_0_20px_5px_rgba(0,255,0,0.6)] shadow-[0_0_20px_rgba(255,0,0,0.7),0_0_20px_rgba(0,0,255,0.7)]">
            Start the project
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
