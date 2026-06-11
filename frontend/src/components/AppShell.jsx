import { BarChart3, Gauge, Leaf, ListPlus, LogOut, Settings, User } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/activity", label: "Track", icon: ListPlus },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function AppShell() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-forest-50 text-ink dark:bg-[#06120a] dark:text-forest-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-forest-100 bg-white/90 p-5 backdrop-blur dark:border-forest-900 dark:bg-[#07160c]/95 lg:block">
        <NavLink to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-forest-700 dark:text-forest-100">
          <Leaf aria-hidden="true" /> CarbonWise
        </NavLink>
        <nav className="mt-8 space-y-2" aria-label="Dashboard navigation">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-forest-100 text-forest-700 dark:bg-forest-900 dark:text-forest-50" : "text-slate-600 hover:bg-forest-50 dark:text-forest-100 dark:hover:bg-forest-900/50"
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-white dark:bg-forest-100 dark:text-forest-900"
        >
          <LogOut size={18} aria-hidden="true" /> Logout
        </button>
      </aside>
      <header className="sticky top-0 z-10 border-b border-forest-100 bg-white/90 px-4 py-3 backdrop-blur dark:border-forest-900 dark:bg-[#07160c]/95 lg:ml-64">
        <div className="flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-2 font-bold text-forest-700 dark:text-forest-100 lg:hidden">
            <Leaf aria-hidden="true" /> CarbonWise
          </NavLink>
          <span className="hidden text-sm text-slate-600 dark:text-forest-100 lg:block">Welcome back, {user?.full_name}</span>
          <nav className="flex gap-1 lg:hidden" aria-label="Mobile navigation">
            {nav.slice(0, 3).map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} aria-label={label} className="rounded-md p-2 text-forest-700 dark:text-forest-100">
                <Icon size={20} aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4 lg:ml-64 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
