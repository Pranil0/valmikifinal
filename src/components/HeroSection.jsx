import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({
  image,
  video,
  title,
  subtitle,
  breadcrumb = [],
  badge,
  size = "normal",
  titleStyle = "white",
  overlayStyle = "bottom-heavy",
}) => {

  const heightClasses = {
    compact:    "h-[40vh] md:h-[48vh]",
    small:      "h-[45vh] md:h-[55vh]",
    normal:     "h-[60vh] md:h-[70vh]",
    large:      "h-[70vh] md:h-[82vh]",
    fullscreen: "h-screen",
  };

  const heroHeight = heightClasses[size] ?? heightClasses.normal;

  const overlayStyle_map = {
    "bottom-heavy": "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.82) 100%)",
    "uniform":      "rgba(0,0,0,0.52)",
  };

  return (
    <section className={`relative w-full overflow-hidden ${heroHeight}`}>

      {/* background */}
      {video ? (
        <video
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
      )}

      {/* ── overlay — ADD THIS LINE ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: overlayStyle_map[overlayStyle] ?? overlayStyle_map["bottom-heavy"] }}
      />

      {/* content — position unchanged */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pt-10">

        {breadcrumb.length > 0 && (
          <nav className="flex justify-center items-center gap-2 text-xs text-white/50 mb-4">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {item.link
                  ? <Link to={item.link} className="hover:text-white transition-colors">{item.label}</Link>
                  : <span className="text-[#FCA61B] font-semibold">{item.label}</span>
                }
                {i < breadcrumb.length - 1 && <span className="text-white/30">/</span>}
              </span>
            ))}
          </nav>
        )}

        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-[#FCA61B]/15 border border-[#FCA61B]/35 text-[#FCA61B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-3xl md:text-5xl font-extrabold leading-tight mb-2 drop-shadow-xl
            ${titleStyle === "gradient"
              ? "bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent"
              : "text-white"
            }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default HeroSection;