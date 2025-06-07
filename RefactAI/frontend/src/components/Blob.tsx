// Blob.tsx
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Mesh, Vector3 } from "three";



const Blob: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { mouse } = useThree();
  const targetPosition = new Vector3();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      setScrollProgress(Math.min(scrollY / maxScroll, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ camera }) => {
    // Make blob follow mouse slightly
    targetPosition.set(mouse.x * 2, mouse.y * 2, 0);
    meshRef.current.position.lerp(targetPosition, 0.05);

    // Scale down based on scroll
    const scale = 2.2 * (1 - scrollProgress * 0.5);
    meshRef.current.scale.set(scale, scale, scale);

    // Rotation
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={hovered ? "#4d20b4" : "#7B68EE"} // Crimson on hover, LightBlue default
        emissive="#4d20b4"
        distort={0.6 - scrollProgress * 0.3}
        speed={2.5}
        roughness={0.1}
        emissiveIntensity={hovered ? 1 : 0.3}
        transparent
        opacity={1 - scrollProgress * 0.7}
      />
    </mesh>
  );
};

export default Blob;
