import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const categoryImages = {
  "Student Life": [studentlife1, studentlife2, studentlife3],
  Travel: [travel1, travel2, travel3],
  Sports: [sports1, sports2, sports3],
  Creativity: [creativity1, creativity2, creativity3],
};

const categories = Object.keys(categoryImages);

const WellBeingSection = () => {
  const [activeTab, setActiveTab] = useState("Student Life");
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = categoryImages[activeTab];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab, images.length]);

  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    // ✅ No extra px/py — padding is handled by the wrapper section in Home.jsx
    <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">

      {/* ✅ Consistent three-line header */}
      <div className="text-center mb-10">
        <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
          Student Life
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
          Well-Balanced Well-Being
        </h2>
        <p className="mt-4 text-gray-500 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          You are no one thing. Here, we make balance a priority so you can
          bring your full self to every opportunity.
        </p>
      </div>

      {/* ✅ Tabs — amber for active state, consistent with brand */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentIndex(0); }}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#FCA61B] text-white shadow-md shadow-[#FCA61B]/30"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#0F75BD] hover:text-[#0F75BD]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl shadow-xl border border-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeTab}-${currentIndex}`}
            src={images[currentIndex]}
            alt={`${activeTab} ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) goNext();
              if (info.offset.x > 50) goPrev();
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay for dot visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* ✅ Lucide arrow buttons — consistent with rest of site */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <motion.span
              key={idx}
              className="rounded-full cursor-pointer"
              onClick={() => setCurrentIndex(idx)}
              animate={{
                width: idx === currentIndex ? 20 : 8,
                height: 6,
                backgroundColor: idx === currentIndex ? "#FCA61B" : "#ffffff80",
                borderRadius: 4,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Tab label below carousel */}
      <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
        {activeTab} · {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default WellBeingSection;