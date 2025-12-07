import React from "react";
import {
  FaFlask,
  FaCalculator,
  FaGlobe,
  FaLaptopCode,
  FaPalette,
  FaLanguage,
  FaHotel,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";
import MessageBlock from "../components/MessageBlock";
import principalImg from "../assets/principal.png";
import CTA from "../components/CTA";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ===== STREAM-BASED CURRICULUM FOR +2 =====
const curriculum = [
  {
    title: "Science",
    color: "#0F75BD",
    description:
      "NEB Science stream focuses on Physics, Chemistry, Biology/Computer Science, and Mathematics, building a foundation for engineering, medical, and technical fields.",
    subjects: [
      { name: "English", icon: <FaLanguage /> },
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "Physics", icon: <FaFlask /> },
      { name: "Chemistry", icon: <FaFlask /> },
      { name: "Biology or Computer Science", icon: <FaLaptopCode /> },
      { name: "Mathematics", icon: <FaCalculator /> },
    ],
  },
  {
    title: "Management",
    color: "#CC0033",
    description:
      "NEB Management stream covers Accountancy, Business Studies, Economics, Business Math, and Computer Science with flexibility for business‑oriented careers.",
    subjects: [
      { name: "English", icon: <FaLanguage /> },
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "Accountancy", icon: <FaCalculator /> },
      { name: "Economics", icon: <FaChartLine /> },
      { name: "Business Studies", icon: <FaBookOpen /> },
      { name: "Computer Science / Business Math / Marketing", icon: <FaLaptopCode /> },
    ],
  },
  {
    title: "Hotel Management",
    color: "#FCA61B",
    description:
      "Hotel Management stream builds skills in hospitality, tourism, food production, front‑office operations, and customer service with practical exposure.",
    subjects: [
      { name: "English", icon: <FaLanguage /> },
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "Hotel Management", icon: <FaHotel /> },
      { name: "Accountancy", icon: <FaCalculator /> },
      { name: "Computer Science / Economics", icon: <FaLaptopCode /> },
      { name: "Business Studies", icon: <FaBookOpen /> },
    ],
  },
];

// ===== CURRICULUM SECTION WITH FRAMER MOTION =====
const CurriculumSection = ({ level }) => {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const titleX = useTransform(smooth, [0, 1], [150, -60]);
  const gridOpacity = useTransform(smooth, [0.1, 0.5], [0, 1]);
  const gridY = useTransform(smooth, [0.1, 0.5], [60, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-16"
    >
      {/* LEFT/RIGHT TITLE */}
      <motion.div style={{ x: titleX }} className="lg:w-1/3 text-right">
        <h3
          className="text-3xl md:text-4xl font-semibold mb-4"
          style={{ color: level.color }}
        >
          {level.title}
        </h3>
        <p className="text-gray-600 text-lg">{level.description}</p>
      </motion.div>

      {/* GRID OF SUBJECTS */}
      <motion.div
        style={{ opacity: gridOpacity, y: gridY }}
        className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {level.subjects.map((subj, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl text-blue-600 mb-4">{subj.icon}</div>
            <p className="text-xl font-semibold text-gray-800">{subj.name}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const Plus2 = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-red-100 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            +2 Streams at <span className="text-[#0F75BD]">Valmiki Shiksha Sadan</span>
          </h1>
          <p className="text-gray-600 md:text-lg lg:text-xl max-w-3xl mx-auto">
            Science, Management, and Hotel Management streams with a curriculum designed to prepare students for higher education and professional careers.
          </p>
        </div>
      </section>

      {/* MESSAGE FROM COORDINATOR */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 mt-12 md:mt-16 mb-8">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          <span className="text-[#0F75BD]">Message from the</span>{" "}
          <span className="text-[#CC0033]">Coordinator</span>
        </h2>
        <p className="mt-3 text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Supporting +2 students in Science, Management, and Hotel Management streams to excel academically and personally.
        </p>
      </section>

      <MessageBlock
        img={principalImg}
        name="Ram Thapa"
        designation="Coordinator"
        institute="Valmiki Shiksha Sadan"
        message={
          <>
            <p className="mb-4 text-justify">
              Our +2 students are guided through rigorous academic programs designed to prepare them for university and professional careers.
            </p>
            <p className="mb-4 text-justify">
              Through modern labs, interactive learning, and mentorship, students are encouraged to think critically and engage in collaborative projects.
            </p>
            <p className="mb-4 text-justify">
              We strive to instill responsibility, discipline, and curiosity beyond the classroom, producing confident, knowledgeable, and ethical young adults.
            </p>
            <p className="mt-6 text-[#777777] text-sm md:text-[15px]">
              I look forward to guiding and celebrating our students' successes as they progress toward a bright future.
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900 text-sm md:text-base">Ram Thapa</p>
              <p className="text-xs md:text-sm text-gray-500">Coordinator, Valmiki Shiksha Sadan</p>
            </div>
          </>
        }
      />

      {/* CURRICULUM SECTIONS */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          +2 Streams Curriculum
        </h2>

        {curriculum.map((level, idx) => (
          <CurriculumSection key={idx} level={level} />
        ))}
      </section>

      <CTA />
    </>
  );
};

export default Plus2;
