import React, { useEffect, useState } from "react";
import {
  Plus,
  Image as ImageIcon,
  Trash2,
  Edit3,
  Search,
  LayoutGrid,
  X,
  Upload,
  User,
  Calendar,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";
import API from "../../services/api";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    title: "",
    desc: "",
    category: "",
    author: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, data);
        toast.success("Blog updated successfully!");
      } else {
        await API.post("/blogs", data);
        toast.success("Blog created successfully!");
      }

      setForm({ title: "", desc: "", category: "", author: "", content: "", image: null });
      setPreview(null);
      setEditingId(null);
      setIsFormOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed, please try again");
    }
  };

  // ================= HANDLE EDIT =================
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      desc: blog.desc,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: null,
    });
    setPreview(blog.imageUrl ? `http://localhost:5000${blog.imageUrl}` : null);
    setEditingId(blog.id);
    setIsFormOpen(true);
  };

  // ================= HANDLE DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  // ================= FILTERED BLOGS =================
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <span className="bg-[#0F75BD] text-white p-2 rounded-xl shadow-lg shadow-blue-200">
                <LayoutGrid size={28} />
              </span>
              Blog Engine
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your digital presence with precision.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F75BD] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setForm({ title: "", desc: "", category: "", author: "", content: "", image: null });
                setPreview(null);
                setEditingId(null);
                setIsFormOpen(true);
              }}
              className="bg-[#0F75BD] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#0d63a5] transition-all"
            >
              <Plus size={20} />
              New Post
            </motion.button>
          </div>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Posts", value: blogs.length },
            { label: "Categories", value: new Set(blogs.map((b) => b.category)).size },
            { label: "Authors", value: new Set(blogs.map((b) => b.author)).size },
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
                className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <h2 className="text-2xl font-black text-slate-900">
                    {editingId ? "Edit Article" : "Compose New Article"}
                  </h2>
                  <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                  {/* --- Inputs: title, author, category, desc --- */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {["title", "author", "category", "desc"].map((field) => (
                      <div className="space-y-2" key={field}>
                        <label className="text-sm font-bold text-slate-700 ml-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                          name={field}
                          placeholder={`Enter ${field}`}
                          value={form[field]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F75BD]/20 focus:border-[#0F75BD] transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  {/* --- Content --- */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Content</label>
                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                      <ReactQuill
                        theme="snow"
                        value={form.content}
                        onChange={(value) => setForm({ ...form, content: value })}
                        className="min-h-[200px]"
                      />
                    </div>
                  </div>

                  {/* --- Cover Image --- */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 ml-1">Cover Image</label>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="relative group w-full sm:w-64 aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden transition-colors hover:border-[#0F75BD]">
                        {preview ? (
                          <>
                            <img src={preview} className="w-full h-full object-cover" alt="preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => { setPreview(null); setForm({ ...form, image: null }); }}
                                className="bg-red-500 text-white p-2 rounded-full"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                            <p className="text-xs font-bold text-slate-400">Click to upload image</p>
                          </div>
                        )}
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Buttons --- */}
                  <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#0F75BD] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-[#0d63a5] transition-all">
                      {editingId ? "Update Article" : "Publish Article"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- BLOG LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={blog.id}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.imageUrl ? `http://localhost:5000${blog.imageUrl}` : "/placeholder.png"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={blog.title}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 rounded-lg shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/40 transition-all"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-xl hover:bg-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <Calendar size={12} />
                    <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "—"}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-[#0F75BD] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed flex-1">
                    {blog.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{blog.author}</span>
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
        {blogs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon size={40} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No Articles Yet</h3>
            <p className="text-slate-500 mt-2">Start your journey by creating your first blog post.</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Create Post
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminBlogs;