import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDetail } from "@/components/user-detail";

export default function UserDetailPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="p-6">
        <UserDetail />
      </main>
    </div>
  );
}
