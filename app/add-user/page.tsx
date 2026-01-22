"use client";

import { AddUserForm } from "@/components/add-user-form";

export default function AddUserPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
        Add New User
      </h1>
      <main>
        <AddUserForm />
      </main>
    </div>
  );
}
