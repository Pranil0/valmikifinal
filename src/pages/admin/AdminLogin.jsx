// AdminLogin.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../../components/admin/LoginForm";
import ForgotPasswordForm from "../../components/admin/ForgotPasswordForm";

const AdminLogin = () => {
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{ background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 55%, #072f50 100%)" }}
    >
      {/* ── animated background circles ── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none"
        style={{ top: "-200px", right: "-200px" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#FCA61B]/8 pointer-events-none"
        style={{ bottom: "-150px", left: "-100px" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-white/5 pointer-events-none"
        style={{ top: "10%", left: "5%" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* ── floating particles ── */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#FCA61B]/50 pointer-events-none"
          style={{
            top:  `${10 + i * 11}%`,
            left: `${5  + i * 12}%`,
          }}
          animate={{ y: [0, -16, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      {/* ── main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* school branding strip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                          px-5 py-2 rounded-full mb-3">
            <div className="w-2 h-2 rounded-full bg-[#FCA61B] animate-pulse" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Valmiki Shiksha Sadan
            </span>
          </div>
          <h1 className="text-white text-2xl font-extrabold">
            Admin{" "}
            <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
              Portal
            </span>
          </h1>
          <p className="text-white/40 text-xs mt-1">Secure access — authorized personnel only</p>
        </motion.div>

        {/* card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#FCA61B] to-[#f8d07a]" />

          <div className="px-8 py-8">
            <AnimatePresence mode="wait">

              {!showForgot ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6">
                    <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-1">
                      Welcome back
                    </p>
                    <h2 className="text-2xl font-extrabold text-gray-900">Sign In</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Enter your credentials to access the dashboard
                    </p>
                  </div>
                  <LoginForm onForgot={() => setShowForgot(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ForgotPasswordForm onBack={() => setShowForgot(false)} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/30 text-xs mt-5"
        >
          © {new Date().getFullYear()} Valmiki Shiksha Sadan. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;