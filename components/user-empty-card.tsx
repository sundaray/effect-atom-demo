import { UsersIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function UserEmptyCard() {
  return (
    <div className="flex items-center justify-center py-12">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UsersIcon className="text-neutral-400 size-10" />
          </EmptyMedia>
          <EmptyTitle>No users found</EmptyTitle>
          <EmptyDescription>The user list is currently empty.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
