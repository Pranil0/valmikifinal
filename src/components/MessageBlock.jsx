import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const MessageBlock = ({ img, name, designation, institute, message }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* ── LEFT: photo panel ── */}
          <div className="lg:col-span-4 relative bg-gradient-to-b from-[#0F75BD]/5 to-[#0F75BD]/10 flex flex-col items-center justify-start pt-10 pb-16 px-8">

            {/* amber top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCA61B] to-[#f8d07a]" />

            {/* photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={img}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* blue corner accent */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#0F75BD] flex items-center justify-center shadow-lg">
                <FaQuoteLeft className="text-white text-sm" />
              </div>
            </motion.div>

            {/* name card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 text-center"
            >
              <p className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                {name}
              </p>
              <div className="w-10 h-0.5 bg-[#FCA61B] rounded-full mx-auto my-2" />
              <p className="text-[#0F75BD] text-xs font-bold uppercase tracking-widest">
                {designation}
              </p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                {institute}
              </p>
            </motion.div>

          </div>

          {/* ── RIGHT: message panel ── */}
          <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-center">

            {/* decorative quote */}
            <FaQuoteLeft className="text-[#0F75BD]/8 text-7xl mb-4 -ml-2" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 text-sm md:text-[15px] leading-relaxed space-y-4"
            >
              {message}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;