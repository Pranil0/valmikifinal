import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Search,
  LayoutGrid,
  X,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "react-quill-new/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import API from "../../services/api";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


const formatDateRange = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);

  const sameDay =
    s.getFullYear() === e.getFullYear() &&
    s.getMonth() === e.getMonth() &&
    s.getDate() === e.getDate();

  if (sameDay) {
    return s.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const sameMonthYear =
    s.getFullYear() === e.getFullYear() &&
    s.getMonth() === e.getMonth();

  if (sameMonthYear) {
    const month = s.toLocaleDateString("en-US", { month: "short" });
    return `${month} ${s.getDate()} – ${e.getDate()}, ${s.getFullYear()}`;
  }

  return `${s.toLocaleDateString()} – ${e.toLocaleDateString()}`;
};

const formatTimeRange = (start, end) => {
  const opts = { hour: "2-digit", minute: "2-digit" };

  const s = new Date(start).toLocaleTimeString([], opts);
  const e = new Date(end).toLocaleTimeString([], opts);

  return `${s} – ${e}`;
};

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    category: "",
  });

  const getLocalDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(form.endDateTime) < new Date(form.startDateTime)) {
      toast.error("End date/time cannot be before start date/time");
      return;
    }

    try {
      if (editingId) {
        await API.put(`/events/${editingId}`, form);
        toast.success("Event updated!");
      } else {
        await API.post("/events", form);
        toast.success("Event created!");
      }

      setForm({
        title: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        location: "",
        category: "",
      });

      setEditingId(null);
      setIsFormOpen(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      startDateTime: new Date(item.startDateTime).toISOString().slice(0, 16),
      endDateTime: new Date(item.endDateTime).toISOString().slice(0, 16),
      location: item.location,
      category: item.category,
    });
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      toast.success("Deleted!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ================= FILTER =================
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <span className="bg-[#0F75BD] text-white p-2 rounded-xl shadow-lg shadow-blue-200">
                <LayoutGrid size={28} />
              </span>
              Events Management
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Create, edit, and organize your upcoming events.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F75BD] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setForm({
                  title: "",
                  description: "",
                  startDateTime: "",
                  endDateTime: "",
                  location: "",
                  category: "",
                });
                setEditingId(null);
                setIsFormOpen(true);
              }}
              className="bg-[#0F75BD] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#0d63a5] transition-all"
            >
              <Plus size={20} />
              New Event
            </motion.button>
          </div>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Events", value: events.length },
            { label: "Categories", value: new Set(events.map((e) => e.category)).size },
            { label: "Upcoming", value: events.filter(e => new Date(e.startDateTime) > new Date()).length },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* --- FORM MODAL --- */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFormOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-black text-slate-900">
                    {editingId ? "Edit Event" : "Create New Event"}
                  </h2>
                  <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Event Title</label>
                      <input
                        name="title"
                        placeholder="e.g. Annual Tech Summit"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                      <input
                        name="category"
                        placeholder="e.g. Workshop, Seminar"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        name="startDateTime"
                        value={form.startDateTime}
                        onChange={handleChange}
                        min={getLocalDateTime()}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">End Date & Time</label>
                      <input
                        type="datetime-local"
                        name="endDateTime"
                        value={form.endDateTime}
                        onChange={handleChange}
                        min={form.startDateTime}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="location"
                        placeholder="e.g. Grand Ballroom or Zoom Link"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                      />
                    </div>
                  </div>
<div className="space-y-2">
  <label className="text-sm font-bold text-slate-700 ml-1">Short Description</label>
  <textarea
    name="description"
    placeholder="Enter a short description (max 100 letters)"
    value={form.description}
    rows={4}
    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all resize-none"
    required
    onChange={(e) => {
      const input = e.target.value;
      const letterCount = input.replace(/\s+/g, "").length;
      if (letterCount <= 100) {
        setForm({ ...form, description: input });
      } else {
        // Trim to 100 letters if user types too fast
        let trimmedInput = input.split("").filter((_, i) => i < input.length && input.replace(/\s+/g, "").length <= 100).join("");
        setForm({ ...form, description: trimmedInput });
      }
    }}
    onPaste={(e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      const current = form.description;
      const remaining = 100 - current.replace(/\s+/g, "").length;
      const pasteChars = paste.replace(/\s+/g, "").split("").slice(0, remaining).join("");
      setForm({ ...form, description: current + pasteChars });
    }}
  />
  <p className="text-xs text-slate-400 mt-1">
    {form.description.replace(/\s+/g, "").length}/100 letters
  </p>
</div>          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#0F75BD] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-[#0d63a5] transition-all">
                      {editingId ? "Update Event" : "Create Event"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- EVENTS LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-40 bg-gradient-to-br from-[#0F75BD] to-[#0d63a5] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  <LayoutGrid className="text-white/20 scale-[4]" size={40} />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 rounded-lg shadow-sm">
                      {item.category || "General"}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-6">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/40 transition-all"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-xl hover:bg-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <Calendar size={12} />
               <span>{formatDateRange(item.startDateTime, item.endDateTime)}</span>
     <span className="mx-1">•</span>
                    <Clock size={12} />
<span>{formatTimeRange(item.startDateTime, item.endDateTime)}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-[#0F75BD] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div 
                    className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <MapPin size={14} className="text-[#0F75BD]" />
                      <span className="truncate max-w-[150px]">{item.location || "No Location"}</span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {events.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar size={40} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No Events Scheduled</h3>
            <p className="text-slate-500 mt-2">Click "New Event" to create your first event.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminEvents;