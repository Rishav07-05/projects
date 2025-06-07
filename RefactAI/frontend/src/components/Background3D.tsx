// Background3D.tsx
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import Blob from "./Blob";

// Background3D.tsx
const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} />
        <Blob />
      </Canvas>
    </div>
  );
};

export default Background3D;
