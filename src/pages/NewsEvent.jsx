import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { saveAs } from "file-saver";
import { FiDownload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF,} from "react-icons/fa";

// Import your images
import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";
import photo4 from "../assets/photo4.webp";
import photo5 from "../assets/photo5.webp";
import photo6 from "../assets/photo6.webp";
import photo7 from "../assets/photo7.webp";
import photo8 from "../assets/photo8.webp";


import NewsList from "../components/NewsList";
import valmikibuilding from "../assets/valmikibuilding.png";
import foodfestival from "../assets/foodfestival.webp";
import dancingstar from "../assets/dancingstar.webp";
import dipawalirangoli from "../assets/dipawalirangoli.webp";
import orientationclass11 from "../assets/orientationclass11.webp";
import itfest from "../assets/itfest.webp";
import sciencefair from "../assets/sciencefair.webp";
import sportsmeet from "../assets/sportsmeet.webp";


const categories = ["All", "Academic", "Co-Curricular", "Alumni", "Announcements"];

// Simple image pool for demo
const imagePool = [
  foodfestival,
  dancingstar,
  dipawalirangoli,
  orientationclass11,
  itfest,
 photo4,
  sportsmeet,
  sciencefair,
];


// News data
const newsItems = [
  {
    id: 1,
    title: "Valmiki Food Festival 2082",
    category: "Events",
    date: "2025-11-10",
    img: foodfestival,
    description:
      "Students showcased culinary talents with delicious dishes representing local and international cuisines.",
  },
  {
    id: 2,
    title: "Valmiki Dancing Star 2082",
    category: "Events",
    date: "2025-11-05",
    img: dancingstar,
    description:
      "An exciting dance competition highlighting creativity, rhythm, and team performances among students.",
  },
  {
    id: 3,
    title: "Happy Dipawali: Rangoli Celebration",
    category: "Festivals",
    date: "2025-10-25",
    img: dipawalirangoli,
    description:
      "Students created colorful rangolis to celebrate the festival of lights, fostering creativity and cultural spirit.",
  },
  {
    id: 4,
    title: "Orientation Program for Class 11",
    category: "Academic",
    date: "2025-09-15",
    img: orientationclass11,
    description:
      "Fresh +2 students were welcomed with an orientation program introducing the curriculum, teachers, and campus culture.",
  },
  {
    id: 5,
    title: "IT Fest 2082",
    category: "Events",
    date: "2025-08-20",
    img: itfest,
    description:
      "Students participated in coding, robotics, and digital projects, demonstrating innovative technology solutions.",
  },
  {
    id: 6,
    title: "Scholarship Opportunities for Meritorious Students",
    category: "Announcements",
    date: "2025-07-30",
    img: photo4,
    description:
      "Meritorious students were awarded scholarships for academic excellence and dedication to studies.",
  },
  {
    id: 7,
    title: "Valmiki Sports Meet 2082: Spirit of Teamwork",
    category: "Sports",
    date: "2025-06-18",
    img: sportsmeet,
    description:
      "A day of sports and competitions promoting teamwork, sportsmanship, and physical fitness among students.",
  },
  {
    id: 8,
    title: "Science & Innovation Fair 2025",
    category: "Academic",
    date: "2025-05-10",
    img: sciencefair,
    description:
      "Students displayed innovative projects in science and technology, showcasing creativity and critical thinking.",
  },
];

// Upcoming events
const events = [
  { date: "2025-12-05", title: "Inter-College Science Fair 2025", detail: "Project displays, live experiments and innovation stalls by Grade IX–XII." },
  { date: "2025-12-10", title: "Valmiki Cultural Evening", detail: "Performances, music, drama and dance by students of all grades." },
  { date: "2025-12-15", title: "Parent–Teacher Interaction Session", detail: "Focused discussions on student progress, behaviour and future plans." },
  { date: "2025-12-20", title: "Annual Sports Day 2082", detail: "Track and field events, house competitions and award distribution." },
];

const NewsEvent = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredNews = newsItems.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

const highlightImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

const [isOpen, setIsOpen] = useState(false);
const [photoIndex, setPhotoIndex] = useState(0);

// Framer Motion variants
const imageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};



  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
        <img
          src={valmikibuilding}
          alt="Valmiki Shiksha Sadan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Breadcrumb */}
          <div className="text-white text-xs md:text-sm flex items-center gap-2 mb-3">
            <Link to="/" className="hover:text-[#FCA61B] transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-300">News &amp; Events</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FCA61B] via-white to-[#FCA61B] bg-clip-text text-transparent drop-shadow-lg">
            News &amp; Events
          </h1>

          <p className="mt-4 text-sm md:text-lg text-gray-100 max-w-2xl md:max-w-3xl">
            Stay updated with important announcements, student achievements and
            the vibrant life of Valmiki Shiksha Sadan.
          </p>
        </div>
      </section>
{/* ====== Video Highlights Section ====== */}
<section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
  <div className="max-w-7xl mx-auto text-center">
    {/* Section Title */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
      Video Highlights
    </h2>
    <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
      Watch these videos to get a glimpse of our recent events and student activities at Valmiki Shiksha Sadan.
    </p>

    {/* Video Cards */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      
      {/* First Video */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
        <div className="relative w-full aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/qBmQF6W1qhY"
            title="Valmiki Shiksha Sadan Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 text-left">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            Campus & Event Highlights
          </h3>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            A glimpse of recent events, student activities, and achievements at Valmiki Shiksha Sadan.
          </p>
        </div>
      </div>

      {/* Second Video */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
        <div className="relative w-full aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/GQAOeJev_gY"
            title="Valmiki Shiksha Sadan Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 text-left">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            Academic & Co-Curricular Activities
          </h3>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Explore our academic programs, co-curricular initiatives, and vibrant student life.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ====== SEARCH + CATEGORY FILTER ====== */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F75BD]">
            Explore News &amp; Updates
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Filter news and announcements based on category or search for a
            specific update by title.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <input
              type="text"
              placeholder="Search by news title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 w-full sm:w-1/2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 w-full sm:w-1/4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ====== RECENT NEWS / ANNOUNCEMENTS ====== */}
      <NewsList showSearch={true} />

      {/* ====== EVENT CALENDAR ====== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
            Upcoming Events
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mark your calendar and be a part of our academic, cultural and
            co-curricular events throughout the school year.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-[#0F75BD] mb-2">
                {new Date(event.date).toLocaleDateString()}
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {event.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== EVENT GALLERY / HIGHLIGHTS ====== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-white">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
      Event Highlights
    </h2>
    <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
      A visual glimpse into recent events, celebrations and student-led activities at Valmiki Shiksha Sadan.
    </p>
  </div>

  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {highlightImages.map((img, idx) => (
      <motion.div
        key={idx}
        className="cursor-pointer overflow-hidden rounded-xl shadow-lg"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ duration: 0.3, delay: idx * 0.1 }}
        onClick={() => {
          setPhotoIndex(idx);
          setIsOpen(true);
        }}
      >
        <img src={img} alt={`Event highlight ${idx + 1}`} className="w-full h-56 md:h-60 object-cover" />
      </motion.div>
    ))}
  </div>

  {isOpen && (
    <Lightbox
      open={isOpen}
      close={() => setIsOpen(false)}
      index={photoIndex}
      onIndexChange={setPhotoIndex}
      slides={highlightImages.map((img) => ({
        src: img,
        render: ({ slide }) => (
          <AnimatePresence>
            <motion.img
              key={slide.src}
              src={slide.src}
              alt=""
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
        ),
      }))}
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

      {/* ====== NEWSLETTER / CTA ====== */}
      <section className="relative bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto bg-[#0F75BD] text-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Subscribe for Updates
          </h2>
          <p className="mt-4 text-sm md:text-base text-center max-w-2xl mx-auto">
            Receive the latest news, event reminders and important notices from
            Valmiki Shiksha Sadan directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-3 rounded-lg text-white flex-grow text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white/70"
            />
            <button className="px-6 py-3 bg-[#FCA61B] text-[#0F75BD] font-semibold rounded-lg text-sm md:text-base hover:bg-yellow-500 transition shadow-md hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsEvent;
