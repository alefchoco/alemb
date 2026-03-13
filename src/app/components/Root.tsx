import { Outlet, NavLink } from "react-router";
import { Shield, Activity, Eye, Mail, Video, FileText, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Root() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threats, setThreats] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { path: "/", icon: Activity, label: "Dashboard", exact: true },
    { path: "/deep-scan", icon: Shield, label: "Deep Scan" },
    { path: "/privacy", icon: Eye, label: "Privacidad" },
    { path: "/communication", icon: Mail, label: "Comunicación" },
    { path: "/multimedia", icon: Video, label: "Multimedia" },
    { path: "/reports", icon: FileText, label: "Reportes" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-zinc-950 to-black border-r border-red-900/30 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-red-900/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="size-10 text-red-600" strokeWidth={2} />
              <div className="absolute inset-0 blur-xl bg-red-600/50"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Shield-Master</h1>
              <p className="text-xs text-red-500 font-semibold">2026 Edition</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-red-600/20 border border-red-600/50 text-red-500 shadow-lg shadow-red-600/20"
                    : "hover:bg-zinc-900/50 text-zinc-400 hover:text-white border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`size-5 ${isActive ? "text-red-500" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-red-900/30">
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-500">Sistema Protegido</span>
            </div>
            <div className="text-xs text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Amenazas Bloqueadas:</span>
                <span className="text-red-500 font-bold">{threats}</span>
              </div>
              <div className="flex justify-between">
                <span>Última Actualización:</span>
                <span className="text-white font-mono">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet context={{ threats, setThreats }} />
      </main>
    </div>
  );
}
