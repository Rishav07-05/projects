// src/hooks/use-screen-size.ts
import { useState, useEffect } from 'react';

const UseScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lessThan = (breakpoint: string) => {
    const breakpoints: Record<string, number> = {
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    };
    
    return screenSize.width < (breakpoints[breakpoint] || 0);
  };

  return { ...screenSize, lessThan };
};

export default UseScreenSize;