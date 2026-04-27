import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { saveAs } from "file-saver";
import { FiDownload, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import schoolBg from "../assets/valmikibuilding.png";
import API from "../services/api";

import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";
import photo4 from "../assets/photo4.webp";
import photo5 from "../assets/photo5.webp";
import photo6 from "../assets/photo6.webp";
import photo7 from "../assets/photo7.webp";
import photo8 from "../assets/photo8.webp";

import NewsList from "../components/NewsList";
import CTA from "../components/CTA";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

const highlightImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

const getCategoryColor = (category) => {
  const map = {
    Academic: "bg-[#0F75BD]",
    Cultural: "bg-[#FCA61B]",
    "Co-curricular": "bg-[#15803D]",
    Sports: "bg-[#15803D]",
    Workshop: "bg-[#FCA61B]",
    Seminar: "bg-[#0F75BD]",
  };
  return map[category] || "bg-[#0F75BD]";
};

const formatDateRange = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const sameDay =
    s.getFullYear() === e.getFullYear() &&
    s.getMonth() === e.getMonth() &&
    s.getDate() === e.getDate();
  if (sameDay)
    return s.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const sameMonthYear =
    s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth();
  if (sameMonthYear)
    return `${s.toLocaleDateString("en-US", { month: "long" })} ${s.getDate()} – ${e.getDate()}, ${s.getFullYear()}`;
  const startStr = s.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const endStr = e.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${startStr} – ${endStr}`;
};

const formatTimeRange = (start, end) => {
  const opts = { hour: "numeric", minute: "2-digit", hour12: true };
  const s = new Date(start).toLocaleTimeString("en-US", opts);
  const e = new Date(end).toLocaleTimeString("en-US", opts);
  return `${s} – ${e}`;
};

const NewsEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [events, setEvents] = useState([]);

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      const upcomingEvents = res.data.filter(
        (event) => new Date(event.endDateTime) >= new Date()
      );
      setEvents(upcomingEvents);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <HeroSection
        image={schoolBg}
        title="News & Events"
        subtitle="Stay updated with the latest happenings at Valmiki Shiksha Sadan."
        badge="Latest Updates"
        breadcrumb={[{ label: "Home", link: "/" }, { label: "News & Events" }]}
        size="compact"
        titleStyle="white"
        overlayStyle="bottom-heavy"
      />

      {/* ── VIDEO HIGHLIGHTS ── */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">Watch</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Video Highlights
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Watch these videos to get a glimpse of our recent events and student activities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                id: "qBmQF6W1qhY",
                title: "Campus & Event Highlights",
                desc: "A glimpse of recent events, student activities, and achievements.",
              },
              {
                id: "GQAOeJev_gY",
                title: "Academic & Co-Curricular Activities",
                desc: "Explore our academic programs, co-curricular initiatives, and vibrant student life.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 border-t border-gray-100 text-left">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{v.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT NEWS ── */}
      <NewsList showSearch={true} />

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10 md:mb-16 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-xs mb-4"
              style={{ color: "#FCA61B" }}
            >
              <Sparkles size={14} />
              <span>Stay Updated</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              /* Scaled down on mobile so it doesn't overflow */
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.9]"
              style={{ color: "#0F75BD" }}
            >
              Upcoming Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 md:mt-6 text-sm md:text-lg text-slate-500 leading-relaxed"
            >
              Mark your calendar and be a part of our academic, cultural and co-curricular events throughout the school year.
            </motion.p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No upcoming events at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {events.map((event, index) => {
                const dateObj = new Date(event.startDateTime);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString("en-US", { month: "long" });
                const accent = getCategoryColor(event.category);
                const timeLabel = formatTimeRange(event.startDateTime, event.endDateTime);
                const dateLabel = formatDateRange(event.startDateTime, event.endDateTime);
                const isMultiDay =
                  new Date(event.startDateTime).toDateString() !==
                  new Date(event.endDateTime).toDateString();

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem]
                               p-5 sm:p-7 md:p-10
                               flex flex-col md:flex-row
                               items-start md:items-center
                               gap-4 md:gap-12
                               hover:bg-[#0F75BD] transition-all duration-500
                               overflow-hidden border border-blue-100"
                  >
                    {/* Left amber accent bar */}
                    <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-[2rem] md:rounded-l-[2.5rem] bg-[#FCA61B] group-hover:bg-white/30 transition-colors duration-500" />

                    {/* ── MOBILE top row: date left + button right ── */}
                    <div className="flex md:hidden w-full items-center justify-between pl-3">
                      {/* Date — horizontal compact on mobile */}
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-4xl font-black tracking-tighter leading-none text-[#0F75BD] group-hover:text-white transition-colors duration-500">
                          {isMultiDay
                            ? `${day}–${new Date(event.endDateTime).getDate()}`
                            : day}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-widest text-[#FCA61B] group-hover:text-white/70 transition-colors duration-500">
                          {month}
                        </span>
                      </div>
                      {/* Action button — top-right on mobile */}
                      <button className="w-11 h-11 rounded-full flex items-center justify-center shadow-md shrink-0 transition-all duration-300 bg-[#FCA61B] text-white group-hover:bg-white group-hover:text-[#0F75BD]">
                        <Calendar size={17} />
                      </button>
                    </div>

                    {/* ── DESKTOP: original large date block ── */}
                    <div className="hidden md:flex flex-col items-center justify-center min-w-[120px] text-center pl-4">
                      {isMultiDay ? (
                        <span className="text-5xl font-black tracking-tighter transition-colors leading-none text-[#0F75BD] group-hover:text-white">
                          {day} – {new Date(event.endDateTime).getDate()}
                        </span>
                      ) : (
                        <span className="text-6xl font-black tracking-tighter transition-colors leading-none text-[#0F75BD] group-hover:text-white">
                          {day}
                        </span>
                      )}
                      <span className="text-sm font-bold uppercase tracking-widest mt-2 transition-colors text-[#FCA61B] group-hover:text-white/70">
                        {month}
                      </span>
                    </div>

                    {/* Vertical Divider — desktop only */}
                    <div className="hidden md:block w-px h-20 bg-blue-100 group-hover:bg-white/20 transition-colors" />

                    {/* Content — shared, with mobile padding adjustment */}
                    <div className="flex-1 space-y-2.5 md:space-y-4 pl-3 md:pl-0 w-full">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${accent}`}>
                          {event.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-white/70 transition-colors">
                          <Clock size={12} style={{ color: "#FCA61B" }} className="group-hover:text-white transition-colors shrink-0" />
                          <span>{timeLabel}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-3xl font-bold transition-colors leading-tight text-slate-900 group-hover:text-white">
                        {event.title}
                      </h3>

                      <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-500 group-hover:text-white/70 transition-colors line-clamp-2 md:line-clamp-none">
                        {event.description}
                      </p>

                      {event.location && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 group-hover:text-white/70 transition-colors">
                          <MapPin size={12} style={{ color: "#FCA61B" }} className="shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button — desktop only */}
                    <div className="hidden md:flex shrink-0">
                      <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-[#FCA61B] text-white group-hover:bg-white group-hover:text-[#0F75BD]">
                        <Calendar size={20} />
                      </button>
                    </div>

                    {/* Background glow */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[#FCA61B]" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── EVENT HIGHLIGHTS ── */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#FCA61B] text-xs font-black uppercase tracking-widest mb-2">Gallery</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
              Event Highlights
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-[#FCA61B] rounded-full mx-auto mt-4"
            />
            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              A visual glimpse into recent events, celebrations and student-led activities.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {highlightImages.map((img, idx) => (
              <motion.div
                key={idx}
                className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                onClick={() => {
                  setPhotoIndex(idx);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Event highlight ${idx + 1}`}
                  className="w-full h-36 sm:h-48 md:h-56 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={photoIndex}
            onIndexChange={setPhotoIndex}
            slides={highlightImages.map((img) => ({ src: img }))}
            toolbar={{
              buttons: [
                <button
                  key="download"
                  onClick={() => saveAs(highlightImages[photoIndex], `highlight-${photoIndex + 1}.jpg`)}
                  className="p-2 ml-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-white transition"
                  title="Download"
                >
                  <FiDownload size={22} />
                </button>,
                <button
                  key="close"
                  onClick={() => setIsOpen(false)}
                  className="p-2 ml-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-white transition"
                  title="Close"
                >
                  <FiX size={22} />
                </button>,
              ],
            }}
          />
        )}
      </section>

      {/* ── CTA ── */}
      <CTA />
    </>
  );
};

export default NewsEvent;
