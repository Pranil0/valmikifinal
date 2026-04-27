import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { ChevronDown, MessageSquare, HelpCircle, Send, Phone } from "lucide-react";
import HeroSection from "../components/HeroSection";
import schoolBg from "../assets/valmikibuilding.png";
import API from "../services/api";

const faqs = [
  {
    question: "How can I get admission information?",
    answer:
      "You can fill out the contact form or reach us through our phone or email. Our admissions team responds within one working day.",
  },
  {
    question: "What courses are available?",
    answer:
      "Valmiki Shiksha Sadan offers Science, Management, and Hotel Management streams at the +2 level. Visit our Programmes page for full details.",
  },
  {
    question: "Where is the college located?",
    answer:
      "We are located at Bharatpur-4, Chitwan, Nepal. You can find us on the map below or use the address to navigate directly.",
  },
  {
    question: "Can I visit the college?",
    answer:
      "Yes, you're welcome to visit during working hours (Sunday–Friday, 10 AM – 4 PM). We recommend contacting us beforehand to arrange a guided tour.",
  },
];

const contactInfo = [
  {
    icon: <FaMapMarkerAlt size={18} />,
    label: "Address",
    value: "Bharatpur-4,Baidiknagar, Chitwan, Nepal",
    href: null,
  },
 {
  icon: <FaPhoneAlt size={16} />,
  label: "Phone",
  value: (
    <div className="flex flex-col gap-1">
      <a href="tel:056595550" className="hover:text-[#FCA61B] transition-colors">056-595550</a>
      <a href="tel:056595150" className="hover:text-[#FCA61B] transition-colors">056-595150</a>
      <a href="tel:056595500" className="hover:text-[#FCA61B] transition-colors">056-59550</a>
    </div>
  ),
  href: null,
},
  {
    icon: <FaEnvelope size={16} />,
    label: "Email",
    value: "vsshss2053@gmail.com",
    href: "mailto:vsshss2053@gmail.com",
  },
];

/* ── validation ── */
const validate = ({ fullName, email, phone, message }) => {
  if (!fullName.trim())            return "Full name is required.";
  if (fullName.trim().length < 3)  return "Full name must be at least 3 characters.";
  if (!email.trim())               return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(phone))
    return "Please enter a valid phone number.";
  if (!message.trim())             return "Message is required.";
  if (message.trim().length < 10)  return "Message must be at least 10 characters.";
  return null;
};

/* ── FAQ Item ── */
const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-blue-100 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F75BD]/8 flex items-center justify-center shrink-0
                          group-hover:bg-[#0F75BD] transition-colors duration-300">
            <HelpCircle size={15} className="text-[#0F75BD] group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown size={18} className="text-[#0F75BD]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-5 pt-0 border-t border-blue-50">
              <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── field error helper ── */
const FieldError = ({ msg }) =>
  msg ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-500 text-xs mt-1 flex items-center gap-1"
    >
      <span>⚠</span> {msg}
    </motion.p>
  ) : null;

/* ── Main Page ── */
const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email:    "",
    phone:    "",
    message:  "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [sending, setSending]         = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getFieldError = (field) => {
    const { fullName, email, phone, message } = { ...form, [field]: form[field] };
    if (field === "fullName") {
      if (!fullName.trim())           return "Full name is required.";
      if (fullName.trim().length < 3) return "Must be at least 3 characters.";
    }
    if (field === "email") {
      if (!email.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email.";
    }
    if (field === "phone" && phone) {
      if (!/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) return "Enter a valid phone number.";
    }
    if (field === "message") {
      if (!message.trim())            return "Message is required.";
      if (message.trim().length < 10) return "Must be at least 10 characters.";
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const err = getFieldError(name);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate all fields
    const error = validate(form);
    if (error) {
      // set all field errors at once
      setFieldErrors({
        fullName: getFieldError("fullName"),
        email:    getFieldError("email"),
        phone:    getFieldError("phone"),
        message:  getFieldError("message"),
      });
      toast.error(error);
      return;
    }

    setSending(true);
    try {
     await API.post("/contact", {
  fullName: form.fullName.trim(),
  email: form.email.trim(),
  phone: form.phone.trim() || null,
  message: form.message.trim(),
});
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ fullName: "", email: "", phone: "", message: "" });
      setFieldErrors({});
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const inputCls = (field) =>
    `w-full bg-gray-50 border rounded-xl py-3 px-4 text-sm outline-none
     transition-all duration-200 placeholder-gray-400 text-gray-800
     focus:bg-white focus:ring-2
     ${fieldErrors[field]
       ? "border-red-300 focus:border-red-400 focus:ring-red-100"
       : "border-gray-200 focus:border-[#0F75BD] focus:ring-[#0F75BD]/20"
     }`;

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: "12px", background: "#0F75BD", color: "#fff", fontWeight: "bold" },
        error: { style: { background: "#ef4444" } },
        success: { style: { background: "#0F75BD" } },
      }} />

      {/* ── HERO ── */}
      <HeroSection
        image={schoolBg}
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for admissions, queries, or a campus visit."
        badge="Get In Touch"
        breadcrumb={[{ label: "Home", link: "/" }, { label: "Contact" }]}
        size="compact"
        titleStyle="white"
        overlayStyle="bottom-heavy"
      />

      {/* ── CONTACT + INFO SPLIT ── */}
      <section className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
              Reach Out
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Send Us a Message
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── FORM (3/5) ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-[#0F75BD]/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#0F75BD]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Leave a message</h3>
                  <p className="text-xs text-gray-400">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* name + email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your full name"
                      className={inputCls("fullName")}
                    />
                    <FieldError msg={fieldErrors.fullName} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="your@email.com"
                      className={inputCls("email")}
                    />
                    <FieldError msg={fieldErrors.email} />
                  </div>
                </div>

                {/* phone — optional */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Phone Number{" "}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+977 98XXXXXXXX"
                      className={`${inputCls("phone")} pl-11`}
                    />
                  </div>
                  <FieldError msg={fieldErrors.phone} />
                </div>

                {/* message */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your message here..."
                    className={`${inputCls("message")} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <FieldError msg={fieldErrors.message} />
                    <span className={`text-xs ml-auto ${
                      form.message.length < 10 && form.message.length > 0
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}>
                      {form.message.length} / 10 min
                    </span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white
                             flex items-center justify-center gap-2 transition-colors duration-200
                             bg-[#0F75BD] hover:bg-[#0d66a8] shadow-lg shadow-[#0F75BD]/20
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </motion.button>

                <p className="text-xs text-center text-gray-400">
                  Fields marked with <span className="text-red-400">*</span> are required.
                </p>
              </form>
            </motion.div>

            {/* ── INFO PANEL (2/5) ── */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm
                             flex items-start gap-4 hover:border-[#0F75BD]/30
                             hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0F75BD]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#0F75BD]">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FCA61B] mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      
                        <a href={item.href}
                        className="text-sm font-semibold text-gray-800
                                   hover:text-[#0F75BD] transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* social + hours */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FCA61B] mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: <FaFacebookF size={14} />,
                      href: "https://www.facebook.com/vsshssplustwo",
                      label: "Facebook",
                      hover: "hover:bg-blue-600",
                    },
                    {
                      icon: <FaInstagram size={14} />,
                      href: "https://www.instagram.com/valmikiss",
                      label: "Instagram",
                      hover: "hover:bg-pink-500",
                    },
                    {
                      icon: <FaEnvelope size={14} />,
                      href: "mailto:vsshss2053@gmail.com",
                      label: "Email",
                      hover: "hover:bg-[#0F75BD]",
                    },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center
                                  text-gray-600 hover:text-white transition-all duration-300 ${s.hover}`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
  <p className="text-[10px] font-black uppercase tracking-widest text-[#FCA61B] mb-2">
    Office Hours
  </p>
  <p className="text-sm text-gray-600">
    Mon – Fri:{" "}
    <span className="font-semibold text-gray-800">6:00 AM – 5:00 PM</span>
  </p>
  <p className="text-sm text-gray-600 mt-0.5">
    Sat – Sun:{" "}
    <span className="font-semibold text-gray-800">Closed</span>
  </p>
</div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#EFF6FF] py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Frequently Asked Questions
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
            <p className="mt-4 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Can't find what you're looking for? Feel free to reach out via the contact form above.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">
              Location
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Find Us on the Map
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-blue-100"
          >
            <iframe
              title="Valmiki Shiksha Sadan Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.372671113949!2d84.4205147753382!3d27.674874426923203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb272bee4379%3A0xa23025bd9f99a7c9!2sValmiki%20Shiksha%20Sadan!5e0!3m2!1sen!2snp!4v1764595503115!5m2!1sen!2snp"
              width="100%"
              height="440"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;