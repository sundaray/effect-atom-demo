"use client";

import { UserGrid } from "@/components/user-grid";
import { Sidebar, SidebarToggle } from "@/components/sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1">
        <header className="border-b  px-6 py-4 flex items-center gap-4">
          <SidebarToggle />
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Users
          </h1>
        </header>

        <main className="p-6 max-w-4xl mx-auto">
          <UserGrid />
        </main>
      </div>
    </div>
  );
}
