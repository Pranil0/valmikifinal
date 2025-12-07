import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import inquiryVideo from "../assets/inquiry.mp4";
import prospectusPDF from "../assets/gradeXI-prospectus.pdf";

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

import { NavLink } from "react-router-dom";


import valmikibuilding from "../assets/valmikibuilding.png";

// ================= FAQ Component =================
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
      >
        <span>{question}</span>
        {open ? (
          <FaChevronUp className="text-[#0F75BD]" />
        ) : (
          <FaChevronDown className="text-[#0F75BD]" />
        )}
      </button>
      {open && <p className="mt-2 text-sm md:text-base text-gray-600">{answer}</p>}
    </div>
  );
};

// ================= Admission Step Box =================
const AdmissionStep = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center"
  >
    <div className="text-4xl md:text-5xl text-[#FCA61B] mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
      {title}
    </h3>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

// ================= Why Choose Us Card =================
const WhyChooseCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center"
  >
    <div className="text-4xl md:text-5xl text-[#0F75BD] mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
      {title}
    </h3>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const Inquiry = () => {
  const admissionSteps = [
    {
      icon: <FaFileAlt />,
      title: "Fill the Application Form",
      desc: "Complete the Grade XI inquiry or application form with accurate student and guardian details.",
    },
    {
      icon: <FaPaperPlane />,
      title: "Submit Required Documents",
      desc: "Provide academic records, recent photographs, birth certificate, and other requested documents.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Entrance & Counselling",
      desc: "Attend the entrance test and academic counselling session to choose the suitable stream.",
    },
    {
      icon: <FaClock />,
      title: "Admission Confirmation",
      desc: "Once selected, complete the admission process within the given deadline to secure your seat.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Experienced Faculty",
      desc: "Our highly qualified and dedicated teachers provide strong academic guidance and mentoring.",
    },
    {
      icon: <FaAward />,
      title: "Proven Academic Excellence",
      desc: "Valmiki Shiksha Sadan consistently produces outstanding Grade XI & XII board results.",
    },
    {
      icon: <FaUsers />,
      title: "Holistic Student Development",
      desc: "We emphasise discipline, leadership, co-curricular activities, and value-based education.",
    },
  ];

  return (
    <div>
      {/* ============== HERO SECTION ============== */}
     <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
  {/* Background Video */}
  <video
    src={inquiryVideo}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

  {/* Hero Content */}
  <motion.div
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white"
  >
    {/* Breadcrumb */}
    <nav className="text-xs md:text-sm text-gray-200 mb-4">
      <Link to="/" className="hover:text-white cursor-pointer">
        Home
      </Link>{" "}
      <span className="mx-1">/</span>
      <span className="text-[#FCA61B] font-medium">
        Inquiry for Grade XI
      </span>
    </nav>

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent drop-shadow-lg">
      Grade XI Inquiry & Admission
    </h1>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-sm md:text-lg max-w-2xl text-gray-100"
    >
      Begin your +2 journey at Valmiki Shiksha Sadan with our Science and
      Management streams, guided by experienced educators and a supportive
      learning environment.
    </motion.p>

    {/* Download Prospectus Button */}
    <a
  href={prospectusPDF}
  download="GradeXI_Prospectus.pdf" // optional, sets the downloaded file name
  className="mt-6 inline-flex items-center gap-2 bg-[#FCA61B] text-[#0F75BD] px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
>
  <FaDownload />
  Download Grade XI Prospectus
</a>

  </motion.div>
</section>

      {/* ============== ADMISSION INFORMATION ============== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]"
          >
            Admission Process for Grade XI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our admission process is designed to be clear and student-friendly.
            Please follow the steps below to complete your Grade XI admission
            inquiry at Valmiki Shiksha Sadan.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {admissionSteps.map((step, idx) => (
            <AdmissionStep key={idx} {...step} delay={idx * 0.2} />
          ))}
        </div>
      </section>

      {/* ============== INQUIRY FORM ============== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl border border-gray-100">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD] text-center">
            Submit Your Grade XI Inquiry
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 text-center max-w-2xl mx-auto">
            Share your details and preferred stream. Our admission team will
            contact you with further guidance and next steps.
          </p>

          <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Student Name"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <input
              type="text"
              placeholder="Parent / Guardian Name"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <input
              type="date"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <select className="px-4 py-3 rounded-lg border border-gray-300 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60">
              <option value="">Select Preferred Stream</option>
              <option value="Science">+2 Science</option>
              <option value="Management">+2 Management</option>
              <option value="Humanities">+2 Humanities</option>
            </select>

            <textarea
              placeholder="Additional information (academic interests, expectations, etc.)"
              className="px-4 py-3 rounded-lg border border-gray-300 w-full md:col-span-2 min-h-[120px] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-[#FCA61B] text-[#0F75BD] font-semibold py-3 rounded-lg text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* ============== WHY CHOOSE US ============== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]"
          >
            Why Choose Valmiki Shiksha Sadan for Grade XI?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We provide a disciplined yet friendly learning environment where
            students are encouraged to aim high, think clearly, and grow in both
            academics and character.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyChooseUs.map((item, idx) => (
            <WhyChooseCard key={idx} {...item} delay={idx * 0.2} />
          ))}
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about Grade XI admission at Valmiki
            Shiksha Sadan.
          </p>

          <div className="mt-10 text-left space-y-3">
            <FAQItem
              question="When does the Grade XI admission process start?"
              answer="Typically, applications for Grade XI open after the SEE results are published. Please contact our administration for the exact schedule for the current year."
            />
            <FAQItem
              question="What documents do I need to submit?"
              answer="You will need your SEE mark sheet, character certificate, recent passport-sized photos, a copy of your birth certificate, and other documents requested by the school."
            />
            <FAQItem
              question="Which streams are available in Grade XI?"
              answer="We currently offer +2 Science, +2 Management, and +2 Humanities (as applicable). Please check our prospectus or contact us for the latest information."
            />
            <FAQItem
              question="Can I inquire or apply online?"
              answer="Yes, you can submit your initial inquiry through this form. Our team will contact you with details about entrance exams, interviews, and formal admission."
            />
          </div>
        </div>
      </section>

      {/* ============== GOOGLE MAP SECTION ============== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD] text-center">
            Our Campus Location
          </h2>

          <p className="text-center mt-4 text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit Valmiki Shiksha Sadan at Bharatpur-4, Chitwan, to experience
            our learning environment and facilities in person.
          </p>

          <div className="rounded-2xl overflow-hidden shadow-xl w-full h-[320px] md:h-[380px] lg:h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.372671113949!2d84.4205147753382!3d27.674874426923203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb272bee4379%3A0xa23025bd9f99a7c9!2sValmiki%20Shiksha%20Sadan!5e0!3m2!1sen!2snp!4v1764595503115!5m2!1sen!2snp"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Valmiki Shiksha Sadan Location"
            ></iframe>
          </div>
        </div>
      </section>

     {/* ============== CTA SECTION ============== */}
<section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
  <div className="max-w-4xl mx-auto bg-[#0F75BD] text-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
      Ready to Start Your Grade XI Journey?
    </h2>

    <p className="mt-4 text-sm md:text-base text-center max-w-2xl mx-auto">
      Submit your inquiry today and take the first step towards a strong
      academic future at Valmiki Shiksha Sadan.
    </p>

    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
      {/* Submit Inquiry button redirects to Contact page */}
      <NavLink
        to="/contact"
        className="px-6 py-3 bg-[#FCA61B] text-[#0F75BD] font-semibold rounded-lg text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg text-center"
      >
        Submit Inquiry
      </NavLink>

      <a
        href="/prospectus.pdf"
        download
        className="px-6 py-3 bg-white text-[#0F75BD] font-semibold rounded-lg text-sm md:text-base hover:bg-gray-100 transition shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <FaDownload className="text-[#0F75BD]" />
        Download Prospectus
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default Inquiry;
