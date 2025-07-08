// src/components/DragElements.tsx
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type DragElementsProps = {
  children: React.ReactNode;
  dragMomentum?: boolean;
  className?: string;
};

const DragElements = ({
  children,
  dragMomentum = true,
  className = "",
}: DragElementsProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [zIndices, setZIndices] = useState<number[]>([]);

  useEffect(() => {
    setZIndices(
      Array.from({ length: React.Children.count(children) }, (_, i) => i)
    );
  }, [children]);

  return (
    <div ref={constraintsRef} className={`relative w-full h-full ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.5}
          dragTransition={{
            bounceStiffness: 200,
            bounceDamping: dragMomentum ? 300 : 1000,
          }}
          style={{ zIndex: zIndices[index] }}
          className="absolute"
          whileDrag={{ zIndex: 999 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default DragElements;
