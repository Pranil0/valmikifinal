import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Tag, Newspaper } from "lucide-react";
import HeroSection from "../components/HeroSection";
import blogHeroImg from "../assets/valmikibuilding.png";
import API from "../services/api";

// ── Animation variants ──────────────────────────────────────────
const titleVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── Skeleton card shown while loading ───────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-52 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-3 bg-gray-200 rounded w-1/4 mt-4" />
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────
const Blogs = () => {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        const mapped = res.data.map((blog) => ({
          id:       blog.id,
          title:    blog.title,
          desc:     blog.desc,
          category: blog.category,
          date:     blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })
            : null,
          // TODO: replace localhost origin with import.meta.env.VITE_API_URL
          image: blog.imageUrl
            ? `${import.meta.env.VITE_API_URL ?? "http://localhost:5000"}${blog.imageUrl}`
            : null,
        }));
        setBlogs(mapped);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
    <HeroSection
  image={blogHeroImg}
  title="Our Blogs"
  subtitle="Explore articles, insights, and stories from Valmiki Shiksha Sadan."
  badge="School Blog"
  breadcrumb={[{ label: "Home", link: "/" }, { label: "Blogs" }]}
  size="compact"
  titleStyle="white"
  overlayStyle="bottom-heavy"
/>

      {/* ── Blog Section ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
            From Our Desk
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F75BD]">
            Latest Blogs
          </h2>
        </motion.div>

        {/* ── Loading state ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-[#0F75BD]" />
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              No blogs have been published yet. Check back soon.
            </p>
          </div>
        )}

        {/* ── Blog grid ── */}
        {!loading && !error && blogs.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={cardVariants}>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="group relative flex flex-col bg-white rounded-2xl overflow-hidden
                             shadow-lg border border-transparent
                             hover:border-[#0F75BD]/10 hover:shadow-[0_20px_48px_rgba(15,117,189,0.15)]
                             transition-all duration-300 h-full"
                >
                  {/* Amber bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FCA61B]
                                  scale-x-0 group-hover:scale-x-100 origin-left
                                  transition-transform duration-300 z-10" />

                  {/* Image */}
                  <div className="w-full h-52 overflow-hidden bg-gray-100 shrink-0">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover
                                   transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 gap-3">

                    {/* Category badge */}
                    {blog.category && (
                      <span className="inline-flex items-center gap-1.5 self-start
                                       bg-[#EFF6FF] text-[#0F75BD] text-[11px] font-bold
                                       uppercase tracking-wider px-3 py-1 rounded-lg">
                        <Tag className="w-3 h-3" />
                        {blog.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900
                                   leading-snug group-hover:text-[#0F75BD]
                                   transition-colors duration-300 flex-1">
                      {blog.title}
                    </h3>

                    {/* Date */}
                    {blog.date && (
                      <div className="flex items-center gap-1.5 mt-auto pt-3
                                      border-t border-gray-100">
                        <CalendarDays className="w-3.5 h-3.5 text-[#FCA61B] shrink-0" />
                        <span className="text-xs text-gray-400 font-medium">
                          {blog.date}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

      </section>
    </>
  );
};

export default Blogs;