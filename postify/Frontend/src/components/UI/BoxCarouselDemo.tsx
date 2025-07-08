"use client";

import { useRef, useEffect, useState } from "react";
import BoxCarousel, {
  type BoxCarouselRef,
  type CarouselItem,
} from "../../fancy/components/carousel/box-carousel";

const cube4 =
  "https://res.cloudinary.com/dzcdallla/image/upload/cube4_cjbqai.jpg";
const cube1 =
  "https://res.cloudinary.com/dzcdallla/video/upload/cube1_uulgjn.mp4";

const carouselItems: CarouselItem[] = [
  { id: "3", type: "video", src: "null" },
  { id: "1", type: "video", src: cube1, alt: "Blurry poster" },
  { id: "2", type: "video", src: "null" },
  {
    id: "4",
    type: "image",
    src: cube4,
    alt: "Blurry portrait photo of a person",
  },
];

export default function BoxCarouselDemo() {
  const carouselRef = useRef<BoxCarouselRef>(null);

  const getCarouselSize = () => {
    if (typeof window === "undefined") return { width: 750, height: 450 }; 
    if (window.innerWidth < 480) return { width: 200, height: 150 };
    if (window.innerWidth < 768) return { width: 300, height: 200 };
    return { width: 750, height: 450 };
  };

  const [carouselSize, setCarouselSize] = useState(getCarouselSize());

  useEffect(() => {
    const handleResize = () => setCarouselSize(getCarouselSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIndexChange = (index: number) => {
    console.log("Index changed:", index);
  };

  return (
    <div className="w-full max-w-4xl h-full p-6 flex justify-center items-center bg-transparent">
      <div className="space-y-20">
        <div className="text-center mb-8">
          <p className="text-xs text-neutral-300 mb-1 font-josefin">
            INTERACTIVE ELEMENT
          </p>
          <h1 className="text-lg sm:text-xl font-medium text-[#ff7300] font-michroma">
            ← Slide me →
          </h1>
        </div>

        <div className="flex justify-center">
          <BoxCarousel
            className="transition-all duration-300"
            ref={carouselRef}
            items={carouselItems}
            width={carouselSize.width}
            height={carouselSize.height}
            direction="right"
            onIndexChange={handleIndexChange}
            enableDrag
            perspective={1000}
          />
        </div>
      </div>
    </div>
  );
}
