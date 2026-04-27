import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, User, ArrowLeft, Tag, Newspaper } from "lucide-react";
import HeroSection from "../components/HeroSection";
import blogHeroImg from "../assets/valmikibuilding.png";
import API from "../services/api";

// ── Animation variants ──────────────────────────────────────────
const titleVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── Shared data mapper (DRY — was duplicated twice in original) ──
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const mapBlog = (blog) => ({
  ...blog,
  image: blog.imageUrl ? `${BASE_URL}${blog.imageUrl}` : null,
  date: blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null,
});

// ── Skeleton for detail page ────────────────────────────────────
const DetailSkeleton = () => (
  <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20 animate-pulse">
    <div className="w-full h-72 md:h-96 bg-gray-200 rounded-2xl mb-8" />
    <div className="flex gap-4 mb-6">
      <div className="h-3 bg-gray-200 rounded w-24" />
      <div className="h-3 bg-gray-200 rounded w-32" />
    </div>
    <div className="h-7 bg-gray-200 rounded w-3/4 mb-4" />
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-3 bg-gray-200 rounded w-full" />
      ))}
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </section>
);

// ── Skeleton card for related blogs ────────────────────────────
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
const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog]               = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const [blogRes, allBlogsRes] = await Promise.all([
          API.get(`/blogs/${id}`),
          API.get("/blogs"),
        ]);

        setBlog(mapBlog(blogRes.data));

        const related = allBlogsRes.data
          .filter((b) => b.id !== blogRes.data.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(mapBlog);

        setRelatedBlogs(related);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load this blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <HeroSection
          image={blogHeroImg}
          title="Our Blogs"
          subtitle="Explore articles, insights, and stories from Valmiki College."
          breadcrumb={[{ label: "Home", link: "/" }, { label: "Blogs", link: "/blogs" }, { label: "Article" }]}
          size="small"
        />
        <DetailSkeleton />
      </div>
    );
  }

  // ── Error / Not found ──
  if (error || !blog) {
    return (
      <div className="bg-white min-h-screen">
        <HeroSection
          image={blogHeroImg}
          title="Our Blogs"
          subtitle="Explore articles, insights, and stories from Valmiki College."
          breadcrumb={[{ label: "Home", link: "/" }, { label: "Blogs", link: "/blogs" }, { label: "Article" }]}
          size="small"
        />
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
            <Newspaper className="w-8 h-8 text-[#0F75BD]" />
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            {error ?? "This blog post could not be found."}
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 mt-2 bg-[#0F75BD] hover:bg-[#0d66a8]
                       text-white font-semibold px-5 py-2.5 rounded-xl text-sm
                       shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <HeroSection
        image={blogHeroImg}
        title="Our Blogs"
        subtitle="Explore articles, insights, and stories from Valmiki College."
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Blogs", link: "/blogs" },
          { label: blog.title },
        ]}
        size="small"
      />

      {/* ── Article body ── */}
      <motion.section
        className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        {/* Hero image */}
        {blog.image && (
          <div className="w-full h-72 md:h-[480px] overflow-hidden rounded-2xl shadow-xl mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta row — author + date + category */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {blog.author && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <User className="w-3.5 h-3.5 text-[#FCA61B]" />
              {blog.author}
            </span>
          )}
          {blog.date && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-[#FCA61B]" />
              {blog.date}
            </span>
          )}
          {blog.category && (
            <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#0F75BD]
                             text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
              <Tag className="w-3 h-3" />
              {blog.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]
                        leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#FCA61B] rounded-full mb-8" />

        {/* Content — prose typography */}
        <div
          className="text-gray-700 leading-relaxed space-y-5
                     [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#0F75BD] [&>h2]:mt-8 [&>h2]:mb-3
                     [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-2
                     [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1
                     [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1
                     [&>blockquote]:border-l-4 [&>blockquote]:border-[#FCA61B]
                     [&>blockquote]:pl-4 [&>blockquote]:text-gray-500 [&>blockquote]:italic
                     [&>img]:rounded-2xl [&>img]:shadow-lg [&>img]:my-6
                     [&>a]:text-[#0F75BD] [&>a]:underline [&>a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back button */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-[#0F75BD] hover:bg-[#0d66a8]
                       text-white font-semibold px-6 py-3 rounded-xl text-sm
                       shadow-md hover:shadow-[#0F75BD]/25 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </motion.section>

      {/* ── Related blogs ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-[#FCA61B] font-black uppercase tracking-widest text-xs md:text-sm mb-2">
            Keep Reading
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F75BD]">
            More Blogs You May Like
          </h2>
        </motion.div>

        {/* Related cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {relatedBlogs.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <Link
                to={`/blogs/${item.id}`}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden
                           shadow-lg border border-transparent
                           hover:border-[#0F75BD]/10
                           hover:shadow-[0_20px_48px_rgba(15,117,189,0.15)]
                           transition-all duration-300 h-full"
              >
                {/* Amber accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FCA61B]
                                scale-x-0 group-hover:scale-x-100 origin-left
                                transition-transform duration-300 z-10" />

                {/* Image */}
                <div className="w-full h-52 overflow-hidden bg-gray-100 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
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
                  {item.category && (
                    <span className="inline-flex items-center gap-1.5 self-start
                                     bg-[#EFF6FF] text-[#0F75BD] text-[11px] font-bold
                                     uppercase tracking-wider px-3 py-1 rounded-lg">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                  )}

                  <h4 className="text-base md:text-lg font-bold text-gray-900
                                 leading-snug group-hover:text-[#0F75BD]
                                 transition-colors duration-300 flex-1">
                    {item.title}
                  </h4>

                  {item.date && (
                    <div className="flex items-center gap-1.5 mt-auto pt-3
                                    border-t border-gray-100">
                      <CalendarDays className="w-3.5 h-3.5 text-[#FCA61B] shrink-0" />
                      <span className="text-xs text-gray-400 font-medium">
                        {item.date}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
};

export default BlogDetails;