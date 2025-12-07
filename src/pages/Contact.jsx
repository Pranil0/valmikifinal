import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaQuestionCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const faqs = [
  {
    question: "How can I get admission information?",
    answer: "You can fill out the contact form or reach us through our phone or email.",
  },
  {
    question: "What courses are available?",
    answer: "Valmiki College offers multiple programs. Visit our Courses page for details.",
  },
  {
    question: "Where is the college located?",
    answer: "We are located at our main campus. Location map is provided below.",
  },
  {
    question: "Can I visit the college?",
    answer: "Yes, you may visit during working hours. Contact us beforehand if possible.",
  },
];

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !message) {
      toast.error("Please fill all fields.");
      return;
    }

    setStatus("Sending...");
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFullname("");
      setEmail("");
      setMessage("");
      setStatus("");
    }, 1500);
  };

  return (
    <>
      {/* MAIN SECTION */}
      <section className="bg-[#F4F9FF] text-[#0F1F3D] py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* CONTACT FORM */}
          <motion.div
            data-aos="fade-up"
            className="bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-blue-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F75BD] mb-8">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-semibold text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-white border border-blue-300 focus:border-blue-500 rounded-lg py-3 px-4 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-blue-300 focus:border-blue-500 rounded-lg py-3 px-4 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-semibold text-sm mb-2">Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-blue-300 focus:border-blue-500 rounded-lg py-3 px-4 outline-none resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "Sending..."}
                className={`w-full py-3 text-lg rounded-lg font-semibold text-white transition ${
                  status === "Sending..."
                    ? "bg-blue-300"
                    : "bg-[#0F75BD] hover:bg-blue-600"
                }`}
              >
                {status === "Sending..." ? "Sending..." : "Submit"}
              </button>
            </form>

            {/* Contact Details */}
            <div className="mt-12 border-t pt-8 border-blue-300">
              <h3 className="text-2xl font-bold text-[#0F75BD] mb-6">
                Contact Information
              </h3>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <p>Main Campus, Valmiki Shiksha Sadan</p>
                </div>

                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-blue-600" />
                  <p>(91) 98765 4321 54</p>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-blue-600" />
                  <p>support@mail.com</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-5 mt-6 text-2xl text-[#0F75BD]">
                <a
                  href="https://www.facebook.com/vsshssplustwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                  aria-label="VSS Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/valmikiss?igsh=MW5tOWQ1bm9mOW8x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500"
                  aria-label="VSS Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="mailto:info@valmikisikshyasadhan.edu.np"
                  className="hover:text-red-500"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div data-aos="fade-up" className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0F75BD] mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm flex gap-4"
                >
                  <FaQuestionCircle className="text-blue-500 text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            data-aos="fade-up"
            className="rounded-xl overflow-hidden shadow-xl border border-blue-200"
          >
            <iframe
              title="Valmiki Shiksha Sadan Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.372671113949!2d84.4205147753382!3d27.674874426923203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb272bee4379%3A0xa23025bd9f99a7c9!2sValmiki%20Shiksha%20Sadan!5e0!3m2!1sen!2snp!4v1764595503115!5m2!1sen!2snp"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </section>
    </>
  );
};

export default Contact;
