// src/app/layout.tsx
"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import RouterHandler from "@/components/RouterHandler";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <RouterHandler />
      {children}
    </AuthProvider>
  );
}
