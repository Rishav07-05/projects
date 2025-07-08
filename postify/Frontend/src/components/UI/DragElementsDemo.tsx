import React from "react";
import useScreenSize from "../../hook/UseScreenSize";
import DragElements from "../../fancy/components/blocks/drag-elements";
import kidImage from "../../assets/kid.jpg";

const urls = [kidImage, kidImage, kidImage, kidImage, kidImage];

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DragElementsDemo: React.FC = () => {
  const screenSize = useScreenSize();

  return (
    <div className="w-dvw h-dvh relative bg-[#eff3c8] overflow-hidden">
      <h1 className="absolute text-xl md:text-4xl md:ml-36 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full">
        all your
        <span className="font-bold text-foreground dark:text-muted">
          {" "}
          memories.{" "}
        </span>
      </h1>

      <DragElements dragMomentum={false} className="p-40">
        {urls.map((url, index) => {
          const rotation = randomInt(-12, 12);
          const width = screenSize.lessThan(`md`)
            ? randomInt(90, 120)
            : randomInt(120, 150);
          const height = screenSize.lessThan(`md`)
            ? randomInt(120, 140)
            : randomInt(150, 180);

          return (
            <div
              key={index}
              className="flex items-start justify-center bg-white shadow-2xl p-4"
              style={{
                transform: `rotate(${rotation}deg)`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: `${width - 4}px`,
                  height: `${height - 30}px`,
                }}
              >
                <img
                  src={url}
                  alt={`Analog photo ${index + 1}`}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </DragElements>
    </div>
  );
};

export default DragElementsDemo;
