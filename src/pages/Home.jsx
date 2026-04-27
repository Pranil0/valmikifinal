import React, { useRef } from "react";
import {
  Target,
  Flag,
  Handshake,
  Shapes,
  Lightbulb,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import valmikicollegebuilding from "../assets/valmikicollegebuilding.jpg";
import corevalues from "../assets/corevalue.webp";
import landinghero1 from "../assets/landingherofinal.mp4";
import WellBeingSection from "../components/WellBeingSection";
import VisionMissionSection from "../components/VisionMissionSection";
import NewsList from "../components/NewsList";
import CTA from "../components/CTA";
import ProgramsSection from "../components/ProgramSection";

// ─────────────────────────────────────────────
// Counter Box
// ─────────────────────────────────────────────
const CounterBox = ({ end, label, suffix = "+" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center text-white py-2">
      <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
        {inView ? <CountUp end={end} duration={3} /> : "0"}
        <span className="text-[#FCA61B]">{suffix}</span>
      </h3>
      <p className="mt-2 text-sm md:text-base text-white/70 font-medium">{label}</p>
    </div>
  );
};

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const titleVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────
const Home = () => {
  const programsRef = useRef(null);

  const scrollToPrograms = () => {
    programsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-6 overflow-hidden">
        <video
          src={landinghero1}
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

        {/* Amber bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FCA61B]" />

        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#FCA61B]/20 border border-[#FCA61B]/40 text-[#FCA61B] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              Est. 1996 · Play Group to +2
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl"
          >
            VALMIKI{" "}
            <span className="bg-gradient-to-r from-[#0F75BD] to-[#38b6ff] bg-clip-text text-transparent">
              SHIKSHA
            </span>{" "}
            SADAN
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-xl md:text-2xl lg:text-3xl font-semibold text-white/90"
          >
            Where Excellence Prevails
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm md:text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto"
          >
            Since 1996, empowering students from Play Group to +2 with academic
            brilliance, holistic growth, and inclusive education.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToPrograms}
              className="px-7 py-3.5 bg-[#0F75BD] hover:bg-[#0d66a8] text-white font-semibold rounded-xl text-sm md:text-base shadow-lg hover:shadow-[#0F75BD]/30 transition-all duration-300"
            >
              Explore Our Streams
            </button>
            <NavLink
              to="/contact"
              className="px-7 py-3.5 bg-[#FCA61B] hover:bg-[#e59500] text-white font-semibold rounded-xl text-sm md:text-base shadow-lg hover:shadow-[#FCA61B]/30 transition-all duration-300"
            >
              Request Admission Info
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
          <div className="w-px h-10 bg-white animate-pulse" />
          <span className="text-white text-[10px] uppercase tracking-widest">Scroll</span>
        </div>
      </section>


      {/* ══════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════ */}
      <VisionMissionSection
        description="Founded in 1996 (2053 B.S.), Valmiki Shiksha Sadan has grown into one of Chitwan's most trusted institutions."
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

      {/* ══════════════════════════════════════
          COUNTER SECTION
      ══════════════════════════════════════ */}
      <section className="relative py-20 px-6 bg-gray-50">
        <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          {/* BG image */}
          <img
            src={valmikicollegebuilding}
            alt="Valmiki College Building"
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Brand blue overlay */}
          <div className="absolute inset-0 bg-[#0F75BD]/95" />

          {/* Decorative circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FCA61B]/10" />

          <div className="relative px-8 py-14 md:py-16">
            <div className="text-center mb-10">
              <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
                By The Numbers
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Trusted by Thousands Across Chitwan
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
              <CounterBox end={3000} label="Students Enrolled" />
              <CounterBox end={80} label="Faculty Members" suffix="+" />
              <CounterBox end={18} label="Programs Offered" />
              <CounterBox end={600} label="Graduates" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROGRAMS / STREAMS
      ══════════════════════════════════════ */}
      <div ref={programsRef}>
        <ProgramsSection />
      </div>

      {/* ══════════════════════════════════════
          WELL-BEING
      ══════════════════════════════════════ */}
      <section className="relative bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <WellBeingSection />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CORE VALUES
      ══════════════════════════════════════ */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

          <motion.div
            className="text-center mb-12"
            variants={titleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* ✅ Consistent amber eyebrow — matches Inquiry & NewsEvent pages */}
            <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
              The Core Values That Shape Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Left Image */}
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative md:translate-x-16">
                <img
                  src={corevalues}
                  alt="Core Values"
                  className="rounded-2xl shadow-xl w-64 md:w-80 lg:w-96 h-auto object-cover"
                />
                {/* Amber accent border */}
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-[#FCA61B]/40 -z-10" />
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
              {[
                {
                  icon: <Handshake className="text-[#0F75BD] w-6 h-6" />,
                  title: "Excellence",
                  desc: "Pursuing the highest standards in education and learning with dedicated teachers and supportive academic guidance.",
                },
                {
                  icon: <Shapes className="text-[#0F75BD] w-6 h-6" />,
                  title: "Diversity",
                  desc: "Fostering inclusion, celebrating differences, and respecting cultures within and beyond the classroom.",
                },
                {
                  icon: <Lightbulb className="text-[#0F75BD] w-6 h-6" />,
                  title: "Innovation",
                  desc: "Encouraging creativity and new ideas by creating a safe space for students to explore, experiment, and grow.",
                },
              ].map((val, i) => (
                <motion.div key={i} variants={listItem} className="flex items-start gap-4 group">
                  <div className="bg-[#EFF6FF] p-3 rounded-xl transition-all duration-300 group-hover:bg-[#0F75BD] group-hover:scale-110 group-hover:shadow-lg shrink-0">
                    <span className="group-hover:[&>*]:text-white transition-colors">
                      {val.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-[#FCA61B] rounded-full" />
                      <h3 className="font-bold text-gray-900 text-base md:text-lg">{val.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWS + CTA
      ══════════════════════════════════════ */}
      <section className="relative bg-gray-50">
        <NewsList limit={4} grid="2" showSearch={false} className="mb-0" />
        <CTA className="mt-0" />
      </section>

    </>
  );
};

export default Home;
