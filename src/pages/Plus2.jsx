import React from "react";
import {
  FaFlask,
  FaCalculator,
  FaGlobe,
  FaLaptopCode,
  FaLanguage,
  FaHotel,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";
import { GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import MessageBlock from "../components/MessageBlock";
import coordinatorImg from "../assets/CoordinatorImg.webp";
import CTA from "../components/CTA";

/* ================= CURRICULUM DATA ================= */
const curriculum = [
  {
    title: "Science",
    tag: "Stream 01",
    description:
      "NEB Science stream focuses on Physics, Chemistry, Biology/Computer Science, and Mathematics, building a foundation for engineering, medical, and technical fields.",
    subjects: [
      { name: "English",                      icon: <FaLanguage /> },
      { name: "Nepali",                       icon: <FaLanguage /> },
      { name: "Physics",                      icon: <FaFlask /> },
      { name: "Chemistry",                    icon: <FaFlask /> },
      { name: "Biology or Computer Science",  icon: <FaLaptopCode /> },
      { name: "Mathematics",                  icon: <FaCalculator /> },
    ],
  },
  {
    title: "Management",
    tag: "Stream 02",
    description:
      "NEB Management stream covers Accountancy, Business Studies, Economics, Business Math, and Computer Science with flexibility for business-oriented careers.",
    subjects: [
      { name: "English",                                          icon: <FaLanguage /> },
      { name: "Nepali",                                           icon: <FaLanguage /> },
      { name: "Accountancy",                                      icon: <FaCalculator /> },
      { name: "Economics",                                        icon: <FaChartLine /> },
      { name: "Business Studies",                                 icon: <FaBookOpen /> },
      { name: "Computer Science / Business Math / Marketing",     icon: <FaLaptopCode /> },
    ],
  },
  {
    title: "Hotel Management",
    tag: "Stream 03",
    description:
      "Hotel Management stream builds skills in hospitality, tourism, food production, front-office operations, and customer service with practical exposure.",
    subjects: [
      { name: "English",                      icon: <FaLanguage /> },
      { name: "Nepali",                       icon: <FaLanguage /> },
      { name: "Hotel Management",             icon: <FaHotel /> },
      { name: "Accountancy",                  icon: <FaCalculator /> },
      { name: "Computer Science / Economics", icon: <FaLaptopCode /> },
      { name: "Business Studies",             icon: <FaBookOpen /> },
    ],
  },
];

/* ================= ANIMATION VARIANTS ================= */

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
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const heroPills = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const pillItem = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
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

/* ================= CURRICULUM SECTION ================= */
const CurriculumSection = ({ level, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      <div className={`flex flex-col lg:flex-row gap-8 items-stretch ${!isEven ? "lg:flex-row-reverse" : ""}`}>

        {/* info panel — always blue */}
        <motion.div
          variants={isEven ? fadeLeft : fadeRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:w-1/3 rounded-2xl p-8 flex flex-col justify-center"
          style={{
            background: "linear-gradient(135deg, #0F75BD18 0%, #0F75BD08 100%)",
            borderLeft: "4px solid #0F75BD",
          }}
        >
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#0F75BD" }}
          >
            {level.tag}
          </motion.span>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3"
          >
            {level.title}
          </motion.h3>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 bg-[#FCA61B] rounded-full mb-4"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-gray-500 text-sm leading-relaxed"
          >
            {level.description}
          </motion.p>
        </motion.div>

        {/* subjects grid — always blue */}
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
                style={{ background: "#0F75BD12" }}
              >
                <span
                  className="text-xl transition-colors duration-300 group-hover:text-white"
                  style={{ color: "#0F75BD" }}
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

/* ================= MAIN PAGE ================= */
const Plus2 = () => {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[58vh] md:min-h-[64vh] overflow-hidden flex items-center justify-center text-center"
        style={{
          background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)",
        }}
      >
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

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FCA61B]/40 pointer-events-none"
            style={{ top: `${20 + i * 12}%`, left: `${8 + i * 14}%` }}
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
          <motion.nav
            variants={heroFadeDown}
            className="flex items-center justify-center gap-2 text-xs text-white/40 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FCA61B] font-semibold">+2 Programme</span>
          </motion.nav>

          <motion.div
            variants={heroFadeDown}
            className="inline-flex items-center gap-2 bg-[#FCA61B]/15 border border-[#FCA61B]/35
                       text-[#FCA61B] text-xs font-bold uppercase tracking-widest
                       px-4 py-1.5 rounded-full mb-5"
          >
            <GraduationCap size={13} />
            Admissions Open
          </motion.div>

          <motion.h1
            variants={heroScale}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            +2{" "}
            <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
              Programme
            </span>
          </motion.h1>

          <motion.div
            variants={heroPills}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            {["Science", "Management", "Hotel Management"].map((label, i) => (
              <motion.span
                key={i}
                variants={pillItem}
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                className="px-5 py-2 rounded-full text-white text-xs font-bold
                           border border-white/25 bg-white/10 cursor-default"
              >
                {label}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            variants={heroFadeUp}
            className="text-sm md:text-base text-white/55 max-w-xl mx-auto leading-relaxed mb-8"
          >
            A curriculum designed to prepare students for higher education
            and professional careers across three distinct streams.
          </motion.p>

          <motion.div variants={heroFadeUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/inquiry"
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
          COORDINATOR MESSAGE
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#EFF6FF]">
        <div className="max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
              Leadership
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Message from the Coordinator
            </h2>
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
              img={coordinatorImg}
              name="Bishnu Dhakal"
              designation="+2 Coordinator"
              institute="Valmiki Shiksha Sadan"
              message={
               <>
  <p className="mb-4 text-justify">
    Welcome to <strong className="text-[#0F75BD]">Valmiki Shiksha Sadan</strong>! Our +2 program offers education in 
    <strong className="text-gray-800"> Science, General Management and Hotel Management</strong> streams, providing students with a strong foundation for
    higher education, professional careers and future success. We focus not only on academic
    excellence but also on nurturing critical thinking, creativity and leadership skills.
  </p>

  <p className="mb-4 text-justify">
    Our +2 students benefit from 
    <strong className="text-gray-800"> air-conditioned, spacious classrooms, well-equipped science and computer labs</strong>, 
    a modern library and a supportive learning environment. Guided by experienced and dedicated faculty, 
    our students consistently achieve outstanding results at both the district and national levels, 
    reflecting the quality of education and personalised attention we provide.
  </p>

  <p className="mb-4 text-justify">
    Beyond academics, we encourage participation in sports, cultural programs and extracurricular
    activities, helping students develop well-rounded personalities and discover their passions. With a
    focus on discipline, innovation and holistic development, our +2 program prepares students to
    excel in all aspects of life beyond the classroom.
  </p>

  <p className="mb-4 text-justify">
    At Valmiki Shiksha Sadan, we strive to create a community where students feel valued, challenged
    and inspired to reach their full potential. We warmly invite parents, students and visitors to explore
    our programs and witness the holistic, vibrant learning journey we offer. Together, we nurture an
    environment where every child can learn, grow and shine.
  </p>
</>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CURRICULUM
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
              +2 Streams Curriculum
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
              Three distinct streams designed to align with your academic
              strengths and career aspirations at the higher secondary level.
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

export default Plus2;
