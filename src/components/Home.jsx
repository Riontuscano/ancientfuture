import React from 'react'
import { motion } from "framer-motion";
import './Home.css'


const home = () => {
  return (
    <div className="flex items-center justify-center h-screen cursor-default">
      <motion.h1
        className="text-center text-6xl md:text-9xl text-gold tracking-wide font-ancient"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        ANCIENT FUTURE
      </motion.h1>

    </div>
  )
}

export default home