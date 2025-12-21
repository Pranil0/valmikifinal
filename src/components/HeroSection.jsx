import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({ image, title, subtitle, breadcrumb = [] }) => {
  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Title and Breadcrumb Wrapper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-20">
        {/* Breadcrumb just above title */}
        {breadcrumb.length > 0 && (
          <nav className="text-xs md:text-sm text-gray-200 mb-2 flex items-center gap-1">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#FCA61B] font-semibold">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <span className="mx-1 text-gray-400">/</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <motion.h1
          className="
            text-3xl md:text-5xl lg:text-6xl 
            font-extrabold
            bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B]
            bg-clip-text text-transparent
            drop-shadow-lg
            pointer-events-none
            text-center
          "
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        {/* Subtitle below title */}
        {subtitle && (
          <motion.p
            className="mt-4 text-base md:text-xl text-white max-w-2xl text-center"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
