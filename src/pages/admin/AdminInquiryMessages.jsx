import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const PAGE_SIZES = [5, 10, 20];

const AdminInquiryMessages = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStream, setFilterStream] = useState("all");
  const [sortCol, setSortCol] = useState("createdAt");
  const [sortDir, setSortDir] = useState(-1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState(new Set());
  const [expanded, setExpanded] = useState(null);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await API.get("/inquiry");
      if (res.data.success) setInquiries(res.data.inquiries);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  // ── Derived ───────────────────────────────────────────────────
  const streams = [...new Set(inquiries.map((r) => r.stream).filter(Boolean))].sort();

  const filtered = inquiries
    .filter((r) => {
      if (filterStatus === "unread" && r.read) return false;
      if (filterStatus === "read" && !r.read) return false;
      if (filterStream !== "all" && r.stream !== filterStream) return false;
      if (search) {
        const q = search.toLowerCase();
        return [r.studentName, r.parentName, r.email, r.stream, r.message]
          .join(" ").toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = {
    total: inquiries.length,
    unread: inquiries.filter((r) => !r.read).length,
    read: inquiries.filter((r) => r.read).length,
    week: inquiries.filter((r) => new Date(r.createdAt) >= new Date(Date.now() - 7 * 864e5)).length,
  };

  const allPageSelected = paginated.length > 0 && paginated.every((r) => selected.has(r.id));
  const somePageSelected = paginated.some((r) => selected.has(r.id));

  // ── Handlers ──────────────────────────────────────────────────
  const handleSort = (col) => {
    setSortCol(col);
    setSortDir((d) => (sortCol === col ? d * -1 : -1));
    setPage(1);
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
      paginated.forEach((r) => (checked ? next.add(r.id) : next.delete(r.id)));
      return next;
    });
  };

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await API.delete(`/inquiry/${id}`);
      toast.success("Inquiry deleted successfully");
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
      if (expanded === id) setExpanded(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry.");
    }
  };

  const bulkDelete = async () => {
    if (!window.confirm(`Delete ${selected.size} inquiries?`)) return;
    try {
      await API.delete("/inquiry", { data: { ids: [...selected] } });
      setInquiries((prev) => prev.filter((r) => !selected.has(r.id)));
      setSelected(new Set());
      toast.success(`${selected.size} inquiries deleted.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to bulk delete.");
    }
  };

  const toggleRead = async (id, currentRead) => {
    try {
      await API.patch(`/inquiry/${id}/read`);
      setInquiries((prev) =>
        prev.map((r) => (r.id === id ? { ...r, read: !currentRead } : r))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  const bulkRead = async () => {
    try {
      await API.patch("/inquiry/bulk-read", { ids: [...selected] });
      setInquiries((prev) =>
        prev.map((r) => (selected.has(r.id) ? { ...r, read: true } : r))
      );
      setSelected(new Set());
      toast.success("Marked as read.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as read.");
    }
  };

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const sortArrow = (col) => sortCol === col ? (sortDir === 1 ? " ↑" : " ↓") : "";

  if (loading) return <p className="p-6 text-gray-500">Loading inquiries...</p>;

  return (
    <div className="p-6 space-y-5">

      {/* Header */}
      <h2 className="text-xl font-medium text-[#0F75BD]">Inquiry Messages</h2>

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
        <input
          type="text"
          placeholder="Search name, email, stream…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 min-w-[180px] text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-[#0F75BD]"
        />
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
          <option value="all">All status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <select value={filterStream} onChange={(e) => { setFilterStream(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
          <option value="all">All streams</option>
          {streams.map((s) => <option key={s} value={s}>{s}</option>)}
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

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-[#0F75BD]/10 text-gray-600 text-xs">
              <tr>
                <th className="px-3 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    ref={(el) => { if (el) el.indeterminate = !allPageSelected && somePageSelected; }}
                    onChange={(e) => toggleAll(e.target.checked)}
                    className="cursor-pointer accent-[#0F75BD]"
                  />
                </th>
                <th className="px-3 py-3 w-6"></th>
                {[
                  ["studentName", "Student"],
                  ["email", "Email"],
                  ["stream", "Stream"],
                  ["createdAt", "Date"],
                ].map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)}
                    className="px-3 py-3 text-left whitespace-nowrap cursor-pointer hover:text-[#0F75BD]">
                    {label}{sortArrow(col)}
                  </th>
                ))}
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                    No inquiries match your filters.
                  </td>
                </tr>
              ) : paginated.map((inq) => (
                <React.Fragment key={inq.id}>

                  {/* Main row */}
                  <tr className={`border-t border-gray-100 transition-colors
                    ${!inq.read ? "bg-blue-50/40" : ""}
                    ${selected.has(inq.id) ? "!bg-blue-50" : "hover:bg-gray-50"}
                  `}>
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(inq.id)}
                        onChange={() => toggleRow(inq.id)}
                        className="cursor-pointer accent-[#0F75BD]"
                      />
                    </td>

                    {/* Expand chevron */}
                    <td className="px-2 py-3">
                      <button
                        onClick={() => toggleExpand(inq.id)}
                        className="text-gray-400 hover:text-[#0F75BD] text-xs transition-transform duration-200"
                        style={{ display: "inline-block", transform: expanded === inq.id ? "rotate(90deg)" : "rotate(0deg)" }}
                      >
                        ▶
                      </button>
                    </td>

                    <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {inq.studentName}
                      {!inq.read && (
                        <span className="inline-block w-1.5 h-1.5 bg-[#0F75BD] rounded-full ml-1.5 align-middle" />
                      )}
                    </td>
                    <td className="px-3 py-3 text-[#0F75BD] whitespace-nowrap">{inq.email}</td>
                    <td className="px-3 py-3">
                      {inq.stream && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                          ${!inq.read ? "bg-blue-100 text-[#0F75BD]" : "bg-gray-100 text-gray-500"}`}>
                          {inq.stream}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {fmtDate(inq.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${!inq.read ? "bg-blue-100 text-[#0F75BD]" : "bg-green-100 text-green-600"}`}>
                        {inq.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRead(inq.id, inq.read)}
                          title={inq.read ? "Mark unread" : "Mark read"}
                          className="text-gray-400 hover:text-green-500 hover:bg-green-50 p-1 rounded-md text-xs"
                        >
                          {inq.read ? "○" : "✓"}
                        </button>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {expanded === inq.id && (
                    <tr className={`${!inq.read ? "bg-blue-50/20" : "bg-gray-50/60"}`}>
                      <td colSpan={8} className="px-6 pb-5 pt-3">
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-dashed border-gray-200 pt-4"
                          >
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Parent name</p>
                              <p className="text-sm text-gray-700 font-medium">{inq.parentName || "—"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Phone</p>
                              <p className="text-sm text-gray-700 font-medium">{inq.phone || "—"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Date of birth</p>
                              <p className="text-sm text-gray-700 font-medium">
                                {inq.dob ? fmtDate(inq.dob) : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Stream</p>
                              <p className="text-sm text-gray-700 font-medium">{inq.stream || "—"}</p>
                            </div>
                            <div className="col-span-2 sm:col-span-4">
                              <p className="text-xs text-gray-400 mb-1">Message</p>
                              <p className="text-sm text-gray-700 leading-relaxed bg-white border border-gray-100 rounded-lg px-3 py-2 whitespace-pre-wrap break-words">
                                {inq.message || "No message provided."}
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </td>
                    </tr>
                  )}

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {filtered.length > 0
            ? `Showing ${(page - 1) * perPage + 1}–${Math.min(page * perPage, filtered.length)} of ${filtered.length}`
            : "No results"}
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

    </div>
  );
};

export default AdminInquiryMessages;