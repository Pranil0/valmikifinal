import React from "react";
import { motion } from "framer-motion";
import { Target, Flag } from "lucide-react";

/* Container animation */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

/* Card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const VisionMissionSection = ({
  title = "Our Vision & Mission",
  description,
  vision,
  mission,
}) => {
  return (
    <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            {description}
          </p>
        )}
      </motion.div>

      {/* Cards */}
      <motion.div
        className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Vision */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -8,
            scale: 1.04,
            boxShadow: "0 20px 48px rgba(0,0,0,0.16)",
          }}
          className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-colors duration-300 hover:bg-[#0F75BD]"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition mb-5">
            {vision?.icon || <Target className="w-7 h-7" />}
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white">
            {vision?.title}
          </h3>

          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base">
            {vision?.text}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -8,
            scale: 1.04,
            boxShadow: "0 20px 48px rgba(0,0,0,0.16)",
          }}
          className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-colors duration-300 hover:bg-[#0F75BD]"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition mb-5">
            {mission?.icon || <Flag className="w-7 h-7" />}
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white">
            {mission?.title}
          </h3>

          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base">
            {mission?.text}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VisionMissionSection;
