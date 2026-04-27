import React from "react";
import {
  FaFlask,
  FaCalculator,
  FaGlobe,
  FaLaptopCode,
  FaPalette,
  FaLanguage,
} from "react-icons/fa";
import { GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import MessageBlock from "../components/MessageBlock";
import vpImg from "../assets/Viceprincipalimg.webp";
import CTA from "../components/CTA";

/* -------------------- CURRICULUM DATA -------------------- */
const curriculum = [
  {
    level: "Class 1–5",
    tag: "Primary",
    color: "#0F75BD",
    description:
      "Foundation years focusing on basic literacy, numeracy, creativity, and life skills.",
    subjects: [
      { name: "Nepali",                             icon: <FaLanguage /> },
      { name: "Mathematics",                        icon: <FaCalculator /> },
      { name: "English",                            icon: <FaLanguage /> },
      { name: "Environmental / Social Studies",     icon: <FaGlobe /> },
      { name: "Health, Creative Arts & Moral Ed.",  icon: <FaPalette /> },
    ],
  },
  {
    level: "Class 6–8",
    tag: "Lower Secondary",
    color: "#0a4a7a",
    description:
      "Building conceptual understanding with Science, Social Studies, and enhanced language skills.",
    subjects: [
      { name: "Nepali",                             icon: <FaLanguage /> },
      { name: "English",                            icon: <FaLanguage /> },
      { name: "Mathematics",                        icon: <FaCalculator /> },
      { name: "Science & Technology",               icon: <FaFlask /> },
      { name: "Social Studies",                     icon: <FaGlobe /> },
      { name: "Health, Life Skill & Creative Arts", icon: <FaPalette /> },
    ],
  },
  {
    level: "Class 9–10",
    tag: "Secondary",
    color: "#072f50",
    description:
      "Preparing students for board exams with in-depth knowledge in core subjects and skill-based learning.",
    subjects: [
      { name: "Nepali",                                  icon: <FaLanguage /> },
      { name: "English",                                 icon: <FaLanguage /> },
      { name: "Mathematics",                             icon: <FaCalculator /> },
      { name: "Science (Physics / Chemistry / Biology)", icon: <FaFlask /> },
      { name: "Social Studies",                          icon: <FaGlobe /> },
      { name: "Computer Science",                        icon: <FaLaptopCode /> },
    ],
  },
];

/* -------------------- ANIMATION VARIANTS -------------------- */

// Hero — bold entrance
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const heroFadeDown = {
  hidden: { opacity: 0, y: -40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const heroFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const heroScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Scroll reveals — elegant
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* -------------------- CURRICULUM SECTION -------------------- */
const CurriculumSection = ({ level, index }) => {
  const ref = React.useRef(null);
 const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      <div className={`flex flex-col lg:flex-row gap-8 items-stretch ${!isEven ? "lg:flex-row-reverse" : ""}`}>

        {/* info panel */}
        <motion.div
          variants={isEven ? fadeLeft : fadeRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:w-1/3 rounded-2xl p-8 flex flex-col justify-center"
          style={{
            background: `linear-gradient(135deg, ${level.color}18 0%, ${level.color}08 100%)`,
            borderLeft: `4px solid ${level.color}`,
          }}
        >
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: level.color }}
          >
            {level.tag}
          </motion.span>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3"
          >
            {level.level}
          </motion.h3>
          <div className="w-8 h-0.5 bg-[#FCA61B] rounded-full mb-4" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-gray-500 text-sm leading-relaxed"
          >
            {level.description}
          </motion.p>
        </motion.div>

        {/* subjects grid */}
        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {level.subjects.map((subj, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={scaleIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(15,117,189,0.15)",
                transition: { duration: 0.25 },
              }}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                         hover:border-[#0F75BD]/20 transition-colors duration-300
                         flex flex-col items-center text-center cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3
                           transition-colors duration-300 group-hover:bg-[#0F75BD]"
                style={{ background: `${level.color}12` }}
              >
                <span
                  className="text-xl transition-colors duration-300 group-hover:text-white"
                  style={{ color: level.color }}
                >
                  {subj.icon}
                </span>
              </motion.div>
              <p className="text-sm font-semibold text-gray-800 leading-snug">
                {subj.name}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

/* -------------------- MAIN PAGE -------------------- */
const Grade1to10 = () => {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — bold entrance
      ══════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[58vh] md:min-h-[64vh] overflow-hidden flex items-center justify-center text-center"
        style={{
          background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)",
        }}
      >
        {/* animated decorative circles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-[#FCA61B]/10 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute top-10 left-40 w-28 h-28 rounded-full bg-white/5 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="absolute bottom-16 right-32 w-20 h-20 rounded-full bg-[#FCA61B]/10 pointer-events-none"
        />

        {/* floating particle dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FCA61B]/40 pointer-events-none"
            style={{
              top: `${20 + i * 12}%`,
              left: `${8 + i * 14}%`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-24"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* breadcrumb */}
          <motion.nav
            variants={heroFadeDown}
            className="flex items-center justify-center gap-2 text-xs text-white/40 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FCA61B] font-semibold">Grade 1–10</span>
          </motion.nav>

          {/* badge */}
          <motion.div
            variants={heroFadeDown}
            className="inline-flex items-center gap-2 bg-[#FCA61B]/15 border border-[#FCA61B]/35
                       text-[#FCA61B] text-xs font-bold uppercase tracking-widest
                       px-4 py-1.5 rounded-full mb-5"
          >
            <GraduationCap size={13} />
            Now Enrolling
          </motion.div>

          {/* title */}
          <motion.h1
            variants={heroScale}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Grade 1–10{" "}
            <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
              Programme
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={heroFadeUp}
            className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Holistic and modern curriculum designed to foster academic
            excellence, critical thinking, and creativity from Primary to
            Secondary levels.
          </motion.p>

          {/* CTA */}
          <motion.div variants={heroFadeUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FCA61B] text-white
                           font-bold rounded-xl text-sm hover:bg-[#e59500] transition-colors
                           shadow-lg shadow-[#FCA61B]/30"
              >
                <GraduationCap size={16} />
                Apply Now
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          VICE PRINCIPAL MESSAGE
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2"
            >
              Leadership
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]"
            >
              Message from the Vice Principal
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MessageBlock
              img={vpImg}
              name="Prakash Subedi"
              designation="Vice Principal"
              institute="Valmiki Shiksha Sadan"
              message={
                <>
                  <p className="mb-4 text-justify">
                    At Valmiki Shiksha Sadan, our students from Grade 1 to 10
                    are encouraged to explore their strengths and build a strong
                    academic foundation. We are committed to providing a
                    well-rounded education that inspires curiosity, creativity,
                    and critical thinking in every child.
                  </p>
                  <p className="mb-4 text-justify">
                    Our curriculum is designed to nurture both intellectual and
                    personal growth. Students are guided to not only excel
                    academically but also develop problem-solving skills,
                    independent thinking, and a lifelong love for learning. We
                    emphasize a balance between theoretical knowledge and
                    practical application, ensuring that our students are
                    prepared for higher education and future careers.
                  </p>
                  <p className="mb-4 text-justify">
                    Beyond academics, Valmiki Shiksha Sadan fosters a vibrant
                    environment for co-curricular activities. Our students
                    actively participate in sports, arts, music, debate, science
                    clubs, and social initiatives. These activities help in
                    building confidence, teamwork, leadership, and resilience.
                  </p>
                  <p className="mb-4 text-justify">
                    At Valmiki Shiksha Sadan, we celebrate the successes of our
                    students and alumni, recognizing their achievements in
                    academics, co-curricular activities, and global
                    contributions. We believe that every student has the
                    potential to shine, and it is our mission to provide the
                    guidance, opportunities, and inspiration needed to reach
                    that potential.
                  </p>
                  <p className="mb-4 text-justify">
                    Together with parents, teachers, and the community, we aim
                    to create an educational experience that is enriching,
                    transformative, and empowering — nurturing confident,
                    compassionate, and capable individuals prepared to navigate
                    the challenges of the modern world.
                  </p>
                  <p className="mb-4 text-justify">
                    I warmly invite students, parents, and visitors to explore
                    our school community and join us in our mission to educate
                    and inspire the leaders of tomorrow.
                  </p>
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="font-bold text-gray-900 text-sm">Prakash Subedi</p>
                    <p className="text-xs text-gray-400">
                      Vice Principal, Valmiki Shiksha Sadan
                    </p>
                  </div>
                </>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CURRICULUM OVERVIEW
      ══════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
              What We Teach
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Curriculum Overview
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed"
            >
              A structured academic journey from Primary through Secondary —
              building skills, knowledge, and confidence at every stage.
            </motion.p>
          </motion.div>

          {curriculum.map((level, idx) => (
            <CurriculumSection key={idx} level={level} index={idx} />
          ))}

        </div>
      </section>

      <CTA />
    </>
  );
};

export default Grade1to10;