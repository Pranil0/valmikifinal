import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  FileText,
  Image,
  CalendarDays,
  Newspaper,
  MessageSquare,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

const statConfig = [
  {
    key: "blogs",
    title: "Total Blogs",
    endpoint: "/blogs",
    icon: FileText,
    color: "#0F75BD",
    bg: "#0F75BD12",
    path: "/admin/blogs",
  },
  {
    key: "news",
    title: "Total News",
    endpoint: "/news",
    icon: Newspaper,
    color: "#15803D",
    bg: "#15803D12",
    path: "/admin/news",
  },
  {
    key: "events",
    title: "Total Events",
    endpoint: "/events",
    icon: CalendarDays,
    color: "#7C3AED",
    bg: "#7C3AED12",
    path: "/admin/events",
  },
  {
    key: "gallery",
    title: "Gallery Albums",
    endpoint: "/admin/albums",
    icon: Image,
    color: "#FCA61B",
    bg: "#FCA61B12",
    path: "/admin/gallery",
  },
  {
    key: "inquiries",
    title: "+2 Inquiries",
    endpoint: "/inquiry",
    icon: GraduationCap,
    color: "#DB2777",
    bg: "#DB277712",
    path: "/admin/inquiry-messages",
  },
  {
    key: "contacts",
    title: "Contact Messages",
    endpoint: "/contact",
    icon: MessageSquare,
    color: "#0891B2",
    bg: "#0891B212",
    path: "/admin/contact-messages",
  },
];

/* ── Stat Card ── */
const StatCard = ({ stat, value, loading, onClick }) => {
  const Icon = stat.icon;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm
                 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5
                 transition-all duration-300 flex flex-col gap-4 cursor-pointer
                 active:scale-95"
    >
      {/* Top row — icon + value */}
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: stat.bg }}
        >
          <Icon size={22} style={{ color: stat.color }} />
        </div>

        {loading ? (
          <div className="w-12 h-8 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <span
            className="text-3xl font-black tracking-tight"
            style={{ color: stat.color }}
          >
            {value ?? 0}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <p className="text-sm font-semibold text-gray-700">{stat.title}</p>
       
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: loading ? "0%" : "100%",
            background: stat.color,
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  );
};

/* ── Main Dashboard ── */
const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchAll = async () => {
    setLoading(true);
    setError(false);
    try {
      const results = await Promise.allSettled(
        statConfig.map((s) => API.get(s.endpoint))
      );

      const newCounts = {};
      results.forEach((result, i) => {
        const key = statConfig[i].key;
        if (result.status === "fulfilled") {
          const data = result.value.data;
          newCounts[key] = Array.isArray(data)
            ? data.length
            : Array.isArray(data?.data)
            ? data.data.length
            : 0;
        } else {
          newCounts[key] = 0;
        }
      });

      setCounts(newCounts);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>

        <button
          onClick={fetchAll}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F75BD] text-white
                     text-sm font-semibold rounded-xl hover:bg-[#0a5a9a] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── Error state ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium">
          Failed to load some data. Check your API connection and try refreshing.
        </div>
      )}

      {/* ── Stat Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statConfig.map((stat) => (
          <StatCard
            key={stat.key}
            stat={stat}
            value={counts[stat.key]}
            loading={loading}
            onClick={() => navigate(stat.path)}
          />
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;