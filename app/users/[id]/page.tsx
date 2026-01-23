import { ArrowLeft } from "lucide-react";
import { Link } from "react-transition-progress/next";

import { Button } from "@/components/ui/button";
import { UserDetail } from "@/components/user-detail";

export default function UserDetailPage() {
  return (
    <div className="container max-w-5xl space-y-10">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to users
        </Link>
      </Button>
      <UserDetail />
    </div>
  );
}
