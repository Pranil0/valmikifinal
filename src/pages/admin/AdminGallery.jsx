import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  FolderPlus,
  Search,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Edit,
  MoreVertical,
  CloudUpload,
  FileImage,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API from "../../services/api";

const IMAGE_BASE_URL = "http://localhost:5000";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", disabled = false, loading = false, className = "", icon: Icon }) => {
  const variants = {
    primary: "bg-[#0F75BD] text-white hover:bg-[#095aa0] disabled:bg-gray-300 disabled:text-gray-500",
    secondary: "bg-white text-[#0F75BD] border border-[#0F75BD] hover:bg-[#0F75BD] hover:text-white",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
    ghost: "text-gray-500 hover:text-[#0F75BD] hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : Icon ? <Icon size={18} /> : null}
      {children}
    </button>
  );
};

// ─── File Preview Card ──────────────────────────────────────────────────────
const FilePreviewCard = ({ file, index, onRemove }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
      className="relative group flex flex-col items-center gap-1.5 w-[88px] shrink-0"
    >
      <div className="relative w-[88px] h-[70px] rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-[#0F75BD] transition-colors bg-gray-100 shadow-sm">
        {preview ? (
          <img src={preview} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileImage size={22} className="text-gray-300" />
          </div>
        )}
        <button
          onClick={() => onRemove(index)}
          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow hover:bg-red-600 hover:scale-110 z-10"
          title="Remove"
        >
          <X size={10} />
        </button>
      </div>
      <span className="text-[10px] text-gray-500 font-medium text-center leading-tight w-full px-0.5 truncate" title={file.name}>
        {file.name}
      </span>
    </motion.div>
  );
};

// ─── Upload Dropzone Panel ───────────────────────────────────────────────────
const UploadPanel = ({ files, setFiles, onUpload, isUploading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => {
      const existingKeys = new Set(prev.map((f) => `${f.name}-${f.size}`));
      const newFiles = acceptedFiles.filter((f) => !existingKeys.has(`${f.name}-${f.size}`));
      return [...prev, ...newFiles];
    });
  }, [setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const totalSize = useMemo(() => {
    const bytes = files.reduce((sum, f) => sum + f.size, 0);
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, [files]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden
          ${isDragActive
            ? "border-[#0F75BD] bg-[#0F75BD]/5 scale-[1.01]"
            : files.length > 0
              ? "border-[#0F75BD]/40 bg-[#0F75BD]/[0.03]"
              : "border-gray-200 bg-gray-50 hover:border-[#0F75BD]/50 hover:bg-[#0F75BD]/[0.02]"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 py-7 px-4 text-center select-none">
          <motion.div
            animate={isDragActive ? { scale: 1.15, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CloudUpload
              size={32}
              className={isDragActive ? "text-[#0F75BD]" : "text-gray-300"}
              strokeWidth={1.5}
            />
          </motion.div>
          <div>
            <p className={`text-sm font-semibold ${isDragActive ? "text-[#0F75BD]" : "text-gray-600"}`}>
              {isDragActive ? "Drop images here" : "Drag & drop images"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              or <span className="text-[#0F75BD] font-semibold underline underline-offset-2">browse files</span> · PNG, JPG, WEBP, GIF
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Selected</span>
                <span className="text-[10px] font-bold bg-[#0F75BD]/10 text-[#0F75BD] px-2 py-0.5 rounded-full">
                  {files.length} {files.length === 1 ? "file" : "files"}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{totalSize}</span>
              </div>
              <button
                onClick={() => setFiles([])}
                className="text-[10px] font-bold text-red-400 hover:text-red-600 flex items-center gap-1 uppercase tracking-widest transition-colors"
              >
                <X size={11} /> Clear all
              </button>
            </div>

            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2 pr-2 scroll-smooth
                [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]
                [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:transparent
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
                <AnimatePresence mode="popLayout">
                  {files.map((file, i) => (
                    <FilePreviewCard key={`${file.name}-${file.size}-${i}`} file={file} index={i} onRemove={removeFile} />
                  ))}
                </AnimatePresence>
              </div>
              {files.length > 5 && (
                <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent" />
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <button
                onClick={onUpload}
                disabled={isUploading}
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                  ${isUploading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#0F75BD] text-white hover:bg-[#095aa0] shadow-md shadow-[#0F75BD]/20 hover:shadow-lg hover:shadow-[#0F75BD]/30"
                  }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Uploading {files.length} {files.length === 1 ? "photo" : "photos"}…
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload {files.length} {files.length === 1 ? "Photo" : "Photos"}
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const UploadProgressBar = ({ current, total }) => (
  <AnimatePresence>
    {total > 0 && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex items-center gap-3"
      >
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0F75BD] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(current / total) * 100}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-[#0F75BD] tabular-nums">{current}/{total}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const AdminGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editingAlbumName, setEditingAlbumName] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Always build URLs from the slug passed in — never from stale closure values
  const getPhotoUrl = (albumSlug, filename) =>
    `${IMAGE_BASE_URL}/uploads/gallery/${albumSlug}/${filename}`;

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/admin/albums");
      setAlbums(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch albums", { icon: <AlertCircle size={18} className="text-red-500" /> });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPhotos = useCallback(async (album) => {
    if (!album?.slug) return;
    try {
      const res = await API.get(`/admin/albums/${album.slug}`);
      setPhotos(res.data.Photos || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch photos");
    }
  }, []);

  useEffect(() => { fetchAlbums(); }, [fetchAlbums]);

  const createAlbum = async () => {
    if (!albumName.trim()) return toast.error("Enter album name");
    try {
      await API.post("/admin/albums", { name: albumName });
      toast.success("Album created", { icon: <CheckCircle2 size={18} className="text-green-500" /> });
      setAlbumName("");
      fetchAlbums();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create album");
    }
  };

  // ✅ FIXED: syncs slug, coverImage, and photos state all at once
  const updateAlbumNameHandler = async (album, name) => {
    if (!name.trim()) return toast.error("Album name cannot be empty");

    // No-op if name hasn't changed
    if (name.trim() === album.name) {
      setEditingAlbumId(null);
      setEditingAlbumName("");
      return;
    }

    try {
      const res = await API.put(`/admin/albums/${album.slug}`, { name });
      const updatedAlbum = res.data; // has new slug + coverImage + Photos[]

      toast.success("Album updated", { icon: <CheckCircle2 size={18} className="text-green-500" /> });

      // ✅ 1. Refresh sidebar list with updated slug + coverImage
      setAlbums((prev) =>
        prev.map((a) => (a.id === updatedAlbum.id ? updatedAlbum : a))
      );

      // ✅ 2. If this album is currently open, update selectedAlbum with NEW slug
      //       so getPhotoUrl() builds correct paths immediately
      if (selectedAlbum?.id === updatedAlbum.id) {
        setSelectedAlbum(updatedAlbum);
        // ✅ 3. Sync photos state from the API response — no stale filenames
        setPhotos(updatedAlbum.Photos || []);
      }

      setEditingAlbumId(null);
      setEditingAlbumName("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const deleteAlbumHandler = async (album) => {
    if (!window.confirm("Delete this album and all its photos?")) return;
    try {
      await API.delete(`/admin/albums/${album.slug}`);
      toast.success("Album deleted");
      if (selectedAlbum?.id === album.id) {
        setSelectedAlbum(null);
        setPhotos([]);
      }
      fetchAlbums();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  // ✅ FIXED: also clears coverImage from state if the cover photo is deleted
  const deletePhotoHandler = async (photoId) => {
  if (!window.confirm("Delete this photo permanently?")) return;
  try {
    const res = await API.delete(`/admin/photos/${photoId}`);
    const { coverImage } = res.data; // ✅ get new cover from backend

    // Remove photo from grid
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));

    // ✅ Sync new coverImage into both selectedAlbum and albums sidebar
    setSelectedAlbum((prev) => ({ ...prev, coverImage }));
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === selectedAlbum.id ? { ...a, coverImage } : a
      )
    );

    toast.success("Photo deleted");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Delete failed");
  }
};

  const uploadPhotosHandler = async () => {
    if (!files.length) return toast.error("Select images first");
    if (!selectedAlbum) return toast.error("No album selected");

    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));

    setIsUploading(true);
    setUploadProgress({ current: 0, total: files.length });

    try {
      await API.post(`/admin/photos/${selectedAlbum.slug}`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * files.length) / (progressEvent.total || 1));
          setUploadProgress({ current: Math.min(percent, files.length), total: files.length });
        },
      });

      setUploadProgress({ current: files.length, total: files.length });

      toast.success(
        <span>
          <span className="font-bold">{files.length}</span> photo{files.length > 1 ? "s" : ""} uploaded!
        </span>,
        { icon: <CheckCircle2 size={18} className="text-green-500" /> }
      );

      setFiles([]);

      // ✅ Re-fetch photos AND refresh album (coverImage may have been auto-set)
      const res = await API.get(`/admin/albums/${selectedAlbum.slug}`);
      const refreshed = res.data;
      setPhotos(refreshed.Photos || []);

      // Sync coverImage into selectedAlbum and albums list
      setSelectedAlbum((prev) => ({ ...prev, coverImage: refreshed.coverImage }));
      setAlbums((prev) =>
        prev.map((a) => (a.id === refreshed.id ? { ...a, coverImage: refreshed.coverImage } : a))
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  const handleSetCover = async (photoId) => {
    try {
      const selectedPhoto = photos.find((p) => p.id === photoId);
      if (!selectedPhoto) return;

      // ✅ Optimistic update
      setSelectedAlbum((prev) => ({ ...prev, coverImage: selectedPhoto.filename }));
      setAlbums((prev) =>
        prev.map((a) =>
          a.id === selectedAlbum.id ? { ...a, coverImage: selectedPhoto.filename } : a
        )
      );

      await API.put(`/admin/photos/${photoId}/set-cover`);
      toast.success("Cover photo updated!");
    } catch (err) {
      toast.error("Failed to set cover photo.");
      // ✅ Revert optimistic update on failure
      fetchAlbums();
    }
  };

  const filteredAlbums = useMemo(
    () => albums.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [albums, searchQuery]
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" } }} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0F75BD] rounded-xl flex items-center justify-center text-white shadow-lg">
              <ImageIcon size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Gallery Manager</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F75BD] transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-[#0F75BD] focus:ring-0 rounded-lg text-sm w-full md:w-64 transition-all"
              />
            </div>
            <button
              onClick={() => setSelectedAlbum(null)}
              className={`p-2 rounded-lg transition-colors ${!selectedAlbum ? "bg-[#0F75BD] text-white" : "text-gray-500 hover:bg-gray-100"}`}
              title="View all albums"
            >
              <FolderPlus size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-5">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Create New Album</h2>
              <div className="flex flex-col gap-3">
                <input
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createAlbum()}
                  placeholder="e.g. Summer Vacation 2024"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0F75BD]/30 focus:border-[#0F75BD] transition-all outline-none"
                />
                <Button onClick={createAlbum} icon={Plus}>Create Album</Button>
              </div>
            </Card>

            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Albums</h2>
                <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{filteredAlbums.length}</span>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Loader2 className="animate-spin mb-2" size={24} />
                  <p className="text-xs font-medium">Loading albums...</p>
                </div>
              ) : filteredAlbums.length === 0 ? (
                <div className="bg-gray-100/50 border border-dashed border-gray-300 rounded-2xl p-8 text-center">
                  <p className="text-sm text-gray-500">No albums found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filteredAlbums.map((album) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={album.id}
                        onClick={() => {
                          if (editingAlbumId === album.id) return;
                          setSelectedAlbum(album);
                          fetchPhotos(album);
                          setEditingAlbumId(null);
                          setEditingAlbumName("");
                          setFiles([]);
                        }}
                        className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                          selectedAlbum?.id === album.id
                            ? "bg-[#0F75BD] border-[#0F75BD] text-white shadow-lg"
                            : "bg-white border-gray-200 hover:border-[#0F75BD] text-gray-900"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {/* ✅ Thumbnail always uses album.slug from the iterated album object */}
                            <div className={`w-10 h-10 shrink-0 rounded-lg overflow-hidden flex items-center justify-center ${selectedAlbum?.id === album.id ? "bg-white/20" : "bg-gray-100"}`}>
                              {album.coverImage ? (
                                <img
                                  src={getPhotoUrl(album.slug, album.coverImage)}
                                  alt={album.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                              ) : (
                                <ImageIcon size={16} className="text-gray-400" />
                              )}
                            </div>

                            {editingAlbumId === album.id ? (
                              <div className="flex flex-col gap-2 flex-1 w-full" onClick={(e) => e.stopPropagation()}>
                                <input
                                  autoFocus
                                  value={editingAlbumName}
                                  onChange={(e) => setEditingAlbumName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") updateAlbumNameHandler(album, editingAlbumName);
                                    if (e.key === "Escape") setEditingAlbumId(null);
                                  }}
                                  className={`px-2 py-1 rounded-lg w-full text-sm focus:outline-none ${selectedAlbum?.id === album.id ? "bg-white/90 text-gray-900 border border-white/30" : "bg-white text-gray-900 border border-gray-300"}`}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateAlbumNameHandler(album, editingAlbumName)}
                                    className="flex-1 px-3 py-1.5 bg-white text-[#0F75BD] rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => { setEditingAlbumId(null); setEditingAlbumName(""); }}
                                    className="flex-1 px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-semibold hover:bg-white/30 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                            )}
                          </div>

                          {editingAlbumId !== album.id && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAlbum(album);
                                  fetchPhotos(album);
                                  setEditingAlbumId(album.id);
                                  setEditingAlbumName(album.name);
                                }}
                                className={`p-1.5 rounded-lg transition-colors ${selectedAlbum?.id === album.id ? "text-white/60 hover:text-white hover:bg-white/10" : "text-[#0F75BD] hover:bg-[#0F75BD]/10"}`}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteAlbumHandler(album); }}
                                className={`p-1.5 rounded-lg transition-colors ${selectedAlbum?.id === album.id ? "text-white/60 hover:text-white hover:bg-white/10" : "text-red-500 hover:text-red-700 hover:bg-red-50"}`}
                              >
                                <Trash2 size={16} />
                              </button>
                              <ChevronRight size={14} className={selectedAlbum?.id === album.id ? "text-white/40" : "text-gray-300"} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </aside>

          {/* ── Content panel ────────────────────────────────────────────── */}
          <section className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedAlbum ? (
                <motion.div
                  key={selectedAlbum.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Upload card */}
                  <Card className="p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold bg-[#0F75BD]/10 text-[#0F75BD] px-2 py-0.5 rounded-full uppercase tracking-widest">Active Album</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">{selectedAlbum.name}</h2>
                        <p className="text-sm text-gray-500 font-medium">{photos.length} items stored</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => fetchPhotos(selectedAlbum)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#0F75BD] hover:bg-gray-100 rounded-xl transition-all"
                          title="Refresh photos"
                        >
                          <Loader2 className={isLoading ? "animate-spin" : ""} size={20} />
                        </button>
                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#0F75BD] hover:bg-gray-100 rounded-xl transition-all">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <UploadProgressBar current={uploadProgress.current} total={uploadProgress.total} />

                    <UploadPanel
                      files={files}
                      setFiles={setFiles}
                      onUpload={uploadPhotosHandler}
                      isUploading={isUploading}
                    />
                  </Card>

                  {/* ✅ Photo grid — uses selectedAlbum.slug which is always fresh after rename */}
                  {photos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <AnimatePresence mode="popLayout">
                        {photos.map((photo) => {
                          const isCover = selectedAlbum?.coverImage === photo.filename;
                          return (
                            <motion.div
                              layout
                              key={photo.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                            >
                              <Card className={`relative overflow-hidden group ${isCover ? "ring-2 ring-[#0F75BD]" : ""}`}>
                                <img
                                  src={getPhotoUrl(selectedAlbum.slug, photo.filename)}
                                  alt={photo.filename}
                                  className="w-full h-32 object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                                {isCover && (
                                  <div className="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold bg-[#0F75BD] text-white rounded-md shadow">
                                    COVER
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                  {!isCover && (
                                    <button
                                      onClick={() => handleSetCover(photo.id)}
                                      className="px-3 py-1.5 bg-[#0F75BD] text-white rounded-md text-xs font-semibold hover:bg-blue-600 transition"
                                    >
                                      Set Cover
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deletePhotoHandler(photo.id)}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded-md text-xs font-semibold hover:bg-red-600 transition"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-gray-400">
                      No photos uploaded yet
                    </Card>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={28} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium">Select an album to view and upload photos</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminGallery;
