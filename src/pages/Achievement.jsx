import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

import valmikibuilding from "../assets/valmikibuilding.png";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";
import forth from "../assets/forth.png";
import achivementVideo from "../assets/achivement.mp4"; // New hero video

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

const alumniData = [
  {
    img: first,
    name: "Rohan Sharma",
    achievement: "CEO at TechCorp Global, leading digital innovation.",
  },
  {
    img: second,
    name: "Sita Rai",
    achievement: "University Gold Medalist in Physics and Research Scholar.",
  },
  {
    img: third,
    name: "Amit Joshi",
    achievement: "Award-winning Visual Artist and Creative Director.",
  },
  {
    img: forth,
    name: "Priya Koirala",
    achievement: "Social Entrepreneur and Youth Leadership Mentor.",
  },
];

export default function Achievement() {
  // Framer Motion variants for hero text
  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const heroButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* ====== HERO SECTION with Video ====== */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          src={achivementVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70 animate-gradientMove pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Breadcrumb */}
          <nav className="absolute top-10 text-xs md:text-sm text-gray-200">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
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

          <motion.p
            className="mt-4 text-sm md:text-lg text-gray-100 max-w-3xl opacity-95"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Celebrating excellence in academics, co-curricular activities and
            the inspiring impact of our students and alumni in Nepal and beyond.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
            variants={heroButtonVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <CounterBox end={5000} label="Students Graduated" />
            <CounterBox end={150} label="Awards & Recognitions" />
            <CounterBox end={1000} label="Global Alumni Network" />
          </motion.div>
        </div>

        {/* Animated Gradient CSS */}
        <style jsx>{`
          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradientMove {
            background-size: 200% 200%;
            animation: gradientMove 20s ease infinite;
          }
        `}</style>
      </section>

      {/* ====== ACADEMIC ACHIEVEMENTS ====== */}
      <Section
        title="Academic Achievements"
        subtitle="Our students consistently secure outstanding board examination results, scholarships, and top positions at district and national levels through disciplined effort and guided mentoring."
        images={[first, second, third, forth]}
      />

      {/* ====== CO-CURRICULAR ACHIEVEMENTS ====== */}
      <Section
        title="Co-Curricular Excellence"
        subtitle="From debates and arts to sports and science fairs, our learners actively participate and shine in diverse platforms, developing confidence, teamwork, and leadership skills."
        images={[first, second, third, forth]}
        bg="bg-gray-50"
      />

      {/* ====== ALUMNI SECTION ====== */}
      <AlumniSection data={alumniData} />

      {/* ====== CTA ====== */}
      <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto bg-[#0F75BD] text-white rounded-3xl px-8 py-12 md:px-12 md:py-14 shadow-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Be Part of Our Growing Legacy
          </h2>
          <p className="mt-4 text-sm md:text-base text-center max-w-2xl mx-auto opacity-95">
            At Valmiki Shiksha Sadan, every student is encouraged to aim high, work
            hard, and lead with values. Begin your journey with us and write your
            own success story.
          </p>
          <div className="flex justify-center mt-8">
            <Link
              to="/contact"
              className="px-7 py-3 bg-[#FCA61B] text-[#0F75BD] text-sm md:text-base font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition"
            >
              Request Admission Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, subtitle, images, bg = "bg-white" }) {
  return (
    <section className={`${bg} py-16 md:py-20 px-6 md:px-12 lg:px-20`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
          {title}
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition duration-500"
          >
            <img
              src={img}
              alt={`Achievement highlight ${idx + 1}`}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function AlumniSection({ data }) {
  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-[#0F75BD]">
          Our Pride
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
          Alumni Achievements
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our alumni are contributing in technology, science, arts, business and
          social change. Their journeys reflect the values and confidence nurtured
          at Valmiki Shiksha Sadan.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {data.map((a, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition"
          >
            <img
              src={a.img}
              alt={a.name}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white p-4 pt-8 text-center">
              <h3 className="font-semibold text-sm md:text-base">{a.name}</h3>
              <p className="text-xs md:text-sm mt-1 opacity-95">{a.achievement}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
