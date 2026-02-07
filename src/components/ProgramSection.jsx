import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BookOpen, Atom } from "lucide-react";

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
    y: 35,
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

const ProgramsSection = () => {
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
          Our Programs
        </h2>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
          At Valmiki Shiksha Sadan, we offer a range of programs designed to
          meet the academic needs of students from early years to higher
          secondary education.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Program 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.05,
            boxShadow: "0 22px 55px rgba(0,0,0,0.18)",
          }}
          className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-colors duration-300 hover:bg-[#0F75BD]"
        >
          
<div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition mb-5">
            <BookOpen className="w-7 h-7" />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white">
            Early Childhood – Grade 10
          </h3>

          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base">
            A solid foundation with modern teaching methods, nurturing creativity,
            discipline, and holistic development from the early years up to
            secondary level.
          </p>

          <NavLink
            to="/grade10"
            className="mt-5 inline-block bg-[#FCA61B] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            Learn More
          </NavLink>
        </motion.div>

        {/* Program 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.05,
            boxShadow: "0 22px 55px rgba(0,0,0,0.18)",
          }}
          className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-colors duration-300 hover:bg-[#0F75BD]"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition mb-5">
            <Atom className="w-7 h-7" />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white">
            +2 Programs
          </h3>

          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base">
            Designed for students aiming to pursue careers in medicine,
            engineering, IT, and applied sciences, supported by experienced
            faculty and modern labs.
          </p>

          <NavLink
            to="/plus2"
            className="mt-5 inline-block bg-[#FCA61B] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            Learn More
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProgramsSection;




