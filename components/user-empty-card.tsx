"use client";

import { useAtomValue } from "@effect-atom/atom-react";
import { UsersIcon } from "lucide-react";

import { searchQueryAtom } from "@/app/atoms/search";

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
    <Empty className="border py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersIcon className="text-neutral-400 size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-bold text-lg">No Users Found</EmptyTitle>
        <EmptyDescription className="text-sm">{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
