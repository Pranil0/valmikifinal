import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

// Assets
import valmikibuilding from "../assets/valmikibuilding.png";
import achivementVideo from "../assets/achivement.mp4";

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


import toppersPDF from "../assets/toppers.pdf";
import { FaDownload } from "react-icons/fa"; // For download icon
import CTA from "../components/CTA";

// ===================== Counter Component =====================
const CounterBox = ({ end, label, suffix = "+" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center text-white">
      <h3 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
        {inView && <CountUp end={end} duration={3} />} {suffix}
      </h3>
      <p className="mt-2 text-sm md:text-base opacity-90">{label}</p>
    </div>
  );
};

// ===================== Main Achievement Component =====================
export default function Achievement() {
  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const heroStatsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <video
          src={achivementVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70 animate-gradientMove pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Breadcrumb */}
          <nav className="absolute top-10 text-xs md:text-sm text-gray-200">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1 text-gray-300">/</span>
            <span className="text-[#FCA61B] font-medium">Achievements</span>
          </nav>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent drop-shadow-xl"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
          >
            Achievements
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-4 text-sm md:text-lg text-gray-100 max-w-3xl opacity-95"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Celebrating excellence in academics, co-curricular activities and
            the inspiring impact of our students and alumni.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
            variants={heroStatsVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <CounterBox end={5000} label="Students Graduated" />
            <CounterBox end={150} label="Awards & Recognitions" />
            <CounterBox end={1000} label="Global Alumni Network" />
          </motion.div>
        </div>

        {/* Animated Gradient */}
        <style jsx>{`
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
      </section>

      {/* ====== ACADEMIC ACHIEVEMENTS (TOPPERS) ====== */}
      <Section
  title="Academic Achievements"
  subtitle="Our toppers continue to inspire excellence every year."
  images={[five, six, seven, eight]}
  pdfFile={toppersPDF}
/>

<Section
  title="Co-Curricular Excellence"
  subtitle="Students excel in sports, arts, debates, and creativity."
  images={[first, second, third, four]}
  bg="bg-gray-50"
/>
<CTA/>

    </>
  );
}

// ===================== Section Component (Staggered Fade-Up) =====================
function Section({ title, subtitle, images, bg = "bg-white", pdfFile }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
      {/* Title + Subtitle */}
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">{title}</h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
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
              className="w-full h-60 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* PDF Download Highlight Card */}
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

          <a
            href={pdfFile}
            download="Toppers_Academic_Achievements.pdf"
            className="inline-flex items-center gap-2 bg-[#FCA61B] text-[#0F75BD] px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
          >
            <FaDownload />
            Download PDF
          </a>
        </motion.div>
      )}
   
    </section>
    
  );
}
