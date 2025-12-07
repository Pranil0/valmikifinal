import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Atom } from "lucide-react";

const ProgramsSection = () => {
  return (
    <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
          Our Programs
        </h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
          At Valmiki Shiksha Sadan, we offer a range of programs designed to
          meet the academic needs of students from early years to higher
          secondary education.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Early Childhood - Grade 10 */}
        <div className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-all duration-500 hover:bg-[#0F75BD]">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition-colors duration-500 mb-5">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white transition-colors duration-500">
            Early Childhood – Grade 10
          </h3>
          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base transition-colors duration-500">
            A solid foundation with modern teaching methods, nurturing
            creativity, discipline, and holistic development from the early
            years up to secondary level.
          </p>
          <NavLink
            to="/grade10"
            className="mt-5 inline-block bg-[#FCA61B] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors duration-300"
          >
            Learn More
          </NavLink>
        </div>

        {/* +2 Science */}
        <div className="group bg-white shadow-lg rounded-2xl p-7 md:p-8 transition-all duration-500 hover:bg-[#0F75BD]">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0F75BD] text-white group-hover:bg-white group-hover:text-[#0F75BD] transition-colors duration-500 mb-5">
            <Atom className="w-7 h-7" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-[#0F75BD] group-hover:text-white transition-colors duration-500">
            +2 Science
          </h3>
          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm md:text-base transition-colors duration-500">
            Designed for students aiming to pursue careers in medicine,
            engineering, IT, and applied sciences, supported by experienced
            faculty and modern labs.
          </p>
          <NavLink
            to="/plus2"
            className="mt-5 inline-block bg-[#FCA61B] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors duration-300"
          >
            Learn More
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
