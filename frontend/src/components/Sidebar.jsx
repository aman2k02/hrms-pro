import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck } from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col shadow-2xl">

      {/* Logo Section */}
      <div className="px-8 py-8 border-b border-slate-800">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
          HRMS Pro
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Management Suite
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-8 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group relative flex items-center gap-4 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 group-hover:text-violet-400"
                }`}
              />
              <span className="tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="px-8 py-6 border-t border-slate-800 text-xs text-slate-500">
        © {new Date().getFullYear()} HRMS Pro
      </div>

    </aside>
  );
}