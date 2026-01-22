"use client";

import { useAtomValue } from "@effect-atom/atom-react";
import { searchQueryAtom } from "@/app/atoms/search";
import { UsersIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function UserEmptyCard() {
  const searchQuery = useAtomValue(searchQueryAtom);

  const isSearching = searchQuery.length > 0;

  const description = isSearching
    ? `No users match the search query: ${searchQuery}.`
    : "The users list is currently empty.";

  return (
    <div className="flex items-center justify-center py-12 border">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UsersIcon className="text-neutral-400 size-10" />
          </EmptyMedia>
          <EmptyTitle className="font-bold text-lg">No Users Found</EmptyTitle>
          <EmptyDescription className="text-sm">{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
