import useScreenSize from "../../hook/UseScreenSize";
import Gravity, {
  MatterBody,
} from "../../fancy/components/physics/cursor-attractor-and-gravity";

export default function Preview() {
  const screenSize = useScreenSize();

  const getImageCount = () => {
    if (screenSize.lessThan("sm")) return 50;
    if (screenSize.lessThan("md")) return 60;
    if (screenSize.lessThan("lg")) return 70;
    return 80;
  };

  const getMaxSize = () => {
    if (screenSize.lessThan("sm")) return 40;
    if (screenSize.lessThan("md")) return 50;
    return 60;
  };

  const getMinSize = () => {
    if (screenSize.lessThan("sm")) return 10;
    if (screenSize.lessThan("md")) return 20;
    return 20;
  };

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      {/* Centered text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4">
        <p className="text-4xl sm:text-4xl md:text-6xl font-bold font-bitcount text-[#ff7300] tracking-wide leading-tight">
          Join the Creative Community
        </p>
        <p className="text-sm sm:text-base md:text-lg text-[#cfbfa0] mt-4">
          Where imagination meets inspiration. Be part of something bigger.
        </p>
      </div>

      {/* Gravity effect */}
      <Gravity
        attractorPoint={{ x: "33%", y: "50%" }}
        attractorStrength={0.0005}
        cursorStrength={-0.004}
        cursorFieldRadius={screenSize.lessThan("sm") ? 100 : 200}
        className="w-full h-[85vh] border-none"
      >
        {[...Array(getImageCount())].map((_, i) => {
          const size = Math.max(getMinSize(), Math.random() * getMaxSize());
          return (
            <MatterBody
              key={i}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 30}%`}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{ width: `${size}px`, height: `${size}px` }}
              >
                <img
                  src={`https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "men" : "women"
                  }/${i}.jpg`}
                  alt={`Avatar ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </MatterBody>
          );
        })}
      </Gravity>
    </div>
  );
}
