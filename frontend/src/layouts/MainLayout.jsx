import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-12 py-6 flex justify-between items-center">

          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              HRMS Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage employees, attendance & workflow
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">

            <div className="text-sm text-slate-400">
              Welcome back,{" "}
              <span className="font-semibold text-white">
                Admin
              </span>
            </div>

            {/* Avatar */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-semibold text-white shadow-lg hover:scale-110 transition duration-300 cursor-pointer">
              A
            </div>

          </div>
        </header>

        {/* Page Content Wrapper */}
        <main className="flex-1 px-12 py-12 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}