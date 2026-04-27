import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { GraduationCap } from "lucide-react";
import principalImg from "../assets/principal.png";
import CTA from "../components/CTA";

const Principal = () => {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[58vh] md:min-h-[62vh] overflow-hidden flex items-center"
        style={{ background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)" }}
      >
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#FCA61B]/8 pointer-events-none" />
        <div className="absolute top-10 right-40 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">

          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FCA61B] font-semibold">Principal's Message</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

            {/* ── LEFT: photo ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4 shrink-0"
            >
              {/* photo frame */}
              <div className="relative">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={principalImg}
                    alt="Principal — Valmiki Shiksha Sadan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* amber ring accent */}
                <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-[#FCA61B] flex items-center justify-center shadow-lg">
                  <GraduationCap size={20} className="text-white" />
                </div>
              </div>

              {/* name plate */}
              <div className="text-center">
                <p className="text-white font-bold text-lg leading-tight">Pradip Poudel</p>
                <p className="text-[#FCA61B] text-xs font-semibold uppercase tracking-widest mt-0.5">Principal</p>
                <p className="text-white/40 text-xs mt-0.5">Valmiki Shiksha Sadan</p>
              </div>
            </motion.div>

            {/* ── RIGHT: badge + title + quote ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col justify-center text-center md:text-left"
            >
              {/* badge */}
              <div className="inline-flex self-center md:self-start items-center bg-[#FCA61B]/15 border border-[#FCA61B]/35 text-[#FCA61B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                From the Desk of the Principal
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                A Message from{" "}
                <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
                  the Principal
                </span>
              </h1>

              {/* pull quote */}
              <div className="relative mt-2">
                <FaQuoteLeft className="text-[#FCA61B]/30 text-4xl absolute -top-2 -left-1 md:-left-6" />
                <blockquote className="text-white/70 text-base md:text-lg leading-relaxed italic pl-6 md:pl-8 border-l-2 border-[#FCA61B]/40">
                  Education is not only about examinations and certificates — it is about
                  awakening curiosity, building character, and nurturing values of integrity,
                  respect, and responsibility.
                </blockquote>
              </div>

              <p className="mt-6 text-white/45 text-sm leading-relaxed max-w-xl">
                Guiding students with purpose, discipline, and care towards a brighter
                academic and personal future.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MESSAGE BODY
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">

          {/* section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
              Principal's Message
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F75BD]">
              A Vision for Every Student
            </h2>
            <div className="w-12 h-1 bg-[#FCA61B] rounded-full mx-auto mt-4" />
          </motion.div>

          {/* message card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12"
          >
            <FaQuoteLeft className="text-[#0F75BD]/10 text-6xl mb-6" />
<div className="space-y-5 text-gray-600 text-sm md:text-base leading-relaxed">
  <p className="text-justify">
    Welcome to <strong className="text-[#0F75BD]">Valmiki Shiksha Sadan</strong>, one of Chitwan’s leading educational institutions, dedicated
    to nurturing young minds from playgroup through Grade 12. Our mission is to provide a holistic
    learning experience where academic excellence, personal growth and values-based education go
    hand in hand. Today, our vibrant community includes over 3,000 students, all learning and
    growing in a safe, inspiring and supportive environment.
  </p>

  <p className="text-justify">
    Our students consistently achieve top results in 
    <strong className="text-gray-800"> BLE, SEE and Grade 12 Board examinations</strong>,
    reflecting our unwavering commitment to quality teaching. Beyond academics, we take pride in
    our award-winning achievements in games and sports, as well as our dynamic extracurricular
    activities (ECA) that foster creativity, leadership and teamwork.
  </p>

  <p className="text-justify">
    To enhance learning, we provide modern, fully-equipped facilities, including 
    <strong className="text-gray-800"> air-conditioned spacious classrooms, well-resourced science and computer labs</strong>, 
    a contemporary library, hygienic canteens and reliable school transport. These facilities,
    combined with our qualified and experienced teachers, ensure every student develops confidence,
    critical thinking and a lifelong love for learning.
  </p>

  <p className="text-justify">
    We sincerely thank everyone for being an integral part of Valmiki Shiksha Sadan and deeply
    appreciate your support, trust and encouragement. We look forward to your continued guidance,
    love and collaboration as we strive to nurture and inspire our students every day.
  </p>
</div>

            {/* closing signature */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0F75BD]/20 shrink-0">
                <img
                  src={principalImg}
                  alt="Pradip Poudel"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm italic mb-1">
                  Thank you for being a part of the{" "}
                  <span className="text-[#0F75BD] font-semibold">Valmiki Shiksha Sadan</span> community.
                </p>
                <p className="font-bold text-gray-900 text-sm">Pradip Poudel</p>
                <p className="text-xs text-gray-400">Principal, Valmiki Shiksha Sadan</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <CTA />
    </>
  );
};

export default Principal;