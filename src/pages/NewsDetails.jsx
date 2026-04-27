import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import API from "../services/api";
import { FaFacebookF } from "react-icons/fa";

import valmikiHero from "../assets/valmikibuilding.png";

const NewsDetails = () => {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  // ================= FETCH SINGLE NEWS =================
  const fetchNews = async () => {
    try {
      const res = await API.get(`/news/${id}`);
      setNews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH RELATED NEWS =================
  const fetchAllNews = async () => {
    try {
      const res = await API.get("/news");
      const filtered = res.data.filter((item) => item.id !== parseInt(id));
      setRelatedNews(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchAllNews();
  }, [id]);

  if (!news) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <HeroSection
        image={valmikiHero}
        title="News Details"
        subtitle="Explore full details about this news update from Valmiki College."
        size="small"
      />

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16">

        {/* FEATURED IMAGE */}
        {news.image && (
          <img
            src={`http://localhost:5000/uploads/${news.image}`}
            alt={news.title}
            className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl shadow-lg mb-8"
          />
        )}

        {/* META */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 border-b pb-3">
          <span>📅 {new Date(news.createdAt).toLocaleDateString()}</span>
          <span>📰 Admin</span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F75BD] mb-4 leading-tight">
          {news.title}
        </h1>

        {/* SHORT DESCRIPTION (HOOK) */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {news.description}
        </p>

        {/* FULL CONTENT */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {news.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          ) : (
            <p>{news.description}</p>
          )}
        </div>

        {/* BACK BUTTON */}
        <div className="mt-10">
          <Link
            to="/news-events"
            className="inline-block bg-[#0F75BD] text-white px-6 py-2 rounded-md hover:bg-[#0d63a5] transition"
          >
            ← Back to News
          </Link>
        </div>
      </section>

      {/* ================= RELATED NEWS ================= */}
      {relatedNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            {/* HEADER */}
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F75BD]">
                Related News
              </h3>
              <p className="mt-2 text-gray-600">
                Stay updated with more stories and updates.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedNews.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col group"
                >
                  {/* IMAGE */}
                  {item.image && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col flex-grow">

                    <span className="text-xs text-gray-400 mb-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-3 border-t flex justify-between items-center">

                      <a
                        href="https://www.facebook.com/vsshssplustwo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaFacebookF />
                      </a>

                      <Link
                        to={`/news/${item.id}`}
                        className="text-xs bg-[#0F75BD] text-white px-4 py-2 rounded-md hover:bg-[#0d63a5] transition"
                      >
                        Read More →
                      </Link>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetails;