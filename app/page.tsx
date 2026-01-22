"use client";

import Link from "next/link";
import { UserGrid } from "@/components/user-grid";
import { UsersSearchBar } from "@/components/users-search-bar";
import { UsersPagination } from "@/components/users-pagination";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      <main className="p-6 max-w-5xl mx-auto space-y-12 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Users
          </h1>
          <Link
            href="/add-user"
            className="bg-accent text-foreground hover:bg-neutral-200 px-4 py-2 text-sm font-medium transition-colors"
          >
            + Add User
          </Link>
        </div>
        <UsersSearchBar />
        <div className="space-y-6">
          <UserGrid />
          <UsersPagination />
        </div>
      </main>
    </div>
  );
}
