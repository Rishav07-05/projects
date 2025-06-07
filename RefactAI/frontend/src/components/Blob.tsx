// Blob.tsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Mesh } from "three";

const Blob: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004;
      meshRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 2.6 : 2.2}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={hovered ? "#FF00FF" : "#00FFFF"} // vibrant contrast
        distort={0.6}
        speed={2.5}
        roughness={0.1}
        emissive="#00FFFF"
        emissiveIntensity={hovered ? 1 : 0.3}
      />
    </mesh>
  );
};

export default Blob;
