import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import images
import studentlife1 from "../assets/wellbeing/studentlife1.webp";
import studentlife2 from "../assets/wellbeing/studentlife2.webp";
import studentlife3 from "../assets/wellbeing/studentlife3.webp";

import travel1 from "../assets/wellbeing/travel1.webp";
import travel2 from "../assets/wellbeing/travel2.webp";
import travel3 from "../assets/wellbeing/travel3.webp";

import sports1 from "../assets/wellbeing/sports1.webp";
import sports2 from "../assets/wellbeing/sports2.webp";
import sports3 from "../assets/wellbeing/sports3.webp";

import creativity1 from "../assets/wellbeing/creativity1.webp";
import creativity2 from "../assets/wellbeing/creativity2.webp";
import creativity3 from "../assets/wellbeing/creativity3.webp";

const WellBeingSection = () => {
  const categories = ["Student Life", "Travel", "Sports", "Creativity"];
  const [activeTab, setActiveTab] = useState("Student Life");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryImages = {
    "Student Life": [studentlife1, studentlife2, studentlife3],
    Travel: [travel1, travel2, travel3],
    Sports: [sports1, sports2, sports3],
    Creativity: [creativity1, creativity2, creativity3],
  };

  const images = categoryImages[activeTab];

  // Automatic slideshow every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Manual navigation
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F75BD]">
          Well-Balanced Well-Being
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
          You are no one thing. Here, we make balance a priority so you can
          bring your full self to every opportunity.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {categories.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
              activeTab === tab
                ? "bg-[#0F75BD] text-white shadow-lg"
                : "bg-gray-100 text-[#0F75BD] hover:bg-[#0F75BD] hover:text-white"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentIndex(0); // reset slideshow when switching tabs
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="mt-6 max-w-4xl mx-auto relative h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${activeTab} ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) goNext(); // swipe left
              if (info.offset.x > 50) goPrev();  // swipe right
            }}
          />
        </AnimatePresence>

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
       {/* Dot Indicators */}
<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
  {images.map((_, idx) => (
    <motion.span
      key={idx}
      className="rounded-full cursor-pointer shadow-sm"
      onClick={() => setCurrentIndex(idx)}
      animate={{
        width: idx === currentIndex ? 16 : 10, // active dot bigger
        height: 6,                             // thin oval shape
        backgroundColor: idx === currentIndex ? "#0F75BD" : "#CBD5E0",
        borderRadius: 4,
      }}
      transition={{ duration: 0.3 }}
    />
  ))}
</div>

      </div>
    </section>
  );
};

export default WellBeingSection;
