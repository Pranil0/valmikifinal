// LoginForm.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, RefreshCw, Eye, EyeOff } from "lucide-react";
import API from "../../services/api";

const LoginForm = ({ onForgot }) => {
  const navigate = useNavigate();

  const [form, setForm]               = useState({ email: "", password: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake]             = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/admin/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full py-3.5 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-800 focus:bg-white focus:outline-none
    focus:ring-2 focus:ring-[#0F75BD]/40 focus:border-[#0F75BD]
    transition-all duration-200 placeholder:text-gray-400`;

  return (
    <motion.form
      onSubmit={handleLogin}
      animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 bg-red-50 border border-red-200
                       text-red-600 text-xs rounded-xl px-4 py-3"
          >
            <span>⚠</span>{error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* email */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Email Address
        </label>
        <div className="relative">
          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className={`${inputCls} pl-11`}
          />
        </div>
      </div>

      {/* password */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Password
        </label>
        <div className="relative">
          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className={`${inputCls} pl-11 pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600 transition-colors"
          >
            {showPassword
              ? <EyeOff size={15} />
              : <Eye size={15} />
            }
          </button>
        </div>
      </div>

      {/* forgot password */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgot}
          className="text-xs font-bold text-[#FCA61B] hover:text-[#e59500] transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* submit */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#0F75BD] text-white font-bold rounded-xl text-sm
                   hover:bg-[#0d66a8] transition-all shadow-lg shadow-[#0F75BD]/20
                   disabled:opacity-60 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        {loading
          ? <><RefreshCw size={15} className="animate-spin" /> Signing in...</>
          : "Sign In to Dashboard"
        }
      </motion.button>
    </motion.form>
  );
};


export default LoginForm;