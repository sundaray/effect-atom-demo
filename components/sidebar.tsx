import Link from "next/link";
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react";
import { sidebarOpenAtom } from "@/app/atoms/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function SidebarToggle() {
  const isOpen = useAtomValue(sidebarOpenAtom);
  const setOpen = useAtomSet(sidebarOpenAtom);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setOpen((open) => !open)}
      className="hover:bg-neutral-200"
    >
      {isOpen ? <X /> : <Menu />}
    </Button>
  );
}

export function Sidebar() {
  const isOpen = useAtomValue(sidebarOpenAtom);

  if (!isOpen) return null;

  return (
    <aside className="w-64  border-r p-4">
      <nav className="space-y-2">
        <Link
          href="#"
          className="block px-4 py-2 hover:bg-neutral-200 font-medium"
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className="block px-4 py-2 hover:bg-neutral-200 font-medium"
        >
          Users
        </Link>
        <Link
          href="#"
          className="block px-4 py-2 hover:bg-neutral-200 font-medium"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
