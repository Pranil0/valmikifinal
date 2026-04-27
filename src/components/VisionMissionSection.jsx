import React from "react";
import { motion } from "framer-motion";
import { Target, Flag } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const VisionMissionSection = ({
  title = "Our Vision & Mission",
  description,
  vision,
  mission,
}) => {
  return (
    <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">

      {/* ✅ Consistent three-line header */}
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
          Who We Are
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">{title}</h2>
        {description && (
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>

      <motion.div
        className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {[
          {
            icon: vision?.icon || <Target className="w-7 h-7" />,
            title: vision?.title,
            text: vision?.text,
          },
          {
            icon: mission?.icon || <Flag className="w-7 h-7" />,
            title: mission?.title,
            text: mission?.text,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.04, boxShadow: "0 20px 48px rgba(0,0,0,0.16)" }}
            className="group relative bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-colors duration-300 hover:bg-[#0F75BD] overflow-hidden border border-gray-100"
          >
            {/* Amber left accent bar on hover */}
            <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl bg-[#FCA61B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon — rounded-xl instead of circle to differ from ProgramsSection */}
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0F75BD] group-hover:bg-white transition-all duration-300 mb-5">
              {card.icon}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#0F75BD] group-hover:text-white transition-colors">
              {card.title}
            </h3>

            {/* Amber underline — visible on default, fades on hover */}
            <div className="w-8 h-0.5 bg-[#FCA61B] rounded-full my-3 group-hover:bg-white/40 transition-colors" />

            <p className="text-gray-500 group-hover:text-white/80 text-sm md:text-base leading-relaxed transition-colors">
              {card.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default VisionMissionSection;