import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import blogHeroImg from "../assets/valmikibuilding.png";

// Blog images
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";
import blog4 from "../assets/blog4.jpeg";
import blog5 from "../assets/blog5.webp";
import blog6 from "../assets/blog6.jpeg";

const Blogs = () => {
  // ================= BLOG DATA =================
  const blogs = [
    {
      id: 1,
      title: "Why Choosing the Right College Matters for Your Future",
      desc: "Your college shapes your academic journey, your skills, and the opportunities you receive.",
      category: "Education",
      date: "10 Dec 2023",
      image: blog1,
    },
    {
      id: 2,
      title: "Top Study Techniques Every Student Should Know",
      desc: "Effective study strategies like Pomodoro, active recall, and spaced repetition explained.",
      category: "Study Tips",
      date: "8 Dec 2023",
      image: blog2,
    },
    {
      id: 3,
      title: "How Technology Is Transforming Modern Education",
      desc: "Digital tools, AI, and e-learning platforms are reshaping the classroom experience.",
      category: "Technology",
      date: "5 Dec 2023",
      image: blog3,
    },
    {
      id: 4,
      title: "Soft Skills Every Student Should Master",
      desc: "Communication, teamwork, leadership, and emotional intelligence in education.",
      category: "Career",
      date: "2 Dec 2023",
      image: blog4,
    },
    {
      id: 5,
      title: "How to Improve Academic Performance in 30 Days",
      desc: "Simple yet powerful habits that significantly boost your grades and learning.",
      category: "Study Tips",
      date: "28 Nov 2023",
      image: blog5,
    },
    {
      id: 6,
      title: "Why Continuous Learning Is Important in Today’s World",
      desc: "Learning doesn’t end after college — here's why staying updated is essential.",
      category: "Education",
      date: "22 Nov 2023",
      image: blog6,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        image={blogHeroImg}
        title="Our Blogs"
        subtitle="Explore articles, insights, and stories from Valmiki College."
        breadcrumb={[
    { label: "Home", link: "/" },
    { label: "Blogs" }
  ]}
      />

      {/* BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <h2 className="text-3xl font-bold text-[#0F75BD] mb-10">Latest Blogs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
className="bg-blue-50 rounded-xl overflow-hidden group"

            >
              {/* Image */}
              <div className="w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Blog Info */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-gray-900 leading-snug mb-10">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-700 mt-auto">{blog.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blogs;
