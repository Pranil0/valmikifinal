import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-[#FCA61B]/10 pointer-events-none" />
          <div className="absolute top-8 left-1/2 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

          {/* Floating dots */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FCA61B]/40 pointer-events-none"
              style={{ top: `${15 + i * 20}%`, left: `${5 + i * 22}%` }}
              animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}

          <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left w-full lg:w-2/3"
            >
              <div className="inline-flex items-center gap-2 bg-[#FCA61B]/15 border border-[#FCA61B]/30 text-[#FCA61B] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                <GraduationCap size={11} />
                Admissions Open
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Take the first step towards your{" "}
                <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
                  bright future
                </span>
              </h3>

              <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Be the first to know about admissions, academic programs, events, and achievements at Valmiki Shiksha Sadan.
              </p>
            </motion.div>

            {/* RIGHT — Apply button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="shrink-0"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/inquiry"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FCA61B] text-white
                             font-bold rounded-xl text-sm hover:bg-[#e59500] transition-colors
                             shadow-lg shadow-[#FCA61B]/30 whitespace-nowrap"
                >
                  <GraduationCap size={16} />
                  Apply Now
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
