"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  CloudSun,
  Clock,
  CalendarDays,
  Wind,
  AlertTriangle,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const city = searchParams.get("city") || "Karachi";

  useEffect(() => setIsOpen(false), [pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/" },
    {
      name: "Current Weather",
      icon: <CloudSun size={22} />,
      path: "/current-weather",
    },
    {
      name: "Hourly Forecast",
      icon: <Clock size={22} />,
      path: "/hourly_forecast",
    },
    {
      name: "5-Day Forecast",
      icon: <CalendarDays size={22} />,
      path: "/5-day-Forecast",
    },
    { name: "Air Quality", icon: <Wind size={22} />, path: "/air-quality" },
    {
      name: "Weather Alerts",
      icon: <AlertTriangle size={22} />,
      path: "/weather-alerts",
    },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/5 z-[150] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-sky-500 p-1.5 rounded-lg shadow-lg shadow-sky-500/20">
            <Zap size={18} className="fill-white text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tighter italic text-white">
            SKY<span className="text-sky-500">CAST</span>
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(true)} // Sirf Open karne ke liye
          className="bg-sky-500 p-2.5 rounded-xl text-white active:scale-90 transition-all shadow-lg shadow-sky-500/20"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[160] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
  fixed left-0 top-0 h-screen w-80 bg-[#0a0f1a] border-r border-white/5 
  flex flex-col z-[170] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
  ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >
        {/* MOBILE ONLY: Top Close Section */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 p-2 rounded-xl shadow-xl shadow-sky-500/20 group-hover:rotate-6 transition-transform">
              <Zap size={24} className="fill-white text-white" />
            </div>

            <h1 className="text-2xl font-black tracking-tighter italic text-white">
              SKY<span className="text-sky-500">CAST</span>
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2.5 bg-white/5 hover:bg-red-500/10 rounded-2xl border border-white/10 hover:border-red-500/20 text-gray-400 hover:text-red-500 transition-all active:scale-90"
          >
            <X size={22} />
          </button>
        </div>
        {/* Responsive Logo Section (Desktop Focus) */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-10 pb-8 px-6 w-full">
          <Link
            href={`/?city=${city}`}
            className="flex items-center justify-center gap-2 group transition-transform active:scale-95"
          >
            <div className="bg-sky-500 p-2 rounded-xl shadow-xl shadow-sky-500/20 group-hover:rotate-6 transition-transform">
              <Zap size={24} className="fill-white text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic text-white">
              SKY<span className="text-sky-500">CAST</span>
            </h1>
          </Link>
          <div className="w-12 h-1 bg-sky-500/10 rounded-full mt-6" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 px-5 overflow-y-auto custom-scrollbar pt-4 lg:pt-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={`${item.path}?city=${city}`}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-white"
                      : "group-hover:text-sky-400 transition-colors"
                  }
                >
                  {item.icon}
                </span>
                <span className="font-bold text-[13px] tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto p-5 border-t border-white/5">
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/[0.07] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-black text-white text-xs shadow-inner">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">AhmedDevx07</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">
                  Active Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
