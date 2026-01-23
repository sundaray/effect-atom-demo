"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddUserForm } from "@/components/add-user-form";

export default function AddUserPage() {
  return (
    <div className="container max-w-5xl space-y-10">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to users
        </Link>
      </Button>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1>Add New User</h1>
        <AddUserForm />
      </div>
    </div>
  );
}
