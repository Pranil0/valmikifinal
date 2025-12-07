import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // auto scroll on route change
import ScrollButton from "./components/ScrollButton"; // clickable scroll button
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Achievement from "./pages/Achievement";
import NewsEvent from "./pages/NewsEvent";
import Inquiry from "./pages/Inquiry";
import Blogs from "./components/Blogs";
import BlogDetails from "./pages/BlogDetails";
import GalleryCategories from "./pages/GalleryCategories";
import AlbumPage from "./pages/AlbumPage";
import Principal from "./pages/Principal";
import Introduction from "./pages/Introduction";
import Grade10 from "./pages/Grade10";
import Plus2 from "./pages/Plus2";


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Main Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/achievement" element={<Achievement />} />
            <Route path="/news-events" element={<NewsEvent />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/gallery" element={<GalleryCategories />} />
            <Route path="/gallery/:categoryId" element={<AlbumPage />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/introduction" element={<Introduction />} />
 <Route path="/grade10" element={<Grade10/>} />
        <Route path="/plus2" element={<Plus2/>} />
                 <Route path="/news/:id" element={<NewsDetails />} />
          </Routes>
        </main>

        {/* Scroll to top button */}
        <ScrollButton />

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}
