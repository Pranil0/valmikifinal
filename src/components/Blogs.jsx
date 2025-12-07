import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import blogHeroImg from "../assets/valmikibuilding.png";
// Blog image
import valmiki from "../assets/valmikicollegebuilding.jpg";

const Blogs = () => {
  // ================= BLOG DATA =================
  const blogs = [
    {
      id: 1,
      title: "Why Choosing the Right College Matters for Your Future",
      desc: "Your college shapes your academic journey, your skills, and the opportunities you receive.",
      category: "Education",
      author: "Saraswati Karki",
      date: "10 Dec 2023",
      image: valmiki,
    },
    {
      id: 2,
      title: "Top Study Techniques Every Student Should Know",
      desc: "Effective study strategies like Pomodoro, active recall, and spaced repetition explained.",
      category: "Study Tips",
      author: "Anisha Shrestha",
      date: "8 Dec 2023",
      image: valmiki,
    },
    {
      id: 3,
      title: "How Technology Is Transforming Modern Education",
      desc: "Digital tools, AI, and e-learning platforms are reshaping the classroom experience.",
      category: "Technology",
      author: "Krish Rana",
      date: "5 Dec 2023",
      image: valmiki,
    },
    {
      id: 4,
      title: "Soft Skills Every Student Should Master",
      desc: "Communication, teamwork, leadership, and emotional intelligence in education.",
      category: "Career",
      author: "Manisha Paudel",
      date: "2 Dec 2023",
      image: valmiki,
    },
    {
      id: 5,
      title: "How to Improve Academic Performance in 30 Days",
      desc: "Simple yet powerful habits that significantly boost your grades and learning.",
      category: "Study Tips",
      author: "Rohan Adhikari",
      date: "28 Nov 2023",
      image: valmiki,
    },
    {
      id: 6,
      title: "Why Continuous Learning Is Important in Today’s World",
      desc: "Learning doesn’t end after college — here's why staying updated is essential.",
      category: "Education",
      author: "Deepak Subedi",
      date: "22 Nov 2023",
      image: valmiki,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        image={blogHeroImg}
        title="Our Blogs"
        subtitle="Explore articles, insights, and stories from Valmiki College."
      />

      {/* BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <h2 className="text-3xl font-bold text-[#0F75BD] mb-10">
          Latest Blogs
        </h2>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Blog Info */}
              <div className="p-5">
                <span className="inline-block bg-[#E8EBF9] text-[#3856B2] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {blog.category}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#3856B2] transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 mb-4">
                  {blog.desc}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <span>👤 {blog.author}</span>
                  <span>{blog.date}</span>
                </div>

                <Link
                  to={`/blogs/${blog.id}`}
                  className="block text-center w-full mt-4 bg-[#3856B2] text-white text-sm py-2 rounded-md hover:bg-[#2f4aa3] transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blogs;
