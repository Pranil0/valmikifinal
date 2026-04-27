import React, { useState, useRef, useEffect } from "react";
import { Menu, Lock, ChevronDown, Eye, EyeOff, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../assets/valmikilogo.png";
import API from "../../services/api";

/* ── Change Password Modal ── */
const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld]         = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Please fill in all fields."); return;
    }
    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters."); return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match."); return;
    }
    setLoading(true);
    try {
      const res = await API.post("/admin/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      toast.success(res.data.message || "Password changed successfully.");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-800 focus:bg-white focus:outline-none
    focus:ring-2 focus:ring-[#0F75BD]/40 focus:border-[#0F75BD]
    transition-all duration-200 placeholder:text-gray-400`;

  const fields = [
    { name: "oldPassword",     label: "Current Password", show: showOld,     toggle: () => setShowOld(!showOld) },
    { name: "newPassword",     label: "New Password",      show: showNew,     toggle: () => setShowNew(!showNew) },
    { name: "confirmPassword", label: "Confirm Password",  show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{   opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          className="px-7 pt-7 pb-6 relative"
          style={{ background: "linear-gradient(135deg, #0F75BD 0%, #0a4a7a 60%, #072f50 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCA61B] to-[#f8d07a]" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
                <Lock size={20} className="text-white" />
              </div>
              <h2 className="text-white font-extrabold text-xl leading-tight">
                Change Password
              </h2>
              <p className="text-white/50 text-xs mt-1">
                Update your admin account password
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                         hover:bg-white/20 transition-colors mt-1"
            >
              <X size={15} className="text-white" />
            </button>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="px-7 py-7 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                {f.label}
              </label>
              <div className="relative">
                <input
                  type={f.show ? "text" : "password"}
                  name={f.name}
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                  value={form[f.name]}
                  onChange={handleChange}
                  className={`${inputCls} ${
                    f.name === "confirmPassword" && form.confirmPassword
                      ? form.confirmPassword === form.newPassword
                        ? "border-green-300 focus:border-green-400 focus:ring-green-200"
                        : "border-red-300 focus:border-red-400 focus:ring-red-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={f.toggle}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
                             hover:text-gray-600 transition-colors"
                >
                  {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* strength bar — new password only */}
              {f.name === "newPassword" && form.newPassword && (
                <div className="mt-1.5 flex items-center gap-1">
                  {[1, 2, 3, 4].map((lvl) => {
                    const strength = Math.min(Math.floor(form.newPassword.length / 3), 4);
                    return (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          lvl <= strength
                            ? strength <= 1 ? "bg-red-400"
                            : strength === 2 ? "bg-amber-400"
                            : strength === 3 ? "bg-blue-400"
                            : "bg-green-400"
                            : "bg-gray-200"
                        }`}
                      />
                    );
                  })}
                  <span className="text-xs text-gray-400 ml-1 w-12">
                    {form.newPassword.length < 4  ? "Weak"
                      : form.newPassword.length < 7  ? "Fair"
                      : form.newPassword.length < 10 ? "Good"
                      : "Strong"}
                  </span>
                </div>
              )}
            </div>
          ))}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600
                         text-sm font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#0F75BD] text-white font-bold rounded-xl text-sm
                         hover:bg-[#0d66a8] transition-all shadow-lg shadow-[#0F75BD]/20
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading
                ? <><RefreshCw size={14} className="animate-spin" /> Updating...</>
                : <><Lock size={14} /> Update Password</>
              }
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ── Topbar ── */
const Topbar = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen]         = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dropdownRef = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="h-16 bg-white shadow-sm border-b border-gray-200
                      flex items-center justify-between px-4 sm:px-6 z-40 relative">

        {/* ── LEFT ── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800
                       hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Valmiki Logo" className="h-9 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="font-extrabold text-sm text-gray-900 leading-tight">
                Valmiki Admin
              </p>
              <p className="text-xs text-gray-400 leading-tight">Management Portal</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-3" ref={dropdownRef}>

          {/* welcome text */}
          <p className="hidden md:block text-sm text-gray-500 font-medium">
            Welcome back,{" "}
            <span className="text-[#0F75BD] font-bold">Admin</span>
          </p>

          {/* avatar button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
                       hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F75BD] to-[#0a4a7a]
                            flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-extrabold">AD</span>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200
                ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* dropdown — change password only */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{   opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-14 right-4 sm:right-6 w-48 bg-white rounded-2xl
                           shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowChangePassword(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                               text-sm text-gray-700 hover:bg-[#EFF6FF] hover:text-[#0F75BD]
                               transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100
                                    group-hover:bg-[#0F75BD]/10
                                    flex items-center justify-center transition-colors">
                      <Lock size={13} className="text-gray-500 group-hover:text-[#0F75BD]" />
                    </div>
                    <span className="font-medium">Change Password</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── modal ── */}
      <AnimatePresence>
        {showChangePassword && (
          <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Topbar;