import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollButton from "./components/ScrollButton";

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

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminNewsEvents from "./pages/admin/AdminNewsEvents";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminGallery from "./pages/admin/AdminGallery";
import ForgotPasswordForm from "./components/admin/ForgotPasswordForm";
import AdminContactMessages from "./pages/admin/AdminContactMessages";
import AdminInquiryMessages from "./pages/admin/AdminInquiryMessages"; 

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

/* ── Public layout wrapper ── */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <ScrollButton />
      <Footer />
    </div>
  );
};

/* ── Protected + AdminLayout wrapper ── */
const AdminRoute = () => {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ── Public Routes ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                    element={<Home />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/achievement"         element={<Achievement />} />
          <Route path="/news-events"         element={<NewsEvent />} />
          <Route path="/inquiry"             element={<Inquiry />} />
          <Route path="/blogs"               element={<Blogs />} />
          <Route path="/blogs/:id"           element={<BlogDetails />} />
          <Route path="/gallery"             element={<GalleryCategories />} />
          <Route path="/gallery/:albumSlug"  element={<AlbumPage />} />
          <Route path="/principal"           element={<Principal />} />
          <Route path="/introduction"        element={<Introduction />} />
          <Route path="/grade10"             element={<Grade10 />} />
          <Route path="/plus2"               element={<Plus2 />} />
          <Route path="/news/:id"            element={<NewsDetails />} />
        </Route>

        {/* ── Admin auth (no layout) ── */}
        <Route path="/admin/login"           element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordForm />} />

        {/* ── Protected Admin Routes (all share AdminLayout) ── */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs"     element={<AdminBlogs />} />
          <Route path="/admin/news"      element={<AdminNewsEvents />} />
          <Route path="/admin/events"    element={<AdminEvents />} />
          <Route path="/admin/gallery"   element={<AdminGallery />} />
          <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
            <Route path="/admin/inquiry-messages" element={<AdminInquiryMessages />} />
        </Route>

      </Routes>
    </Router>
  );
}