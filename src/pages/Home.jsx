import React from "react";
import {
  Target,
  Flag,
  BookOpen,
  Users,
  Award,
  Atom,
  Briefcase,
  Handshake,
  Shapes,
  Lightbulb,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import valmikibuilding from "../assets/valmikibuilding.png";
import graduation from "../assets/graduation.png";
import vector from "../assets/vector.png";
import aa from "../assets/aa.png";
import valmikicollegebuilding from "../assets/valmikicollegebuilding.jpg";
import  { useRef } from "react";
import bell from "../assets/bell.png";
import tt from "../assets/tt.png";
import volunteer from "../assets/volunteer.png";
import corevalues from "../assets/corevalue.webp";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";
import forth from "../assets/forth.png";
import cloud from "../assets/cloud.png";
import landinghero1 from "../assets/landinghero1.mp4";
import WellBeingSection from "../components/WellBeingSection";
import VisionMissionSection from "../components/VisionMissionSection";

import NewsList from "../components/NewsList";
import CTA from "../components/CTA";
import ProgramsSection from "../components/ProgramSection";

// ✅ Counter Box Component
const CounterBox = ({ end, label, suffix = "+" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center text-white">
      <h3 className="text-3xl md:text-4xl font-bold">
        {inView && <CountUp end={end} duration={3} />} {suffix}
      </h3>
      <p className="mt-1 text-sm md:text-base">{label}</p>
    </div>
  );
};

const Home = () => {

  const programsRef = useRef(null);

  const scrollToPrograms = () => {
    programsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
const titleVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const listContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
  return (
    <>
<section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Video */}
      <video
        src={landinghero1}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/70 animate-gradientMove pointer-events-none" />

      {/* Hero Content */}
      <motion.div
        className="relative text-center text-white max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl"
          variants={textVariants}
        >
          VALMIKI SHIKSHA SADAN
        </motion.h1>

        <motion.h2
          className="mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-lg"
          variants={textVariants}
        >
          Where Excellence Prevails
        </motion.h2>

        <motion.p
          className="mt-4 text-sm md:text-base lg:text-lg text-white leading-relaxed drop-shadow-md"
          variants={textVariants}
        >
          Since 1996, empowering students from Play Group to +2 with academic
          brilliance, holistic growth, and inclusive education.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          variants={buttonVariants}
        >
          <button
  onClick={scrollToPrograms}
  className="bg-[#0F75BD] hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium shadow-lg transition"
>
  Explore Our Streams
</button>


          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#007B19] hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium shadow-lg transition"
          >
            Request Admission Info
          </button>
        </motion.div>
      </motion.div>

      {/* Animated Gradient CSS */}
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
</section>

      {/* ====== WAVE / CAP SECTION ====== */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="relative bg-[#0F75BD]">
          <div className="mx-auto max-w-7xl py-10 md:py-14 flex items-center justify-center">
            <img
              src={graduation}
              alt="Graduation Cap"
              className="w-20 md:w-28 object-contain drop-shadow"
            />
          </div>

          {/* white cloud-like shapes */}
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute left-10 top-6">
              <div className="relative">
                <div className="w-20 h-7 bg-white rounded-full shadow-md" />
                <div className="w-7 h-7 bg-white rounded-full shadow-md absolute -top-3 left-3" />
                <div className="w-9 h-9 bg-white rounded-full shadow-md absolute -top-4 left-10" />
              </div>
            </div>
            <div className="absolute right-10 top-8">
              <div className="relative">
                <div className="w-20 h-7 bg-white rounded-full shadow-md" />
                <div className="w-7 h-7 bg-white rounded-full shadow-md absolute -top-3 left-2" />
                <div className="w-8 h-8 bg-white rounded-full shadow-md absolute -top-4 left-9" />
              </div>
            </div>
          </div>

          <svg
            className="absolute -bottom-px left-0 w-full h-20 md:h-24"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="#ffffff"
              d="M0,224 C160,176 320,96 480,96 C640,96 800,176 960,202.7 C1120,229.3 1280,213.3 1440,170.7 L1440,320 L0,320 Z"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-14 md:pt-12 md:pb-16">
          <div className="flex justify-center">
            <div className="relative inline-block">
              <span className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-black/10" />
              <button className="relative rounded-full px-10 md:px-12 py-3 md:py-4 bg-[#FCA61B] text-white text-sm md:text-base font-semibold tracking-wide shadow-md">
                Join Us Now
              </button>
            </div>
          </div>

          <img
            className="hidden sm:block pointer-events-none select-none absolute left-4 bottom-2 w-24 md:w-28"
            src="https://openclipart.org/download/194824/kid-jump.svg"
            alt="Kid jumping (left)"
          />
          <img
            className="hidden sm:block pointer-events-none select-none absolute right-4 bottom-2 w-24 md:w-28"
            src="https://openclipart.org/download/204130/jumping-girl.svg"
            alt="Kid jumping (right)"
          />
        </div>
      </section>

{/* ====== VISION & MISSION SECTION ====== */}
<VisionMissionSection
  description="Founded in 1996 (2053 B.S.), Valmiki Shiksha Sadan has grown into one of Chitwan’s most trusted institutions."
  vision={{
    title: "Vision",
    text: "To be the first choice for guardians and students seeking academic excellence and all-round personal growth.",
    icon: <Target className="w-7 h-7" />,
  }}
  mission={{
    title: "Mission",
    text: "To nurture well-rounded learners through experienced educators, modern facilities, and value-driven education.",
    icon: <Flag className="w-7 h-7" />,
  }}
/>




      {/* ====== COUNTER SECTION ====== */}
      <section className="relative py-16 px-6">
        <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <img
            src={valmikicollegebuilding}
            alt="Valmiki College Building"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-[#0F75BD]/95" />

          <div className="relative px-6 py-10 md:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/25 text-center text-white gap-y-6 md:gap-y-0">
              <CounterBox end={5000} label="Students Enrolled" />
              <CounterBox end={800} label="Lecturers" suffix="" />
              <CounterBox end={18} label="Programs" />
              <CounterBox end={600} label="Graduated" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== OUR PROGRAMS / STREAMS SECTION ====== */}
   {/* ====== OUR PROGRAMS / STREAMS SECTION ====== */}
<div ref={programsRef}>
  <ProgramsSection />
</div>


  {/* ====== WELL-BALANCED WELL-BEING SECTION ====== */}
<section className="relative bg-gray-50 py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
    <WellBeingSection />
  </div>
</section>
{/* ====== CORE VALUES SECTION ====== */}

{/* ====== CORE VALUES SECTION ====== */}
<section className="relative bg-white py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

    {/* Title */}
    <motion.div
      className="text-center mb-12"
      variants={titleVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-[#0F75BD] font-semibold uppercase tracking-wider text-xs md:text-sm">
        Our Values
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        The Core Values That Shape Us
      </h2>
    </motion.div>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* Left Image */}
      <motion.div
        className="flex justify-center md:justify-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative md:translate-x-16">
          <img
            src={corevalues}
            alt="Core Values"
            className="rounded-lg shadow-lg w-64 md:w-80 lg:w-96 h-auto object-cover"
          />
          <div className="absolute top-4 left-4 w-16 h-16 bg-[#0F75BD]/10 rounded-full blur-xl pointer-events-none" />
        </div>
      </motion.div>

      {/* Right Value List */}
      <motion.div
        className="space-y-7"
        variants={listContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Excellence */}
        <motion.div variants={listItem} className="flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-full transition-all duration-300 hover:bg-[#0F75BD]/10 hover:scale-110 hover:shadow-lg">
            <Handshake className="text-[#0F75BD] w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base md:text-lg">
              Excellence
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pursuing the highest standards in education and learning with
              dedicated teachers and supportive academic guidance.
            </p>
          </div>
        </motion.div>

        {/* Diversity */}
        <motion.div variants={listItem} className="flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-full transition-all duration-300 hover:bg-[#0F75BD]/10 hover:scale-110 hover:shadow-lg">
            <Shapes className="text-[#0F75BD] w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base md:text-lg">
              Diversity
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fostering inclusion, celebrating differences, and respecting
              cultures within and beyond the classroom.
            </p>
          </div>
        </motion.div>

        {/* Innovation */}
        <motion.div variants={listItem} className="flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-full transition-all duration-300 hover:bg-[#0F75BD]/10 hover:scale-110 hover:shadow-lg">
            <Lightbulb className="text-[#0F75BD] w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base md:text-lg">
              Innovation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Encouraging creativity and new ideas by creating a safe space for
              students to explore, experiment, and grow.
            </p>
          </div>
        </motion.div>
      </motion.div>

    </div>
  </div>
</section>



<section className="relative bg-white">
  <NewsList limit={4} grid="2" showSearch={false} className="mb-0" />
  <CTA className="mt-0" />
</section>
    </>
  );
};
export default Home;
