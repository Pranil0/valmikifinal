import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  CalendarDays,
  Newspaper,
  LogOut,
  ChevronLeft,
  ChevronRight,
  School,
  X,
  MessageSquare
} from "lucide-react";
import ChangePasswordForm from "../../components/admin/ChangePasswordForm";
const links = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blogs",     path: "/admin/blogs",     icon: FileText },
  { name: "Gallery",   path: "/admin/gallery",   icon: Image },
  { name: "Events",    path: "/admin/events",    icon: CalendarDays },
  { name: "News",      path: "/admin/news",      icon: Newspaper },
{ name: "Contact Messages", path: "/admin/contact-messages", icon: MessageSquare },
  { name: "+2 Inquiry Messages", path: "/admin/inquiry-messages", icon: MessageSquare },
];

const Sidebar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Backdrop — only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-50
          flex flex-col
          bg-gradient-to-b from-[#0a4a7a] to-[#072f50]
          border-r border-white/10
          transition-all duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "md:w-[72px]" : "md:w-64"} w-64
        `}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 px-5 py-5 border-b border-white/10 ${collapsed ? "md:justify-center md:px-3" : ""}`}>
          <div className="w-9 h-9 rounded-xl bg-[#FCA61B] flex items-center justify-center shrink-0 shadow-md">
            <School size={18} className="text-white" />
          </div>

          <div className={`transition-all duration-200 overflow-hidden ${collapsed ? "md:hidden" : ""}`}>
            <p className="text-white font-extrabold text-sm leading-tight">Valmiki</p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest leading-tight">Admin Panel</p>
          </div>

          {/* X — mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto md:hidden text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-5 flex-grow">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={onClose}
              className={({ isActive }) => `
                group relative flex items-center gap-3 rounded-xl px-3 py-2.5
                transition-all duration-200 text-sm font-medium
                ${collapsed ? "md:justify-center md:px-2" : ""}
                ${isActive
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FCA61B] rounded-full" />
                  )}
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors duration-200 ${
                      isActive ? "text-[#FCA61B]" : "text-white/50 group-hover:text-white"
                    }`}
                  />
                  <span className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${collapsed ? "md:hidden" : ""}`}>
                    {name}
                  </span>
                  {collapsed && (
                    <span className="hidden md:flex absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
                      {name}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
{/* Footer */}
<div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-2 mt-auto">
  {/* Collapse Button */}
  <button
    onClick={() => setCollapsed(!collapsed)}
    className={`
      hidden md:flex items-center gap-3 w-full rounded-xl px-3 py-2.5
      text-white/50 hover:text-white hover:bg-white/10
      transition-all duration-200 text-sm font-medium
      ${collapsed ? "justify-center" : ""}
    `}
  >
    {collapsed
      ? <ChevronRight size={18} />
      : <><ChevronLeft size={18} className="shrink-0" /><span>Collapse</span></>
    }
  </button>

  
  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className={`
      group relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5
      text-red-400 hover:text-white hover:bg-red-500/80
      transition-all duration-200 text-sm font-medium
      ${collapsed ? "md:justify-center" : ""}
    `}
  >
    <LogOut size={18} className="shrink-0" />
    <span className={`overflow-hidden whitespace-nowrap ${collapsed ? "md:hidden" : ""}`}>
      Logout
    </span>
    {collapsed && (
      <span className="hidden md:flex absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
        Logout
      </span>
    )}
  </button>
</div>
      </aside>
    </>
  );
};

export default Sidebar;