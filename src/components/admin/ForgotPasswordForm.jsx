import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import API from "../../services/api";

const OTP_TIMEOUT = 300;
const RESEND_COOLDOWN = 60;

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail]                     = useState(() => sessionStorage.getItem("otp_email") || "");
  const [otp, setOtp]                         = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep]                       = useState(() => Number(sessionStorage.getItem("otp_step")) || 1);
  const [error, setError]                     = useState("");
  const [loading, setLoading]                 = useState(false);
  const [countdown, setCountdown]             = useState(() => Number(sessionStorage.getItem("otp_countdown")) || 0);
  const [resendCountdown, setResendCountdown] = useState(() => Number(sessionStorage.getItem("otp_resend")) || 0);
  const [showPassword, setShowPassword]       = useState(false);
  const [shake, setShake]                     = useState(false);

  /* ── persist step and email ── */
  useEffect(() => { sessionStorage.setItem("otp_step",  String(step));  }, [step]);
  useEffect(() => { sessionStorage.setItem("otp_email", email);         }, [email]);

  /* ── persist countdowns so they survive refresh ── */
  useEffect(() => { sessionStorage.setItem("otp_countdown", String(countdown));    }, [countdown]);
  useEffect(() => { sessionStorage.setItem("otp_resend",    String(resendCountdown)); }, [resendCountdown]);

  /* ── OTP expiry countdown ── */
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  /* ── resend cooldown ── */
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  /* ── warn before refresh on step 2 ── */
  useEffect(() => {
    if (step !== 2) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [step]);

  /* ── clear session on unmount after success ── */
  const clearSession = () => {
    sessionStorage.removeItem("otp_step");
    sessionStorage.removeItem("otp_email");
    sessionStorage.removeItem("otp_countdown");
    sessionStorage.removeItem("otp_resend");
  };

  /* ── OTP input refs ── */
  const otpRefs = Array.from({ length: 6 }, () => null);
  const setOtpRef = (i) => (el) => { otpRefs[i] = el; };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    otpRefs[Math.min(pasted.length, 5)]?.focus();
  };

  const triggerShake = () => {
    setShake(true);
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => {
      setShake(false);
      otpRefs[0]?.focus();
    }, 600);
  };

  /* ── send OTP ── */
  const handleSendOtp = async () => {
    if (!email.trim()) { setError("Please enter your email."); return; }
    setLoading(true); setError("");
    try {
      await API.post("/admin/forgot-password", { email: email.trim() });
      setStep(2);
      setCountdown(OTP_TIMEOUT);
      setResendCountdown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* ── resend OTP ── */
  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setLoading(true); setError("");
    try {
      await API.post("/admin/forgot-password", { email: email.trim() });
      setCountdown(OTP_TIMEOUT);
      setResendCountdown(RESEND_COOLDOWN);
      setOtp(["", "", "", "", "", ""]);
      otpRefs[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* ── reset password ── */
  const handleResetPassword = async () => {
    const otpStr = otp.join("");
    if (otpStr.length < 6)              { setError("Please enter the complete 6-digit OTP."); return; }
    if (!newPassword)                    { setError("Please enter a new password."); return; }
    if (newPassword.length < 6)          { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true); setError("");
    try {
      await API.post("/admin/reset-password", {
        email: email.trim(),
        otp: otpStr,
        newPassword,
      });
      clearSession();
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  /* ── back to login ── */
  const handleBack = () => {
    clearSession();
    onBack?.();
  };

  /* ── helpers ── */
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const steps = ["Email", "Verify OTP", "New Password"];

  const slideVariants = {
    enter:  { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, x: -40, transition: { duration: 0.25 } },
  };

  const inputCls = `w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-800 focus:bg-white focus:outline-none
    focus:ring-2 focus:ring-[#0F75BD]/40 focus:border-[#0F75BD]
    transition-all duration-200 placeholder:text-gray-400`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)" }}
      >
        {/* ── header ── */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            {step < 3 && (
              <button
                onClick={handleBack}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                           hover:bg-white/20 transition-colors shrink-0"
              >
                <ArrowLeft size={15} className="text-white" />
              </button>
            )}
            <div>
              <h2 className="text-white font-extrabold text-xl leading-tight">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "All Done!"}
              </h2>
              <p className="text-white/50 text-xs mt-0.5">
                {step === 1 && "Enter your admin email to receive an OTP"}
                {step === 2 && `Code sent to ${email}`}
                {step === 3 && "Your password has been reset successfully"}
              </p>
            </div>
          </div>

          {/* progress steps */}
          {step < 3 && (
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center
                        text-xs font-bold transition-all duration-300
                        ${i + 1 < step  ? "bg-[#FCA61B] text-white" :
                          i + 1 === step ? "bg-white text-[#0F75BD]" :
                                           "bg-white/15 text-white/40"}`}
                    >
                      {i + 1 < step ? "✓" : i + 1}
                    </div>
                    <span className={`text-xs hidden sm:block
                      ${i + 1 === step ? "text-white font-semibold" : "text-white/40"}`}>
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-white/15 mx-1">
                      <div
                        className="h-full bg-[#FCA61B] transition-all duration-500"
                        style={{ width: i + 1 < step ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── form body ── */}
        <div className="bg-white rounded-t-3xl px-8 py-8 min-h-[340px]">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: email ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter" animate="center" exit="exit"
              >
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs mb-4 flex items-center gap-1.5">
                    <span>⚠</span>{error}
                  </p>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0F75BD] text-white font-bold rounded-xl text-sm
                             hover:bg-[#0d66a8] transition-all shadow-lg shadow-[#0F75BD]/20
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><RefreshCw size={15} className="animate-spin" /> Sending OTP...</>
                    : <><Mail size={15} /> Send OTP</>
                  }
                </button>
              </motion.div>
            )}

            {/* ── STEP 2: OTP + new password ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter" animate="center" exit="exit"
              >
                {/* OTP boxes */}
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                    Enter 6-digit OTP
                  </label>

                  <motion.div
                    animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex gap-2 justify-between"
                    onPaste={handleOtpPaste}
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={setOtpRef(i)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2
                          transition-all duration-200 focus:outline-none
                          ${digit
                            ? "border-[#0F75BD] bg-[#EFF6FF] text-[#0F75BD]"
                            : "border-gray-200 bg-gray-50 text-gray-800"}
                          focus:border-[#0F75BD] focus:bg-[#EFF6FF]`}
                      />
                    ))}
                  </motion.div>

                  {/* expiry bar */}
                  <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0F75BD] rounded-full"
                      animate={{ width: `${(countdown / OTP_TIMEOUT) * 100}%` }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </div>

                  {/* expiry + resend row */}
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {countdown > 0
                        ? <>Expires in <span className="font-bold text-[#0F75BD]">{formatTime(countdown)}</span></>
                        : <span className="text-red-400 font-semibold">OTP expired</span>
                      }
                    </p>
                    <p className="text-xs text-gray-400">
                      Didn't receive it?{" "}
                      {resendCountdown > 0 ? (
                        <span>
                          Resend in{" "}
                          <span className="font-bold text-[#0F75BD]">
                            {formatTime(resendCountdown)}
                          </span>
                        </span>
                      ) : (
                        <button
                          onClick={handleResend}
                          disabled={loading}
                          className="font-bold text-[#FCA61B] hover:text-[#e59500]
                                     transition-colors disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      )}
                    </p>
                  </div>
                </div>

                {/* new password */}
                <div className="mb-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`${inputCls} pl-11 pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold
                                 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* confirm password */}
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                      className={`${inputCls} pl-11 pr-4
                        ${confirmPassword && confirmPassword !== newPassword
                          ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                          : confirmPassword && confirmPassword === newPassword
                            ? "border-green-300 focus:ring-green-200 focus:border-green-400"
                            : ""
                        }`}
                    />
                    {confirmPassword && confirmPassword === newPassword && (
                      <CheckCircle
                        size={15}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                      />
                    )}
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs mb-4 flex items-center gap-1.5">
                    <span>⚠</span>{error}
                  </p>
                )}

                <button
                  onClick={handleResetPassword}
                  disabled={loading || countdown === 0}
                  className="w-full py-3.5 bg-[#0F75BD] text-white font-bold rounded-xl text-sm
                             hover:bg-[#0d66a8] transition-all shadow-lg shadow-[#0F75BD]/20
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><RefreshCw size={15} className="animate-spin" /> Resetting...</>
                    : <><KeyRound size={15} /> Reset Password</>
                  }
                </button>

                {countdown === 0 && (
                  <p className="text-center text-xs text-red-400 mt-3">
                    Your OTP has expired. Please resend to continue.
                  </p>
                )}
              </motion.div>
            )}

            {/* ── STEP 3: success ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200
                             flex items-center justify-center mb-5"
                >
                  <CheckCircle size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Password Reset!
                </h3>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-8">
                  Your admin password has been updated successfully. You can now
                  log in with your new password.
                </p>
                <button
                  onClick={handleBack}
                  className="px-8 py-3 bg-[#0F75BD] text-white font-bold rounded-xl text-sm
                             hover:bg-[#0d66a8] transition-all shadow-lg shadow-[#0F75BD]/20"
                >
                  Back to Login
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;