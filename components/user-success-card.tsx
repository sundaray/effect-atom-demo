import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/app/schema/user-schema";
import { UserDeleteDialog } from "@/components/user-delete-dialog";

interface UserSuccessCardProps {
  user: User;
}

export function UserSuccessCard({ user }: UserSuccessCardProps) {
  return (
    <div className="bg-white overflow-hidden">
      <h3 className="font-semibold text-lg">
        {user.firstName} {user.lastName}
      </h3>
      <p className="text-sm text-neutral-600">{user.company.title}</p>
      <p className="text-sm text-neutral-600">{user.company.name}</p>
      <p className="text-xs text-neutral-600 mt-2 break-all">{user.email}</p>
      <UserDeleteDialog
        user={user}
        trigger={
          <Button variant="destructive" size="sm" className="mt-4">
            <Trash2 />
            Delete
          </Button>
        }
      />
    </div>
  );
}
