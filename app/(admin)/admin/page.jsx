'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalServices: 0, totalWork: 0, totalBlogs: 0, totalWhyChooseUs: 0, totalFaqs: 0, loading: true });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/users').then((r) => r.json()).catch(() => ({ users: [] })),
      fetch('/api/admin/services').then((r) => r.json()).catch(() => ({ count: 0 })),
      fetch('/api/admin/our-work').then((r) => r.json()).catch(() => ({ count: 0 })),
      fetch('/api/admin/blogs').then((r) => r.json()).catch(() => ({ count: 0 })),
      fetch('/api/admin/why-choose-us').then((r) => r.json()).catch(() => ({ count: 0 })),
      fetch('/api/admin/faqs').then((r) => r.json()).catch(() => ({ count: 0 })),
    ]).then(([userData, serviceData, workData, blogData, whyChooseUsData, faqData]) => {
      setStats({
        totalUsers: userData.users ? userData.users.length : 0,
        totalServices: serviceData.count || 0,
        totalWork: workData.count || 0,
        totalBlogs: blogData.count || 0,
        totalWhyChooseUs: whyChooseUsData.count || 0,
        totalFaqs: faqData.count || 0,
        loading: false,
      });
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Admin. Monitor platform growth and manage users seamlessly.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 mr-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System Live & Secure
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Services */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Services</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalServices}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              💼
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dynamic catalog live</span>
            <Link href="/admin/services" className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 group">
              Manage services <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 2 - Users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Registered Users</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalUsers}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 text-lg shadow-sm">
              👥
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Database synchronized</span>
            <Link href="/admin/users" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 group">
              Manage users <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 3 - Our Work */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Our Work Portfolio</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalWork}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              🎨
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Verified sewouts live</span>
            <Link href="/admin/our-work" className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 group">
              Manage work <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 4 - Blog Posts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Blog &amp; Knowledge Base</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalBlogs}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              📝
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dynamic articles published</span>
            <Link href="/admin/blog" className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 group">
              Manage blog <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 5 - Why Choose Us */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Why Choose Us</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalWhyChooseUs}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              ⭐
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Home Section Synchronized</span>
            <Link href="/admin/why-choose-us" className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 group">
              Manage section <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 6 - FAQs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Frequently Asked Questions</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                {stats.loading ? '...' : stats.totalFaqs}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              ❓
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Global Accordion live</span>
            <Link href="/admin/faqs" className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1 group">
              Manage FAQs <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 7 - Security Guard */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Security Guard</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mt-2">Protected</h3>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-lg shadow-sm">
              🛡️
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>JWT & Cookie Middleware verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}