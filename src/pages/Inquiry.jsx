import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import inquiryVideo from "../assets/inquiryfinal.mp4";
import prospectusPDF from "../assets/gradeXI-prospectus.pdf";
import { useLocation } from "react-router-dom"
import {
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaChalkboardTeacher,
  FaAward,
  FaUsers,
  FaDownload,
} from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

// ─────────────────────────────────────────────
// FAQ Item
// ─────────────────────────────────────────────
const FAQItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (

    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-md border-[#0F75BD]/30" : "hover:border-gray-300"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left px-6 py-5 bg-white"
      >
        <span className={`font-semibold text-sm md:text-base pr-4 ${open ? "text-[#0F75BD]" : "text-gray-800"}`}>
          {question}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
          open ? "bg-[#0F75BD] text-white" : "bg-gray-100 text-gray-500"
        }`}>
          {open ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <div className="w-12 h-0.5 bg-[#FCA61B] mb-3" />
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Admission Step
// ─────────────────────────────────────────────
const AdmissionStep = ({ icon, title, desc, step, delay, isLast }) => (
  <div className="relative flex flex-col items-center">
    {/* Connector line */}
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-[#0F75BD]/30 to-[#FCA61B]/30 z-0" />
    )}

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative z-10 flex flex-col items-center text-center group"
    >
      {/* Step number badge */}
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center group-hover:border-[#0F75BD]/30 group-hover:shadow-xl transition-all duration-300">
          <span className="text-3xl text-[#FCA61B]">{icon}</span>
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0F75BD] text-white text-xs font-black flex items-center justify-center shadow">
          {step}
        </span>
      </div>

      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{desc}</p>
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────
// Why Choose Card
// ─────────────────────────────────────────────
const WhyChooseCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0F75BD]/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    {/* Amber left accent */}
    <div className="absolute left-0 top-0 h-full w-1 bg-[#FCA61B] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-5 group-hover:bg-[#0F75BD] transition-colors duration-300">
      <span className="text-2xl text-[#0F75BD] group-hover:text-white transition-colors duration-300">{icon}</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

// ─────────────────────────────────────────────
// Input field helper
// ─────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</label>
    {children}
  </div>
);

const inputCls =
  "px-4 py-3 rounded-xl border border-gray-200 w-full text-sm text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/40 focus:border-[#0F75BD] transition-all duration-200 placeholder:text-gray-400";

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────





const Inquiry = () => {
  const location = useLocation();


const scrollToInquiry = () => {
  const el = document.getElementById("inquiry-form");

  if (el) {
    const navbarHeight = 80;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};
useEffect(() => {
  if (location.state?.scrollTo === "map-section") {
    setTimeout(() => {
      const el = document.getElementById("map-section");
      if (el) {
        const navbarHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 400);
  }
}, [location.state]);
const [formData, setFormData] = useState({
  studentName: "",
  parentName: "",
  email: "",
  contact: "",
  dob: "",
  stream: "",
  additionalInfo: "",
});
const [submitting, setSubmitting] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload
  setSubmitting(true);

  try {
    const res = await API.post("/inquiry", {
      fullName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.contact,
      dob: formData.dob,
      stream: formData.stream,
      message: formData.additionalInfo,
    });

    if (res.data.success) {
      toast.success("Inquiry submitted successfully!");
      // reset form
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        contact: "",
        dob: "",
        stream: "",
        additionalInfo: "",
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit inquiry. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  const admissionSteps = [
    {
      icon: <FaFileAlt />,
      title: "Fill the Application Form",
      desc: "Complete the inquiry form with accurate student and guardian details.",
    },
    {
      icon: <FaPaperPlane />,
      title: "Submit Documents",
      desc: "Provide academic records, photos, birth certificate and other documents.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Entrance & Counselling",
      desc: "Attend the entrance test and academic counselling to select your stream.",
    },
    {
      icon: <FaClock />,
      title: "Confirm Admission",
      desc: "Complete the admission process within the deadline to secure your seat.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Experienced Faculty",
      desc: "Highly qualified and dedicated teachers provide strong academic guidance and personalised mentoring.",
    },
    {
      icon: <FaAward />,
      title: "Proven Excellence",
      desc: "Valmiki Shiksha Sadan consistently produces outstanding Grade XI & XII board results year after year.",
    },
    {
      icon: <FaUsers />,
      title: "Holistic Development",
      desc: "We emphasise discipline, leadership, co-curricular activities, and value-based education.",
    },
  ];

  
  return (
    <div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative h-[75vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <video
          src={inquiryVideo}
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 flex flex-col items-center text-center px-6 text-white max-w-3xl mx-auto"
        >
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-300 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#FCA61B] font-semibold">Inquiry for Grade XI</span>
          </nav>

          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#FCA61B]/20 border border-[#FCA61B]/40 text-[#FCA61B] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Admissions Open
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Grade XI{" "}
            <span className="bg-gradient-to-r from-[#FCA61B] to-[#f8d07a] bg-clip-text text-transparent">
              Inquiry & Admission
            </span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Take the first step towards your future. Join Valmiki Shiksha Sadan
            for a world-class +2 education in Science, Management, or Humanities.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#inquiry-form"
              className="px-7 py-3.5 bg-[#0F75BD] text-white font-semibold rounded-xl text-sm hover:bg-[#0d66a8] transition-all shadow-lg hover:shadow-[#0F75BD]/30"
            >
              Apply Now
            </a>
            <a
              href={prospectusPDF}
              download="GradeXI_Prospectus.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FCA61B] text-white font-semibold rounded-xl text-sm hover:bg-[#e59500] transition-all shadow-lg"
            >
              <FaDownload size={13} />
              Download Prospectus
            </a>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ══════════════════════════════════════
          ADMISSION STEPS
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3"
            >
              How to Apply
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-[#0F75BD]"
            >
              Admission Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              Our admission process is simple, transparent and student-friendly.
              Follow these four steps to complete your Grade XI enrollment.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {admissionSteps.map((step, idx) => (
              <AdmissionStep
                key={idx}
                {...step}
                step={idx + 1}
                delay={idx * 0.15}
                isLast={idx === admissionSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

   {/* ══════════════════════════════════════
      INQUIRY FORM
  ══════════════════════════════════════ */}

  
<section id="inquiry-form" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
  <div className="max-w-5xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

      {/* Left info panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 space-y-6"
      >
        <div>
          <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">Inquire Now</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD] leading-tight">
            Submit Your Grade XI Inquiry
          </h2>
          <div className="w-12 h-1 bg-[#FCA61B] rounded-full mt-4" />
        </div>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Share your details and preferred stream. Our admission team will
          reach out with guidance, entrance details and next steps.
        </p>

        {/* Contact info */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-[#0F75BD]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Location</p>
              <p className="text-sm text-gray-700">Bharatpur-4, Chitwan, Nepal</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
    <Phone size={16} className="text-[#0F75BD]" />
  </div>
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Phone</p>
    <p className="text-sm text-gray-700">056-595550</p>
    <p className="text-sm text-gray-700">056-595150</p>
    <p className="text-sm text-gray-700">056-59550</p>
  </div>
</div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
              <Mail size={16} className="text-[#0F75BD]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
              <p className="text-sm text-gray-700">vsshss2053@gmail.com</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100"
      >
        {/* Wrap in a form for accessibility */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Student Name">
            <input
              type="text"
              placeholder="e.g. Ram Sharma"
              className={inputCls}
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </Field>
          <Field label="Parent / Guardian Name">
            <input
              type="text"
              placeholder="e.g. Hari Sharma"
              className={inputCls}
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              placeholder="example@email.com"
              className={inputCls}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Field>
          <Field label="Contact Number">
            <input
              type="tel"
              placeholder="+977-98XXXXXXXX"
              className={inputCls}
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </Field>
          <Field label="Date of Birth">
            <input
              type="date"
              className={inputCls}
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </Field>
          <Field label="Preferred Stream">
            <select
              className={inputCls}
              value={formData.stream}
              onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
            >
              <option value="">Select a stream</option>
              <option value="Science">+2 Science</option>
              <option value="Management">+2 Management</option>
              <option value="Humanities">+2 Hotel management</option>
            </select>
          </Field>
          <Field label="Additional Information">
            <textarea
              placeholder="Academic interests, expectations, questions..."
              className={`${inputCls} md:col-span-2 min-h-[110px] resize-none`}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-[#0F75BD] text-white font-bold py-3.5 rounded-xl text-sm md:text-base hover:bg-[#0d66a8] transition-all duration-300 shadow-lg hover:shadow-[#0F75BD]/30 flex items-center justify-center gap-2 md:col-span-2"
          >
            <FaPaperPlane size={14} />
            {submitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-3">
          Our team will respond within 1–2 business days.
        </p>
      </motion.div>
    </div>
  </div>
</section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3"
            >
              Our Strengths
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-[#0F75BD]"
            >
              Why Choose Valmiki Shiksha Sadan?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              A disciplined, friendly environment where students aim high, think
              clearly and grow in both academics and character.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, idx) => (
              <WhyChooseCard key={idx} {...item} delay={idx * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Common questions about Grade XI admission at Valmiki Shiksha Sadan.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                question: "When does the Grade XI admission process start?",
                answer: "Applications for Grade XI typically open after SEE results are published. Please contact our administration for the exact schedule for the current academic year.",
              },
              {
                question: "What documents do I need to submit?",
                answer: "You will need your SEE mark sheet, character certificate, recent passport-sized photos, a copy of your birth certificate, and any other documents requested by the school.",
              },
              {
                question: "Which streams are available in Grade XI?",
                answer: "We currently offer +2 Science, +2 Management, and +2 Humanities. Please check our prospectus or contact us for the most up-to-date stream availability.",
              },
              {
                question: "Can I inquire or apply online?",
                answer: "Yes. Submit your initial inquiry through the form above. Our team will contact you with details about entrance exams, interviews and formal admission steps.",
              },
            ].map((faq, idx) => (
              <FAQItem key={idx} {...faq} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAP
      ══════════════════════════════════════ */}

<section id="map-section" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3">Find Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">Our Campus Location</h2>
            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto">
              Visit us at Bharatpur-4, Chitwan to experience our learning environment and facilities in person.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 w-full h-[320px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.372671113949!2d84.4205147753382!3d27.674874426923203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb272bee4379%3A0xa23025bd9f99a7c9!2sValmiki%20Shiksha%20Sadan!5e0!3m2!1sen!2snp!4v1764595503115!5m2!1sen!2snp"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Valmiki Shiksha Sadan Location"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative bg-[#0F75BD] rounded-3xl overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#FCA61B]/10" />
          <div className="absolute top-6 right-32 w-20 h-20 rounded-full bg-[#FCA61B]/20" />

          <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-3">Ready to Begin?</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Start Your Grade XI Journey Today
              </h2>
              <p className="mt-3 text-white/70 text-sm md:text-base max-w-md">
                Submit your inquiry or download the prospectus to learn more about what we offer.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
  onClick={scrollToInquiry}
  className="px-7 py-3.5 bg-[#FCA61B] text-white font-bold rounded-xl text-sm hover:bg-[#e59500] transition-all shadow-lg hover:shadow-[#FCA61B]/30 whitespace-nowrap"
>
  Submit Inquiry
</button>
              <a
                href={prospectusPDF}
                download="GradeXI_Prospectus.pdf"
                className="px-7 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <FaDownload size={13} />
                Download Prospectus
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Inquiry;
