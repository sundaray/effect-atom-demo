"use client";

import { Search } from "lucide-react";
import { useAtom } from "@effect-atom/atom-react";
import { searchQueryAtom } from "@/app/atoms/search";
import { Input } from "@/components/ui/input";

export function UsersSearchBar() {
  const [query, setQuery] = useAtom(searchQueryAtom);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground">
        <Search className="size-4" />
      </div>

      <Input
        placeholder="Search by user name..."
        className="pl-9 pr-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setQuery("");
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  );
}
