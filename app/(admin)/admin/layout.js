import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white mb-8">Admin Panel</h2>
          <nav className="space-y-3">
            <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-slate-800">
              Dashboard
            </Link>
            <Link href="/admin/users" className="block px-3 py-2 rounded-md hover:bg-slate-800">
              Users
            </Link>
            <Link href="/admin/settings" className="block px-3 py-2 rounded-md hover:bg-slate-800">
              Settings
            </Link>
          </nav>
        </div>
        <button className="text-left px-3 py-2 text-red-400 hover:bg-slate-800 rounded-md">
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}