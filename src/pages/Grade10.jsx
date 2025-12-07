import React from "react";
import {
  FaFlask,
  FaCalculator,
  FaGlobe,
  FaLaptopCode,
  FaPalette,
  FaLanguage,
} from "react-icons/fa";
import MessageBlock from "../components/MessageBlock";
import principalImg from "../assets/principal.png";
import CTA from "../components/CTA";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* -------------------- MOBILE DETECTOR -------------------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

/* -------------------- CURRICULUM DATA -------------------- */
const curriculum = [
  {
    level: "Class 1–5 (Primary)",
    description:
      "Foundation years focusing on basic literacy, numeracy, creativity, and life skills.",
    subjects: [
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "Mathematics", icon: <FaCalculator /> },
      { name: "English", icon: <FaLanguage /> },
      { name: "Environmental / Social Studies", icon: <FaGlobe /> },
      { name: "Health, Creative Arts & Moral Education", icon: <FaPalette /> },
    ],
  },
  {
    level: "Class 6–8 (Lower Secondary)",
    description:
      "Building conceptual understanding with introduction to Science, Social Studies, and enhanced language skills.",
    subjects: [
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "English", icon: <FaLanguage /> },
      { name: "Mathematics", icon: <FaCalculator /> },
      { name: "Science & Technology", icon: <FaFlask /> },
      { name: "Social Studies", icon: <FaGlobe /> },
      { name: "Health, Life Skill & Creative Arts", icon: <FaPalette /> },
    ],
  },
  {
    level: "Class 9–10 (Secondary)",
    description:
      "Preparing students for board exams with in-depth knowledge in core subjects and skill-based learning.",
    subjects: [
      { name: "Nepali", icon: <FaLanguage /> },
      { name: "English", icon: <FaLanguage /> },
      { name: "Mathematics", icon: <FaCalculator /> },
      { name: "Science (Physics / Chemistry / Biology)", icon: <FaFlask /> },
      { name: "Social Studies", icon: <FaGlobe /> },
      { name: "Computer Science", icon: <FaLaptopCode /> },
    ],
  },
];

/* -------------------- SINGLE CURRICULUM SECTION -------------------- */
const CurriculumSection = ({ level }) => {
  const isMobile = useIsMobile();
  const ref = React.useRef(null);

  // DESKTOP ANIMATION ONLY
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const titleX = isMobile ? 0 : useTransform(smooth, [0, 1], [150, -60]);
  const gridOpacity = isMobile ? 1 : useTransform(smooth, [0.1, 0.5], [0, 1]);
  const gridY = isMobile ? 0 : useTransform(smooth, [0.1, 0.5], [60, 0]);

  /* ---------- MOBILE: NO ANIMATION ---------- */
  if (isMobile) {
    return (
      <section
        ref={ref}
        className="min-h-fit flex flex-col items-center justify-center gap-10 px-6 lg:px-16 py-12"
      >
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-[#0F75BD] to-[#CC0033] bg-clip-text text-transparent">
            {level.level}
          </h3>
          <p className="text-gray-600 text-lg">{level.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {level.subjects.map((subj, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="text-5xl text-blue-600 mb-4">{subj.icon}</div>
              <p className="text-xl font-semibold text-gray-800">{subj.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------- DESKTOP WITH FULL ANIMATION ---------- */
  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-16"
    >
      <motion.div style={{ x: titleX }} className="lg:w-1/3 text-right">
        <h3 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-[#0F75BD] to-[#CC0033] bg-clip-text text-transparent">
          {level.level}
        </h3>
        <p className="text-gray-600 text-lg">{level.description}</p>
      </motion.div>

      <motion.div
        style={{ opacity: gridOpacity, y: gridY }}
        className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {level.subjects.map((subj, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center"
          >
            <div className="text-5xl text-blue-600 mb-4">{subj.icon}</div>
            <p className="text-xl font-semibold text-gray-800">{subj.name}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

/* -------------------- MAIN PAGE COMPONENT -------------------- */
const Grade1to10 = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-red-100 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Grade 1–10 Curriculum at{" "}
            <span className="text-[#0F75BD]">Valmiki Shiksha Sadan</span>
          </h1>
          <p className="text-gray-600 md:text-lg lg:text-xl max-w-3xl mx-auto">
            Holistic and modern curriculum designed to foster academic
            excellence, critical thinking, and creativity from Primary to
            Secondary levels.
          </p>
        </div>
      </section>

      {/* VICE PRINCIPAL MESSAGE */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
          <span className="text-[#0F75BD]">Message from the</span>{" "}
          <span className="text-[#CC0033]">Vice Principal</span>
        </h2>

       <MessageBlock
  img={principalImg}
  name="Sita Sharma"
  designation="Vice Principal"
  institute="Valmiki Shiksha Sadan"
  message={
    <>
      <p className="mb-4 text-justify">
        At Valmiki Shiksha Sadan, our students from Grade 1 to 10 are encouraged to explore their strengths and build a strong academic foundation. We are committed to providing a well-rounded education that inspires curiosity, creativity, and critical thinking in every child.
      </p>
      <p className="mb-4 text-justify">
        Our curriculum is designed to nurture both intellectual and personal growth. Students are guided to not only excel academically but also develop problem-solving skills, independent thinking, and a lifelong love for learning. We emphasize a balance between theoretical knowledge and practical application, ensuring that our students are prepared for higher education and future careers.
      </p>
      <p className="mb-4 text-justify">
        Beyond academics, Valmiki Shiksha Sadan fosters a vibrant environment for co-curricular activities. Our students actively participate in sports, arts, music, debate, science clubs, and social initiatives. These activities help in building confidence, teamwork, leadership, and resilience. Every achievement, whether in the classroom or on the field, is celebrated as a step towards holistic growth.
      </p>
      
      
      <p className="mb-4 text-justify">
        At Valmiki Shiksha Sadan, we celebrate the successes of our students and alumni, recognizing their achievements in academics, co-curricular activities, and global contributions. We believe that every student has the potential to shine, and it is our mission to provide the guidance, opportunities, and inspiration needed to reach that potential.
      </p>
      <p className="mb-4 text-justify">
        Together with parents, teachers, and the community, we aim to create an educational experience that is enriching, transformative, and empowering. We focus on nurturing confident, compassionate, and capable individuals who are prepared to navigate the challenges of the modern world with resilience, integrity, and a positive outlook.
      </p>
      <p className="mb-4 text-justify">
        I warmly invite students, parents, and visitors to explore our school community, witness our dedication to excellence, and join us in our mission to educate and inspire the leaders of tomorrow. At Valmiki Shiksha Sadan, we are committed to fostering a lifelong love of learning and helping every student achieve their dreams.
      </p>
    </>
  }
/>

      </section>

      {/* CURRICULUM BLOCK */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Curriculum Overview
        </h2>

        {curriculum.map((level, idx) => (
          <CurriculumSection key={idx} level={level} />
        ))}
      </section>

      <CTA />
    </>
  );
};

export default Grade1to10;
