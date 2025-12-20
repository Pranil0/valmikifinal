import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({ image, title, subtitle, breadcrumb = [] }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-4">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="text-xs md:text-sm text-gray-200">
            {breadcrumb.map((item, idx) => (
              <span key={idx}>
                {item.link ? (
                  <Link to={item.link} className="hover:text-white">{item.label}</Link>
                ) : (
                  <span className="text-[#FCA61B] font-medium">{item.label}</span>
                )}
                {idx < breadcrumb.length - 1 && <span className="mx-1 text-gray-300">/</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent drop-shadow-lg"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-white max-w-2xl"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
