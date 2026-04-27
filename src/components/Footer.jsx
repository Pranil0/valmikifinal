import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import logo from '../assets/valmikilogo.png';
import { NavLink } from 'react-router-dom';

// ─────────────────────────────────────────────
// Only real routes — grouped by purpose
// ─────────────────────────────────────────────
const schoolLinks = [
  { label: 'Introduction', to: '/introduction' },
  { label: 'Principal', to: '/principal' },
  { label: 'Achievements', to: '/achievement' },
  { label: 'Gallery', to: '/gallery' },
];

const programLinks = [
  { label: 'Grade 1 – 10', to: '/grade10' },
  { label: '+2 Programs', to: '/plus2' },
  { label: 'Inquiry & Admission', to: '/inquiry' },
];

const resourceLinks = [
  { label: 'News & Events', to: '/news-events' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Find Our Campus', to: '/inquiry', state: { scrollTo: 'map-section' } },
];

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-black text-xs uppercase tracking-widest text-[#FCA61B] mb-4">
      {title}
    </h4>
    <ul className="space-y-2.5">
      {links.map((link, i) => (
        <li key={i}>
          <NavLink
            to={link.to}
            state={link.state || undefined}
            className="text-sm text-white/75 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#0F75BD] text-white overflow-hidden">

      {/* Decorative circles — consistent with CTA section style */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-[#FCA61B]/10 pointer-events-none" />
      <div className="absolute top-10 right-40 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

      {/* Amber top accent line */}
      <div className="h-1 w-full bg-[#FCA61B]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — takes 2 cols on large */}
          <div className="lg:col-span-2 space-y-5">
            <img
              src={logo}
              alt="Valmiki Shiksha Sadan Logo"
              className="w-28 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Valmiki Shiksha Sadan is committed to providing quality education
              and holistic development for students from Play Group to Grade 12,
              nurturing academic excellence, creativity, and leadership.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.facebook.com/vsshssplustwo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.instagram.com/valmikiss?igsh=MW5tOWQ1bm9mOW8x"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E1306C] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="School" links={schoolLinks} />
          <FooterColumn title="Programs" links={programLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        {/* Contact strip */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MdLocationOn size={16} className="text-[#FCA61B] shrink-0" />
            <span>Bharatpur-4, Chitwan, Nepal</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/70">
  <MdPhone size={16} className="text-[#FCA61B] shrink-0 mt-0.5" />
  <div className="flex flex-col gap-0.5">
    <span>056-595550</span>
    <span>056-595150</span>
    <span>056-59550</span>
  </div>
</div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MdEmail size={16} className="text-[#FCA61B] shrink-0" />
            <span>vsshss2053@gmail.com</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Valmiki Shiksha Sadan. All rights reserved.</p>
          <p>
            Powered by{' '}
            <strong className="text-white/70">KreaTechHub</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
