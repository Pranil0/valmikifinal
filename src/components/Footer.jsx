import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import cloud from '../assets/cloud.png';
import logo from '../assets/valmikilogo.png';
import { NavLink } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="relative bg-[#0F75BD] text-white pt-12 pb-8 px-6 md:px-16">
      {/* Cloud Backgrounds */}
      <img src={cloud} alt="cloud" className="absolute top-8 left-6 w-20 opacity-80" />
      <img src={cloud} alt="cloud" className="absolute top-6 right-6 w-20 opacity-80" />

      <div className="flex flex-col md:flex-row md:justify-between gap-10 relative z-10">
        {/* Logo and Social */}
        <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={logo}
            alt="VSS Logo"
            className="w-32 mb-4 transition-transform duration-300 hover:scale-105 hover:drop-shadow-md"
          />
          <p className="text-sm mb-4">
            Valmiki Sikshya Sadhan (VSS) is committed to providing quality education and
            holistic development for students from Grade 1 to Grade 12. We nurture
            academic excellence, creativity, and leadership skills in a supportive environment.
          </p>
          <div className="flex gap-4 text-lg">
            <a
              href="https://www.facebook.com/vsshssplustwo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1877F2] transition duration-300 transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/valmikiss?igsh=MW5tOWQ1bm9mOW8x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E1306C] transition duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

       {/* VSS Links */}
<div className="md:w-1/5">
  <h4 className="font-semibold mb-4">VSS</h4>
  <ul className="space-y-2 text-sm">
    
    <li>
      <NavLink
        to="/contact"
        className="hover:underline transition duration-200"
      >
        Contact
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/inquiry"
        className="hover:underline transition duration-200"
      >
        Inquiry
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/blogs"
        className="hover:underline transition duration-200"
      >
        Blogs
      </NavLink>
    </li>
  </ul>
</div>


        {/* Support Links */}
        <div className="md:w-1/5">
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            {['Help Center', 'Admissions', 'Events', 'Feedback'].map((item, idx) => (
              <li key={idx} className="hover:underline transition duration-200 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div className="md:w-1/5">
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            {['Courses', 'Become a Teacher', 'Library', 'Gallery'].map((item, idx) => (
              <li key={idx} className="hover:underline transition duration-200 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-1/5">
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <div className="flex items-center gap-3 text-sm mb-2">
            <MdPhone />
            <span>+977 98450 47014</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MdEmail />
            <span>info@valmikisikshyasadhan.edu.np</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-4 border-t border-white/30 text-sm flex flex-col md:flex-row justify-between items-center gap-3">
        <p>© 2025 Valmiki Sikshya Sadhan. All rights reserved.</p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Legal', 'Site Map'].map((item, idx) => (
              <span key={idx} className="hover:underline transition duration-200 cursor-pointer">
                {item}
              </span>
            ))}
          </div>
          <span className="text-white/80 text-xs mt-2 md:mt-0">
            Powered by <strong>KreaTechHub</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
