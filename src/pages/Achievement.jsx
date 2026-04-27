import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

// Assets
import valmikibuilding from "../assets/valmikibuilding.png";

// Co-curricular images
import first from "../assets/co-curricularexcellence1.webp";
import second from "../assets/co-curricularexcellence2.webp";
import third from "../assets/co-curricularexcellence3.webp";
import four from "../assets/gallery/sports/sports1.jpg";

// Toppers images
import five from "../assets/topper 1 image.webp";
import six from "../assets/topper 2 image.webp";
import seven from "../assets/topper 3 iamge.webp";
import eight from "../assets/topper 4 image.webp";

import { FaDownload } from "react-icons/fa";
import CTA from "../components/CTA";

// ===================== Counter Component =====================
const CounterBox = ({ end, label, suffix = "+" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3"
    >
      <span className="text-lg md:text-xl font-extrabold text-[#FCA61B] leading-none">
        {inView ? <CountUp end={end} duration={5} /> : "0"}
        {suffix}
      </span>
      <span className="text-xs text-white/60 mt-1 whitespace-nowrap">{label}</span>
    </div>
  );
};

// ===================== Main Achievement Component =====================
export default function Achievement() {
  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative w-full h-[52vh] md:h-[60vh] overflow-hidden">

        {/* Building image */}
        <img
          src={valmikibuilding}
          alt="Valmiki Shiksha Sadan campus"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.80) 100%)",
          }}
        />

        {/* Content — vertically centered like inquiry page */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">

          {/* ✅ Breadcrumb — sits just above badge, centered in hero */}
          <nav className="flex justify-center items-center gap-2 text-xs text-white/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-[#FCA61B] font-semibold">Achievements</span>
          </nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-[#FCA61B]/15 border border-[#FCA61B]/35 text-[#FCA61B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
          >
            Hall of Excellence
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
              Achievements
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm text-white/60 mb-6 max-w-md leading-relaxed"
          >
            Celebrating years of academic, sports &amp; co-curricular excellence
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <CounterBox end={3000} label="Students Graduated" />
            <CounterBox end={150} label="Awards & Recognitions" />
            <CounterBox end={500} label="Global Alumni Network" />
          </motion.div>
        </div>
      </section>

      {/* ====== ACADEMIC ACHIEVEMENTS (TOPPERS) ====== */}
      <Section
        title="Academic Achievements"
        subtitle="Our toppers continue to inspire excellence every year."
        images={[five, six, seven, eight]}
        pdfFile="/assets/toppers.pdf"
      />

      {/* ====== CO-CURRICULAR EXCELLENCE ====== */}
      <Section
        title="Co-Curricular Excellence"
        subtitle="Students excel in sports, arts, debates, and creativity."
        images={[first, second, third, four]}
        bg="bg-gray-50"
      />

      <CTA />
    </>
  );
}

// ===================== Section Component =====================
function Section({ title, subtitle, images, bg = "bg-white", pdfFile }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={`${bg} py-10 md:py-12 px-6 md:px-12 lg:px-20`}>
      {/* Section Heading */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
          {title}
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* ✅ Image Grid — 2 cols on mobile so all 4 images visible */}
      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md transition-transform duration-500 cursor-pointer hover:scale-105"
            variants={cardVariants}
          >
            <img
              src={img}
              alt={`Achievement ${idx + 1}`}
              // ✅ Responsive height — no cut-off on mobile
              className="w-full h-40 sm:h-48 md:h-52 lg:h-60 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* PDF Download Block */}
      {pdfFile && (
        <motion.div
          className="mt-12 max-w-4xl mx-auto p-6 bg-[#F0F4FF] rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD]">
              View Detailed Academic Records
            </h3>
            <p className="mt-1 text-sm md:text-base text-gray-700 max-w-md">
              Download the full list of toppers and their achievements for each year.
            </p>
          </div>
          
           <a href={pdfFile}
            download="Toppers_Academic_Achievements.pdf"
            className="inline-flex items-center gap-2 bg-[#FCA61B] text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
          >
            <FaDownload />
            Download PDF
          </a>
        </motion.div>
      )}
    </section>
  );
}