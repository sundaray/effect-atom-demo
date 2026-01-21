"use client";

import { RegistryProvider } from "@effect-atom/atom-react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RegistryProvider>
      {children}
    </RegistryProvider>
  );
}