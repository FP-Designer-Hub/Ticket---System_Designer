import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Request Task", path: "/request-task" },
    { label: "Designer Tasks", path: "/designer-tasks" },
    { label: "Live Tasks", path: "/live-tasks" },
    { label: "Audit Logs", path: "/audit-logs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Footprints" className="h-10 w-auto" />
            <h1 className="text-xl font-bold text-gray-900">Footprints Design Desk</h1>
          </div>
          <div className="text-sm text-gray-600">
            <span>Typography: </span>
            <span className="font-semibold">Segoe UI</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  isActive(item.path)
                    ? "border-[#5B5FC7] text-[#5B5FC7]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">{children}</main>
    </div>
  );
}
