import React from "react";
import { NavLink } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import valmikicollegebuilding from "../assets/valmikicollegebuilding.jpg";
import banner from "../assets/cover_valmiki.png";
import officeImg from "../assets/schoolbuilding.webp";
import CTA from "../components/CTA";
import ProgramSection from "../components/ProgramSection";

const stats = [
  { value: "1996", label: "Established (2053 B.S.)" },
  { value: "25+", label: "Years of Academic Legacy" },
  { value: "95%", label: "A & A+ Grade Achievers" },
  { value: "40+", label: "Dedicated Teaching Staff" },
];

const values = [
  { label: "Student-Centered Learning", color: "#0F75BD" },
  { label: "Character & Leadership", color: "#CC0033" },
  { label: "Strong Academic Rigor", color: "#0F75BD" },
  { label: "Community Engagement", color: "#CC0033" },
  { label: "Integrity & Mutual Respect", color: "#0F75BD" },
  { label: "Holistic Development", color: "#CC0033" },
];

const Introduction = () => {
  return (
    <>

     {/* HERO SECTION — Introduction Page */}
<section className="bg-gradient-to-r from-[#E8F3FF] via-white to-[#FFE8E8] py-16 md:py-20">
  <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
      Welcome to 
      <span className="text-[#0F75BD]"> Valmiki Shiksha Sadan</span>
    </h1>

    <p className="mt-4 text-gray-600 text-sm md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
      A center of academic excellence offering holistic education, strong values, 
      and dedicated guidance to prepare students for higher studies and real-world success.
    </p>

    {/* Breadcrumb (optional but professional) */}
    <nav className="mt-5 text-[12px] md:text-sm font-medium text-gray-500">
      <NavLink to="/" className="hover:text-[#0F75BD] transition">Home</NavLink>
      <span className="mx-2">/</span>
      <span className="text-[#0F75BD] font-semibold">Introduction</span>
    </nav>

  </div>
</section>


      {/* ================= ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20">
        {/* Title + Intro */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-[#0F75BD]">
            About Our Institution
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            About <span className="text-[#0F75BD]">Valmiki Shiksha Sadan</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Valmiki Shiksha Sadan (VSS) is a trusted educational institution in
            Bharatpur that combines strong academics, values-based learning, and
            modern teaching practices to prepare students for higher studies and
            life beyond the classroom.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image block */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-md md:max-w-lg lg:max-w-xl h-[320px] md:h-[360px] lg:h-[380px]">
            <img
              src={officeImg}
              className="w-full h-full object-cover rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-300"
              alt="Valmiki Shiksha Sadan Campus"
            />

           </div>

          {/* Content block */}
          <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4 md:space-y-5">
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
              <strong>early childhood to secondary level</strong>, including{" "}
              <strong>+2 Science and +2 Management programs</strong>. With a
              team of dedicated and highly qualified teachers, VSS ensures
              personalized guidance, supportive mentoring, and a safe,
              student-friendly environment.
            </p>
            <p>
              Our approach to learning goes beyond textbooks. We encourage{" "}
              <strong>critical thinking, creativity, leadership, discipline</strong>{" "}
              and respect for diversity. Students are inspired to participate in
              co-curricular and extra-curricular activities such as clubs,
              sports, social work, and innovation projects so that they grow as
              confident and responsible individuals.
            </p>
            <p>
              As an institution, we are continuously upgrading our teaching
              methods, infrastructure, and learning resources to keep pace with
              the changing world, while staying rooted in our{" "}
              <strong>values of integrity, hard work, and compassion</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS / EXCELLENCE ================= */}
 <section className="relative py-16 px-6">
  <div className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">

    <img
      src={valmikicollegebuilding}
      alt="Valmiki College Building"
      className="w-full h-full object-cover absolute inset-0"
    />

    <div className="absolute inset-0 bg-[#0F75BD]/95" />

    <div className="relative px-6 py-10 md:py-14">

      <div className="text-center mb-10 text-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          A Proven Record of Academic Excellence
        </h2>
      
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/25 text-center text-white gap-y-6 md:gap-y-0">
        {stats.map((stat, index) => (
          <div key={index} className="px-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
              {stat.value}
            </h3>
            <p className="mt-2 text-xs md:text-sm text-gray-200">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </div>

  </div>
</section>


<ProgramSection/>

      <hr className="border-t border-gray-200 mx-6 md:mx-10" />

    


      {/* ================= CTA ================= */}
      <CTA />
    </>
  );
};

export default Introduction;
