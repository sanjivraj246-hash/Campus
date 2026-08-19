'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RoleBanner from './RoleBanner';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#080c16]">
      {/* Top Recruiter / Judge Role Switcher Banner */}
      <RoleBanner />

      <div className="flex-1 flex">
        {/* Responsive Collapsible Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all">
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
