import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import valmikilogo from "../assets/valmikilogo.png";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Menu, X } from "lucide-react";

const navItems = [
  { to: "/achievement", label: "Achievements" },
  { to: "/inquiry", label: "Inquiry For Grade XI" },
  { to: "/news-events", label: "News & Events" },
  { to: "/blogs", label: "Blogs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const location = useLocation();

  const aboutRef = useRef(null);
  const mobileAboutRef = useRef(null);

  const isAboutActive =
    location.pathname === "/introduction" || location.pathname === "/principal";

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileAboutOpen(false);
  };

  // Close dropdowns on route change
  useEffect(() => {
    setAboutOpen(false);
    setMobileAboutOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) setAboutOpen(false);
      if (mobileAboutRef.current && !mobileAboutRef.current.contains(event.target)) setMobileAboutOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll logic using requestAnimationFrame
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 5 && currentScrollY > 50) {
        // scrolling down
        setShowTopBar(false);
      } else if (delta < -5) {
        // scrolling up
        setShowTopBar(true);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine top offset for main navbar
  const getNavbarTop = () => (showTopBar ? (window.innerWidth >= 1024 ? 50 : 40) : 0);

  return (
    <header className="w-full font-sans z-50">
      {/* Top Bar */}
      <div
        className={`w-full bg-blue-700 text-white text-xs md:text-sm py-2 px-4 md:px-6 flex items-center justify-between transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center space-x-3">
          <a href="https://www.facebook.com/vsshssplustwo" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Facebook size={16} />
          </a>
          <a href="https://www.instagram.com/valmikiss?igsh=MW5tOWQ1bm9mOW8x" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Instagram size={16} />
          </a>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-[11px]">
          <div className="flex items-center space-x-1"><Phone size={16} /><span>+977 056-595550 / +977 056-594144</span></div>
          <div className="flex items-center space-x-1"><Mail size={16} /><span>vsshss2053@gmail.com</span></div>
          <div className="flex items-center space-x-1"><MapPin size={16} /><span>Bharatpur -4, Chitwan</span></div>
          <div className="flex items-center space-x-1"><Clock size={16} /><span>Sunday–Friday 9:00am–10pm</span></div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className="bg-white py-3 lg:py-5 px-4 md:px-6 flex items-center justify-between fixed w-full shadow-md z-50 transition-all duration-300"
        style={{ top: getNavbarTop() }}
      >
        <NavLink to="/" className="flex items-center md:ml-20">
          <div className="bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ width: "80px", height: "80px" }}>
            <img src={valmikilogo} alt="Logo" className="w-full h-full p-2" />
          </div>
          <div className="ml-3 md:ml-4">
            <h1 className="text-base md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              VALMIKI SHIKSHA SADAN
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.18em] uppercase mt-1">
              Secondary School • Bharatpur
            </p>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-gray-700 mr-4 lg:mr-10 relative">
          <NavLink
            to="/"
            className={({ isActive }) => `relative pb-1 text-sm lg:text-base font-medium tracking-wide transition-colors duration-200 whitespace-nowrap hover:text-blue-700 ${isActive ? "text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-blue-500 after:scale-100" : "text-gray-700"}`}
          >
            Home
          </NavLink>

          {/* About Dropdown */}
          <div ref={aboutRef} className="relative">
            <button
              onClick={() => setAboutOpen((prev) => !prev)}
              className={`relative pb-1 text-sm lg:text-base font-medium tracking-wide transition-colors duration-200 whitespace-nowrap hover:text-blue-700 flex items-center gap-1 ${isAboutActive ? "text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-blue-500 after:scale-100" : "text-gray-700"}`}
            >
              About Us <span className={`text-xs transition-transform ${aboutOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </button>
            {aboutOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                <NavLink to="/introduction" className={({ isActive }) => `block px-4 py-2 text-sm font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-800"} hover:bg-blue-50 hover:text-blue-700`}>
                  Introduction
                </NavLink>
                <NavLink to="/principal" className={({ isActive }) => `block px-4 py-2 text-sm font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-800"} hover:bg-blue-50 hover:text-blue-700`}>
                  Message from Principal
                </NavLink>
              </div>
            )}
          </div>

          {/* Other Links */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `relative pb-1 text-sm lg:text-base font-medium tracking-wide transition-colors duration-200 whitespace-nowrap hover:text-blue-700 ${isActive ? "text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-blue-500 after:scale-100" : "text-gray-700"}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Spacer div */}
      <div className="h-[96px] lg:h-[112px]"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 pt-3 space-y-1">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) => `block px-2 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-800"}`}
          >
            Home
          </NavLink>

          <div ref={mobileAboutRef} className="mt-1">
            <button
              onClick={() => setMobileAboutOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between px-2 py-2 rounded-md text-sm font-medium ${isAboutActive ? "text-blue-700 bg-blue-50" : "text-gray-800"}`}
            >
              <span>About Us</span>
              <span className={`text-xs transition-transform ${mobileAboutOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </button>
            {mobileAboutOpen && (
              <div className="mt-1 ml-3 space-y-1">
                <NavLink
                  to="/introduction"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `block px-2 py-1.5 rounded-md text-xs font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"}`}
                >
                  Introduction
                </NavLink>
                <NavLink
                  to="/principal"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `block px-2 py-1.5 rounded-md text-xs font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"}`}
                >
                  Message from Principal
                </NavLink>
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) => `block px-2 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-800"}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
