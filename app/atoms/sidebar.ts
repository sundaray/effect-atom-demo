import { Atom } from "@effect-atom/atom-react";

// Using keepAlive persists the sidebar open state across navigation
export const sidebarOpenAtom = Atom.make(true).pipe(Atom.keepAlive);
