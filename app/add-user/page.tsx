"use client";

import { AddUserForm } from "@/components/add-user-form";
import { Sidebar, SidebarToggle } from "@/components/sidebar";

export default function AddUserPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1">
        <header className="border-b px-6 py-4 flex items-center gap-4 bg-white">
          <SidebarToggle />
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Add New User
          </h1>
        </header>

        <main className="p-6 max-w-2xl mx-auto">
          <AddUserForm />
        </main>
      </div>
    </div>
  );
}
