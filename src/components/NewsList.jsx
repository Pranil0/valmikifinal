import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { newsItems } from "../data/newsData";

const NewsList = ({ showSearch = true, limit, grid = "4" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Auto-generate categories from newsData
  const categories = ["All", ...new Set(newsItems.map((item) => item.category))];

  // Filter logic
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      categoryFilter === "" ||
      item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const displayedNews = limit ? filteredNews.slice(0, limit) : filteredNews;

  // ------------------- Dynamic grid -------------------
  let gridCols = "grid-cols-1";

  if (grid === "2") {
    // homepage → 2 columns on all screens above 640px
    gridCols = "grid-cols-1 sm:grid-cols-2";
  } else {
    // default → 4 columns only on large screens
    gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }
  // ------------------------------------------------------

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F75BD]">
          Recent News & Announcements
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Read about our latest academic milestones, activities and important updates.
        </p>
      </div>

      {/* Search + Category Filter */}
      {showSearch && (
        <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-4 items-center">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 w-full sm:w-1/2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 w-full sm:w-1/4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/60"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {/* News Grid */}
      <div className={`mt-10 grid ${gridCols} gap-8 max-w-6xl mx-auto`}>
        {displayedNews.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition duration-300 bg-white flex flex-col"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-44 md:h-48 object-cover transform group-hover:scale-105 transition duration-500"
            />

            <div className="p-4 flex flex-col flex-grow">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#0F75BD] mb-1">
                {item.category}
              </span>

              <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-900 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-3">
                {item.description}
              </p>

              <span className="text-[11px] text-gray-400 mb-3">
                Date: {new Date(item.date).toLocaleDateString()}
              </span>

              <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="https://www.facebook.com/vsshssplustwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  <FaFacebookF />
                </a>

                <Link
                  to={`/news/${item.id}`}
                  className="bg-[#0F75BD] text-white text-xs md:text-sm px-4 py-2 rounded-md hover:bg-[#0d63a5] transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Articles */}
      {limit && filteredNews.length > limit && (
        <div className="mt-10 text-center">
          <Link
            to="/news-events"
            className="inline-block bg-[#0F75BD] text-white px-6 py-3 rounded-lg hover:bg-[#0d63a5] transition font-semibold"
          >
            More Articles →
          </Link>
        </div>
      )}
    </section>
  );
};

export default NewsList;
