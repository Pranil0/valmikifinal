import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BookOpen, Atom, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const programs = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    label: "Play Group – Grade 10",
    title: "Early Childhood to Secondary",
    desc: "A solid foundation built with modern teaching methods, nurturing creativity, discipline and holistic development from the early years through secondary level.",
    link: "/grade10",
    accent: "#0F75BD",
  },
  {
    icon: <Atom className="w-7 h-7" />,
    label: "+2 Programs",
    title: "Higher Secondary Education",
    desc: "Designed for students aiming for medicine, engineering, IT and applied sciences — supported by experienced faculty, modern labs and career-focused guidance.",
    link: "/plus2",
    accent: "#15803D",
  },
];

const ProgramsSection = () => {
  return (
    <section className="relative bg-[#EFF6FF] py-16 md:py-20 px-6 md:px-12 lg:px-20">

      {/* ✅ Consistent three-line header */}
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
          What We Offer
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">Our Programs</h2>
        <p className="mt-4 text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          At Valmiki Shiksha Sadan, we offer programs designed to meet the
          academic needs of students from early years to higher secondary education.
        </p>
      </motion.div>

      {/* ✅ Horizontal card layout — visually distinct from vertical VisionMission cards above */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {programs.map((prog, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Top color bar */}
            <div
              className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: prog.accent }}
            />

            <div className="p-7 md:p-8">
              {/* Icon + label row */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-white shrink-0 shadow-md"
                  style={{ backgroundColor: prog.accent }}
                >
                  {prog.icon}
                </div>
                <span
                  className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${prog.accent}15`, color: prog.accent }}
                >
                  {prog.label}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                {prog.title}
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                {prog.desc}
              </p>

              <NavLink
                to={prog.link}
                className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-200 group/link"
                style={{ color: prog.accent }}
              >
                Learn More
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </NavLink>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProgramsSection;
