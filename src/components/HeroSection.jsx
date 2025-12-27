import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({
  image,
  video,
  title,
  subtitle,
  breadcrumb = [],
  size = "normal",            // small | normal | large | fullscreen
  animatedOverlay = false,    // true for gradient animation (Achievements style)
}) => {
  /* ================= ANIMATIONS ================= */
  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  /* ================= HEIGHT PRESETS ================= */
  const heightClasses = {
    small: "h-[45vh] md:h-[55vh]",
    normal: "h-[60vh] md:h-[70vh]",
    large: "h-[70vh] md:h-[80vh]",
    fullscreen: "h-screen",
  };

  const heroHeight = heightClasses[size] || heightClasses.normal;

  return (
    <section
      className={`relative w-full overflow-hidden ${heroHeight}`}
    >
      {/* ============== BACKGROUND (VIDEO / IMAGE) ============== */}
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* ============== OVERLAY ============== */}
      {animatedOverlay ? (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/70 animate-gradientMove" />
      ) : (
        <div className="absolute inset-0 z-10 bg-black/50" />
      )}

      {/* ============== CONTENT ============== */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="text-xs md:text-sm text-gray-200 mb-4 flex items-center gap-1">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#FCA61B] font-semibold">
                    {item.label}
                  </span>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="mx-1 text-gray-400">/</span>
                )}
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
            drop-shadow-2xl
          "
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-4 text-base md:text-xl text-white max-w-2xl drop-shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* ============== ANIMATED GRADIENT CSS ============== */}
      {animatedOverlay && (
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradientMove {
            background-size: 200% 200%;
            animation: gradientMove 20s ease infinite;
          }
        `}</style>
      )}
    </section>
  );
};

export default HeroSection;
