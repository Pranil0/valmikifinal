import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({ image, title, subtitle, breadcrumb = [] }) => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay (IMPORTANT FIX) */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10"></div>

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-xs md:text-sm text-gray-200">
          {breadcrumb.map((item, idx) => (
            <span key={idx}>
              {item.link ? (
                <Link
                  to={item.link}
                  className="hover:text-white transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#FCA61B] font-medium">
                  {item.label}
                </span>
              )}
              {idx < breadcrumb.length - 1 && (
                <span className="mx-1 text-gray-300">/</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Center Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-white max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

      </div>
    </section>
  );
};

export default HeroSection;
