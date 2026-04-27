import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const PAGE_SIZES = [6, 12, 24];

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [expanded, setExpanded] = useState(new Set()); // cards can expand independently

  const fetchMessages = useCallback(async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  // ── Derived ───────────────────────────────────────────────────
  const filtered = messages.filter((m) => {
    if (filterStatus === "unread" && m.read) return false;
    if (filterStatus === "read" && !m.read) return false;
    if (search) {
      const q = search.toLowerCase();
      return [m.fullName, m.email, m.phone, m.message].join(" ").toLowerCase().includes(q);
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
    read: messages.filter((m) => m.read).length,
    week: messages.filter((m) => new Date(m.createdAt) >= new Date(Date.now() - 7 * 864e5)).length,
  };

  const allPageSelected = paginated.length > 0 && paginated.every((m) => selected.has(m.id));
  const somePageSelected = paginated.some((m) => selected.has(m.id));

  // ── Handlers ──────────────────────────────────────────────────
  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      paginated.forEach((m) => (checked ? next.add(m.id) : next.delete(m.id)));
      return next;
    });
  };

  const deleteOne = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
      setExpanded((prev) => { const n = new Set(prev); n.delete(id); return n; });
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const bulkDelete = async () => {
    if (!window.confirm(`Delete ${selected.size} messages?`)) return;
    try {
      await API.delete("/contact", { data: { ids: [...selected] } });
      setMessages((prev) => prev.filter((m) => !selected.has(m.id)));
      setSelected(new Set());
      toast.success(`${selected.size} messages deleted`);
    } catch {
      toast.error("Failed to delete messages");
    }
  };

  const toggleRead = async (id, currentRead) => {
    try {
      await API.patch(`/contact/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  const bulkRead = async () => {
    try {
      await API.patch("/contact/bulk-read", { ids: [...selected] });
      setMessages((prev) =>
        prev.map((m) => (selected.has(m.id) ? { ...m, read: true } : m))
      );
      setSelected(new Set());
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  if (loading) return <p className="p-6 text-gray-500">Loading messages...</p>;

  return (
    <div className="p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-medium text-[#0F75BD]">Contact Messages</h1>
        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
          <input type="checkbox" checked={allPageSelected}
            ref={(el) => { if (el) el.indeterminate = !allPageSelected && somePageSelected; }}
            onChange={(e) => toggleAll(e.target.checked)}
            className="cursor-pointer accent-[#0F75BD]" />
          Select all on page
        </label>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", val: stats.total, color: "text-gray-800" },
          { label: "Unread", val: stats.unread, color: "text-[#0F75BD]" },
          { label: "Read", val: stats.read, color: "text-green-600" },
          { label: "This week", val: stats.week, color: "text-gray-800" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-xl font-medium ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <input type="text" placeholder="Search name, email, message…"
          value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 min-w-[180px] text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-[#0F75BD]" />
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
          <option value="all">All status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <select value={perPage} onChange={(e) => { setPerPage(+e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
          {PAGE_SIZES.map((n) => <option key={n} value={n}>{n} / page</option>)}
        </select>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-[#0F75BD]">
          <span className="flex-1">{selected.size} selected</span>
          <button onClick={bulkRead}
            className="border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-100">
            ✓ Mark as read
          </button>
          <button onClick={bulkDelete}
            className="border border-red-300 text-red-500 px-3 py-1 rounded-lg hover:bg-red-50">
            ✕ Delete selected
          </button>
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-10">No messages match your filters.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {paginated.map((msg, i) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className={`relative bg-white border rounded-xl p-5 transition-all
                ${!msg.read ? "border-[#0F75BD]/30 bg-blue-50/30" : "border-gray-200"}
                ${selected.has(msg.id) ? "ring-2 ring-[#0F75BD]/40" : ""}
              `}
            >
              {/* Unread dot */}
              {!msg.read && (
                <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#0F75BD]" />
              )}

              {/* Checkbox */}
              <div className="absolute top-3 right-3">
                <input type="checkbox" checked={selected.has(msg.id)}
                  onChange={() => toggleRow(msg.id)}
                  className="cursor-pointer accent-[#0F75BD]" />
              </div>

              {/* Content */}
              <div className="pl-4 pr-6">
                <h2 className="font-medium text-gray-800 leading-tight">{msg.fullName}</h2>
                <p className="text-xs text-gray-400 mb-3">{fmtDate(msg.createdAt)}</p>
                <p className="text-sm text-gray-600 mb-1">📧 {msg.email}</p>
                {msg.phone && <p className="text-sm text-gray-600 mb-1">📞 {msg.phone}</p>}
{/* Message with expand/collapse */}
<div className="mt-3 w-full overflow-hidden">
  {expanded.has(msg.id) ? (
    <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
      {msg.message}
    </p>
  ) : (
    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 break-words">
      {msg.message}
    </p>
  )}

  {msg.message && msg.message.length > 120 && (
    <button
      onClick={() => toggleExpand(msg.id)}
      className="text-xs text-[#0F75BD] hover:underline mt-1 font-medium"
    >
      {expanded.has(msg.id) ? "Show less ↑" : "Read more ↓"}
    </button>
  )}
</div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between pl-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                  ${!msg.read ? "bg-blue-100 text-[#0F75BD]" : "bg-gray-100 text-gray-400"}`}>
                  {msg.read ? "Read" : "Unread"}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleRead(msg.id, msg.read)}
                    title={msg.read ? "Mark unread" : "Mark read"}
                    className="text-xs text-gray-400 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition-colors">
                    {msg.read ? "○ Unread" : "✓ Read"}
                  </button>
                  <button onClick={() => deleteOne(msg.id)}
                    className="text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded-md transition-colors">
                    ✕ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
          <span>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
              className="px-2 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                acc.push(p); return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2 py-1 text-gray-300">…</span>
                ) : (
                  <button key={p} onClick={() => setPage(p)}
                    className={`px-2.5 py-1 border rounded-md ${page === p
                      ? "bg-[#0F75BD]/10 border-[#0F75BD]/30 text-[#0F75BD] font-medium"
                      : "border-gray-200 hover:bg-gray-50"}`}>
                    {p}
                  </button>
                )
              )}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
              className="px-2 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30">›</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminContactMessages;