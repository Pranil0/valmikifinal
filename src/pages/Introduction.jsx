import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Target, Flag, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import VisionMissionSection from "../components/VisionMissionSection";
import ProgramSection from "../components/ProgramSection";
import CTA from "../components/CTA";

import Introductionhero from "../assets/Introductionhero.mp4";
import officeImg from "../assets/schoolbuilding.webp";
import valmikicollegebuilding from "../assets/valmikicollegebuilding.jpg";

/* ── stats ── */
const stats = [
  { value: 1996, label: "Established",      suffix: "",  prefix: "" },
  { value: 25,   label: "Years of Legacy",  suffix: "+", prefix: "" },
  { value: 95,   label: "A & A+ Achievers", suffix: "%", prefix: "" },
  { value: 40,   label: "Teaching Staff",   suffix: "+", prefix: "" },
];

/* ── core values ── */
const coreValues = [
  "Student-Centered Learning",
  "Character & Leadership",
  "Strong Academic Rigor",
  "Community Engagement",
  "Integrity & Mutual Respect",
  "Holistic Development",
];

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── counter box ── */
const StatBox = ({ value, label, suffix, prefix, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center text-center px-6 py-8 relative
                 after:absolute after:right-0 after:top-1/4 after:h-1/2
                 after:w-px after:bg-white/20 last:after:hidden"
    >
      <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-none">
        {prefix}
        {inView ? <CountUp end={value} duration={2.5} /> : "0"}
        {suffix}
      </span>
      <span className="mt-2 text-xs md:text-sm text-white/60 uppercase tracking-widest font-medium">
        {label}
      </span>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════ */
const Introduction = () => {
  return (
    <>
      {/* ══ HERO ══ */}
      <HeroSection
        video={Introductionhero}
        title="Introduction"
        subtitle="Learn about our vision, values, and the legacy of Valmiki Shiksha Sadan."
        badge="About Our Institution"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Introduction" },
        ]}
        size="large"
        titleStyle="gradient"
        overlayStyle="bottom-heavy"
      />

      {/* ══ ABOUT SECTION ══ */}
<section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
  <div className="max-w-7xl mx-auto">

    {/* section label */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3">
        About Our Institution
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        About{" "}
        <span className="text-[#0F75BD]">Valmiki Shiksha Sadan</span>
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-5"
      />
      <p className="mt-5 text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
        A trusted educational institution in Bharatpur combining strong
        academics, values-based learning, and modern teaching practices.
      </p>
    </motion.div>

    {/* two-column grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

      {/* image */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl
                        h-[340px] md:h-[420px] lg:h-[460px]">
          <img
            src={officeImg}
            alt="Valmiki Shiksha Sadan Campus"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1
                          bg-gradient-to-r from-[#FCA61B] to-[#f8d07a]" />
        </div>
      </motion.div>

      {/* text */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-5 text-gray-600 text-sm md:text-base leading-relaxed"
      >
        <p>
          <strong className="text-[#0F75BD]">Valmiki Shiksha Sadan</strong>{" "}
          was established in <strong>1996 (2053 B.S.)</strong> with a clear
          mission: to provide quality education that blends academic
          excellence with strong ethical values. Over the years, VSS has
          grown into a leading institution in Chitwan, trusted by parents,
          students, and the wider community.
        </p>
        <p>
          The school offers a complete educational pathway from{" "}
          <strong className="text-gray-800">early childhood to secondary level</strong>,
          including{" "}
          <strong className="text-gray-800">+2 Science, Management, and Hotel Management</strong>{" "}
          programs. With a team of dedicated and highly qualified teachers,
          VSS ensures personalized guidance, supportive mentoring, and a
          safe, student-friendly environment.
        </p>
        <p>
          Our approach to learning goes beyond textbooks. We encourage{" "}
          <strong className="text-gray-800">
            critical thinking, creativity, leadership, and discipline
          </strong>{" "}
          so that students grow as confident and responsible individuals.
        </p>
        <p>
          As an institution, we are continuously upgrading our teaching
          methods, infrastructure, and learning resources to keep pace with
          the changing world, while staying rooted in our{" "}
          <strong className="text-gray-800">
            values of integrity, hard work, and compassion
          </strong>.
        </p>
      </motion.div>

    </div>
  </div>
</section>

      {/* ══ STATS ══ */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3">
              By the Numbers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
              A Proven Record of Excellence
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-5"
            />
          </motion.div>

          {/* stats card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* bg image */}
            <img
              src={valmikicollegebuilding}
              alt="Valmiki College Building"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* blue overlay */}
            <div className="absolute inset-0 bg-[#0F75BD]/92" />

            {/* content */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <StatBox key={i} {...stat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* sub-caption */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-xs text-gray-400 mt-6 max-w-md mx-auto leading-relaxed"
          >
            Numbers that reflect decades of trust, hard work, and academic
            dedication by students, teachers, and families.
          </motion.p>

        </div>
      </section>

      {/* ══ VISION & MISSION ══ */}
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

      {/* ══ PROGRAMS ══ */}
      <ProgramSection />

      <hr className="border-t border-gray-100 mx-6 md:mx-10" />

      {/* ══ CTA ══ */}
      <CTA />
    </>
  );
};

export default Introduction;