import React, { useState, useEffect  } from 'react'
import Home from './Home';
import { motion } from 'framer-motion';

const Hoveranim = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: window.innerWidth < 768 ? 100 : 200 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (window.innerWidth < 768 ? 1.5 : 2) + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      }));
    };
    setStars(generateStars());
  }, []);
  

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

  };
  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Space scene container with mask */}
      <div className="absolute inset-0" style={{
        opacity: isHovering ? 1 : 0,
        transition: 'opacity 0.3s ease',
        maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
          white 0%,
          rgba(255, 255, 255, 0.5) 70%,
          transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
          white 0%,
          rgba(255, 255, 255, 0.5) 70%,
          transparent 100%)`
      }}>
        <div className="absolute z-10 inset-0 flex items-center justify-center">
          <div className="relative w-fit h-full  overflow-hidden">            
            <img
              src="/hero_home.png"
              alt="Space Object"
              className="relative w-full h-full  opacity-90 "

            />
          </div>
        </div>
          <div className="absolute left-16 top-16">
    
          <motion.div
            className="relative w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500"
            animate={{
              scale: [1,1.04,1],
              rotate: 360
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <motion.div
              className="absolute inset-0 w-fit h-fit rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-md"
              animate={{
                scale: [1.1, 1.2, 1.1],
                opacity: [0.8, 0.3, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            {/* Solar flares */}
            <motion.div
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] rounded-full bg-gradient-to-br from-yellow-300/30 to-orange-500/30 blur-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: -360
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Moon */}
        <div className="absolute right-24 top-24 w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-400">
          <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-gray-300 opacity-60" />
          <div className="absolute top-16 right-10 w-4 h-4 rounded-full bg-gray-300 opacity-60" />
          <div className="absolute bottom-8 left-12 w-5 h-5 rounded-full bg-gray-300 opacity-60" />
        </div>

        {/* Distant planets */}
        <motion.div
          className="absolute left-1/4 top-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-700"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />



        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((star, index) => (
            <motion.div
              key={index}
              className="absolute bg-white rounded-full"
              initial={{ opacity: star.opacity }}
              animate={{
                opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(123, 97, 255, 0.2) 0%,
            rgba(71, 98, 255, 0.1) 50%,
            rgba(71, 98, 255, 0) 100%)`
        }} />
      </div>
      <div className="absolute w-full h-full">
                      <Home />
        </div>
      </div>
  )
}

export default Hoveranim