"use client";

import { Atom, useAtom } from "@effect-atom/atom-react";

import { pageAtom } from "@/app/atoms/page";
import { searchQueryAtom } from "@/app/atoms/search";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsersSearchBar() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [page, setPage] = useAtom(pageAtom);

  function handleSearch(value: string) {
    Atom.batch(() => {
      setQuery(value);
      if (page !== 1) {
        setPage(1);
      }
    });
  }

  function handleClear() {
    handleSearch("");
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground">
        <Icons.search className="size-4" />
      </div>

      <Input
        placeholder="Search by user name..."
        className="pl-9 pr-8"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setQuery("");
            e.currentTarget.blur();
          }
        }}
      />
      {/* Right "Esc" Button - Only visible when query exists */}
      {query && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
          <Button
            variant="secondary"
            size="sm"
            className="text-[14px] font-mono text-muted-foreground hover:bg-neutral-200 hover:text-neutral-600"
            onClick={() => {
              handleClear();
            }}
          >
            esc
          </Button>
        </div>
      )}
    </div>
  );
}
